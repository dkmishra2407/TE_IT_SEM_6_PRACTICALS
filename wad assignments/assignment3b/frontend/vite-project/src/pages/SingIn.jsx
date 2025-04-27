import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { UserContext } from "../context/UserContext";


const SignIn = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear any error when user types
  };

  async function postData(formData) {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/getuser", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.status === 200) {
        console.log(response.data.data);
        setUser({
          id: response.data.data._id,
          username: response.data.data.username,
          email: response.data.data.email,
          mobileNo: response.data.data.mobileNo,
          isAuthenticated: true
        })
        navigate("/showdetails");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.log(err);
      setError("Login failed. Please check your credentials or try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError("Please fill in all fields");
      return;
    }
    postData(formData);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="col-md-5 col-lg-4 p-4 border rounded shadow bg-white">
        <h2 className="text-center mb-4">Sign In</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-3 text-center">
          <p className="mb-0">Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
