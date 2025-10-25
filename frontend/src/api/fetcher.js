// fetcher.js
const RECIPE_BASE_URL = '/recipe';
const AUTH_BASE_URL = '/auth';

// Helper to get tokens from localStorage
const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");

// Centralized fetch helper
const fetchData = async (BASE_URL, endpoint, options = {}, auth = false) => {
  const token = getAccessToken();

  const headers = {
    "Content-Type": "application/json",
    ...(auth && token ? { Authorization: `Bearer ${token}` } : {}), // only attach token if auth = true
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Only try refresh if this was a protected route
    if (auth && response.status === 401) {
      console.warn("Access token expired, trying to refresh...");
      const newToken = await refreshToken();
      return fetchData(BASE_URL, endpoint, options, auth); // retry once
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};


// ====== AUTH ======

// Signup (public)
export const signup = (userSignupModel) =>
  fetchData(AUTH_BASE_URL, '/signup', {
    method: "POST",
    body: JSON.stringify(userSignupModel),
  },false);

// Login (public)
export const login = async (userLoginModel) => {
  const response = await fetchData(AUTH_BASE_URL, '/login', {
    method: "POST",
    body: JSON.stringify(userLoginModel),
  },false);

  // Save tokens
  localStorage.setItem("accessToken", response.accessToken);
  localStorage.setItem("refreshToken", response.refresh_token);

  return response;
};

// Refresh token (used internally)
export const refreshToken = async () => {
  const refresh = getRefreshToken();
  if (!refresh) throw new Error("No refresh token found");

  const response = await fetchData(AUTH_BASE_URL, '/refresh', {
    method: "POST",
    headers: { Authorization: `Bearer ${refresh}` },
  });

  // Save the new access token
  localStorage.setItem("accessToken", response.accessToken);
  console.log("Access token refreshed!");
  return response.accessToken;
};

// Logout helper
export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// ====== RECIPES ======

// Public routes
export const getAllRecipes = () => fetchData(RECIPE_BASE_URL, '/recipes');
export const getRecipeById = (id) =>
  fetchData(RECIPE_BASE_URL, `/recipes/${id}`);

// Protected routes (require access token)
export const createRecipe = (recipeData) =>
  fetchData(RECIPE_BASE_URL, '/recipes', {
    method: "POST",
    body: JSON.stringify(recipeData),
  }, true);

export const editRecipe = (id, updatedRecipe) =>
  fetchData(RECIPE_BASE_URL, `/recipes/${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedRecipe),
  }, true);

export const deleteRecipe = (id) =>
  fetchData(RECIPE_BASE_URL, `/recipes/${id}`, { method: "DELETE" }, true);
