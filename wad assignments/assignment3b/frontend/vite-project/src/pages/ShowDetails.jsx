import React, { useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ShowDetails = () => {
  const navigate = useNavigate();
  const { user, clearUser } = useContext(UserContext);

  console.log(user);
  // Logout handler
  const handleLogout = useCallback(() => {
    // Clear user context
    clearUser();
    
    // Clear any stored tokens (e.g., from localStorage)
    localStorage.removeItem('userToken');
    
    // Redirect to login
    navigate('/signin');
  }, [clearUser, navigate]);

  // Edit profile handler (placeholder)
  const handleEditProfile = useCallback(() => {
    navigate('/edit-profile');
  }, [navigate]);

  // If no user is authenticated, redirect or show error
  if (!user.isAuthenticated) {
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-warning">
          Please log in to view your profile.
          <button 
            className="btn btn-primary ms-3" 
            onClick={() => navigate('/signin')}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="col-md-6 p-4 border rounded shadow bg-white">
        <h2 className="text-center mb-4">User Profile</h2>

        <div className="card">
          <div className="card-body">
            {/* Profile Icon */}
            <div className="text-center mb-4">
              <div
                className="bg-primary text-white rounded-circle mx-auto d-flex justify-content-center align-items-center"
                style={{ 
                  width: "100px", 
                  height: "100px", 
                  fontSize: "2rem" 
                }}
              >
                {user.username?.charAt(0)?.toUpperCase() || "U"}
              </div>
            </div>

            {/* Profile Information */}
            <div className="profile-info">
              <div className="row mb-3">
                <div className="col-4 fw-bold">Username:</div>
                <div className="col-8">{user.username}</div>
              </div>

              <div className="row mb-3">
                <div className="col-4 fw-bold">Email:</div>
                <div className="col-8">{user.email}</div>
              </div>

              <div className="row mb-3">
                <div className="col-4 fw-bold">Mobile:</div>
                <div className="col-8">{user.mobileNo}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 text-center">
          <button 
            className="btn btn-primary me-2" 
            onClick={handleEditProfile}
          >
            Edit Profile
          </button>
          <button 
            className="btn btn-outline-danger" 
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;