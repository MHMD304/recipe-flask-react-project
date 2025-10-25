import React, { useState } from "react";
import styled from "styled-components";
import Signup from "./signup";
import Login from "./login";

const Auth = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const toggleForm = () => setShowSignup((prev) => !prev);

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setUsername(user.username);
  };

  const handleLogout = () => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    setUsername("");
    console.log("User logged out");
  };

  if (isLoggedIn) {
    return (
      <AuthContainer>
        <LoggedInContainer>
          <WelcomeMessage>Welcome back!</WelcomeMessage>
          <UserInfo>Logged in as: <strong>{username}</strong></UserInfo>
          <LogoutButton onClick={handleLogout}>
            Log Out
          </LogoutButton>
        </LoggedInContainer>
      </AuthContainer>
    );
  }

  return (
    <AuthContainer>
      {showSignup ? (
        <Signup onSignupSuccess={handleLoginSuccess} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
      
      <ToggleSection>
        {showSignup ? (
          <ToggleText>
            Already have an account?{" "}
            <ToggleButton onClick={toggleForm}>
              Login
            </ToggleButton>
          </ToggleText>
        ) : (
          <ToggleText>
            Don't have an account?{" "}
            <ToggleButton onClick={toggleForm}>
              Sign Up
            </ToggleButton>
          </ToggleText>
        )}
      </ToggleSection>
    </AuthContainer>
  );
};

export default Auth;

const AuthContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ToggleSection = styled.div`
  margin-top: 1.5rem;
  text-align: center;
`;

const ToggleText = styled.p`
  color: #666;
  font-size: 0.95rem;
  margin: 0;
`;

const ToggleButton = styled.button`
  color: #3b82f6;
  cursor: pointer;
  border: none;
  background: none;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0;
  text-decoration: underline;
  transition: color 0.2s ease;

  &:hover {
    color: #2563eb;
  }

  &:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

const LoggedInContainer = styled.div`
  text-align: center;
  padding: 2rem 0;
`;

const WelcomeMessage = styled.h2`
  color: #1f2937;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
`;

const UserInfo = styled.p`
  color: #6b7280;
  font-size: 1rem;
  margin: 0 0 2rem 0;
`;

const LogoutButton = styled.button`
  padding: 0.75rem 2rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #dc2626;
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    outline: 2px solid #ef4444;
    outline-offset: 2px;
  }
`;