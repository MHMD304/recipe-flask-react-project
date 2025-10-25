import React, { useState } from "react";
import Signup from "./signup";
import Login from "./login";

const Auth = () => {
  const [showSignup, setShowSignup] = useState(false);

  const toggleForm = () => setShowSignup((prev) => !prev);

  return (
    <div className="auth-container">
      {showSignup ? <Signup /> : <Login />}
      
      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        {showSignup ? (
          <p>
            Already have an account?{" "}
            <button onClick={toggleForm} style={{ color: "blue", cursor: "pointer", border: "none", background: "none" }}>
              Login
            </button>
          </p>
        ) : (
          <p>
            Don't have an account?{" "}
            <button onClick={toggleForm} style={{ color: "blue", cursor: "pointer", border: "none", background: "none" }}>
              Sign Up
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;
