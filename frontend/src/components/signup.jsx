import { useState } from "react";
import styled from "styled-components";
import { signup } from "../api/fetcher";

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

const Signup = () => {
  const [userSignupModel, setUserSignupModel] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserSignupModel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(userSignupModel);
      console.log("Signup success:", response);
      setUserSignupModel({ username: "", email: "", password: "" });
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Sign Up</Title>
      <Input
        type="text"
        name="username"
        value={userSignupModel.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <Input
        type="email"
        name="email"
        value={userSignupModel.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <Input
        type="password"
        name="password"
        value={userSignupModel.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <SubmitButton type="submit" value="Sign Up" />
    </Form>
  );
};

export default Signup;