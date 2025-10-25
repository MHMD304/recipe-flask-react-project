import { useState } from "react";
import styled from "styled-components";
import { login } from "../api/fetcher";

const Login = ({ onLoginSuccess }) => {
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
      
      // Store refresh token in localStorage
      if (response.refreshToken) {
        localStorage.setItem("refreshToken", response.refreshToken);
      }
      
      // Call the success callback to update Auth component
      if (onLoginSuccess) {
        onLoginSuccess({ username: userLoginModel.username });
      }
      
      setUserLoginModel({ username: "", password: "" });
    } catch (err) {
      console.error("login failed:", err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Login</Title>
      <Input
        type="text"
        name="username"
        value={userLoginModel.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <Input
        type="password"
        name="password"
        value={userLoginModel.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <SubmitButton type="submit" value="Log In" />
    </Form>
  );
};

export default Login;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  color: #1f2937;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
  text-align: center;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const SubmitButton = styled.input`
  padding: 0.75rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
  margin-top: 0.5rem;

  &:hover {
    background: #2563eb;
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
`;