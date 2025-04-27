import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"
import { useNavigate } from "react-router-dom";
const SignUp = () => {

    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    mobileNo: "",
    email: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function postdata(formData) {
    try {
        const response = await axios.post('http://localhost:3000/add', formData, { // Remove `{ formData }`
            headers: { "Content-Type": "application/json" },
        });
        console.log(response.data.status);

        if(response.data.status === 200){
            alert("User Registered Successfully")
            navigate('/signin');
        }
    } catch (err) {
        console.log(err);
    }
}

// Handle form submission
const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up Data:", formData);
    
    postdata(formData);
};


  return (
    <div className="container mt-5">
      <div className="col-md-6 mx-auto p-4 border rounded shadow">
        <h2 className="text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
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
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mobile No</label>
            <input
              type="tel"
              name="mobileNo"
              className="form-control"
              value={formData.mobileNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
