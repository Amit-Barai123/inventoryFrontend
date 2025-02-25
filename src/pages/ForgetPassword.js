
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import http from "../http-common";
import "../styles/HomePage.css";
import Footer from "../Component/SharedComponent/Footer";

const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    newPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!formData.username.trim()) {
      errors.username = "Username is required.";
      formIsValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required.";
      formIsValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format.";
      formIsValid = false;
    }

    if (!formData.newPassword) {
      errors.newPassword = "Password is required.";
      formIsValid = false;
    } else if (formData.newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters long.";
      formIsValid = false;
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await http.post("/forget-password", formData);
      if (response.data.success) {
        setSuccess(true);
        toast.success(response.data.message);
        setFormData({ username: "", email: "", newPassword: "" });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating password");
    }
  };

  return (
   <>
    <div className="d-flex mt-100 justify-content-center align-items-center vh-100 mb-5">
      <div className="col-lg-4 col-md-6 col-sm-8 p-4 bg-white shadow rounded-3">
        <form onSubmit={handleSubmit}>
          <div className="text-center mb-3">
            <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt="profile-img"
              className="rounded-circle"
              height="80"
            />
          </div>
          <h3 className="text-center">Reset Password</h3>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              placeholder="Enter your username"
            />
            <div className="invalid-feedback">{errors.username}</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Enter your email"
            />
            <div className="invalid-feedback">{errors.email}</div>
          </div>
          <div className="mb-3 position-relative">
            <label className="form-label">New Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className={`form-control ${errors.newPassword ? "is-invalid" : ""}`}
                placeholder="Enter new password"
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={togglePasswordVisibility}
                style={{
                  border: "none",
                  background: "transparent",
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            <div className="invalid-feedback">{errors.newPassword}</div>
          </div>
          {success ? (
            <Link to="/login" className="btn btn-success w-100">
              Password Updated! Click to Login
            </Link>
          ) : (
            <>
            <button type="submit" className="btn btn-primary w-100">
              Reset Password
            </button>
            <div className="text-center mt-3">
                                        <p>Back to <Link to="/login" className="text-primary">Login</Link></p>
                                    </div>
            </>
          )}
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ForgetPassword;
