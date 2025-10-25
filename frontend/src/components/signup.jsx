import { useState } from "react";
import { signup } from "../api/fetcher";

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={userSignupModel.username}
        onChange={handleChange}
        placeholder="Username"
      />

      <input
        type="email"
        name="email"
        value={userSignupModel.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <input
        type="password"
        name="password"
        value={userSignupModel.password}
        onChange={handleChange}
        placeholder="Password"
      />

      <input type="submit" value="Sign Up" />
    </form>
  );
};

export default Signup;
