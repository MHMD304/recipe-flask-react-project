import { useState } from "react";
import { login } from "../api/fetcher";
const Login = () => {
  const [userLoginModel, setUserLoginModel] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLoginModel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(userLoginModel);
      console.log("Login success:", response);
      setUserLoginModel({ username: "", email: "", password: "" });
    } catch (err) {
      console.error("login failed:", err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={userLoginModel.username}
        onChange={handleChange}
        placeholder="Username"
      />

      <input
        type="password"
        name="password"
        value={userLoginModel.password}
        onChange={handleChange}
        placeholder="Password"
      />

      <input type="submit" value="log In" />
    </form>
  );
};

export default Login;
