
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import http from "../http-common";
import "../styles/HomePage.css";

const ProfilePage = () => {
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedData = JSON.parse(data);
      setUserId(parsedData.user.id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      loadData();
    }
  }, [userId]);

  const loadData = async () => {
    try {
      const response = await http.get(`/users/${userId}`);
      const user = response.data;

      setFormData({
        name: user.name || "",
        email: user.email || "",
        username: user.username || "",
        password: user.password || "", // Do not prefill password for security reasons
      });
    } catch (error) {
      toast.error("Error loading user data");
    }
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!formData.name.trim()) {
      errors.name = "Name is required.";
      formIsValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required.";
      formIsValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format.";
      formIsValid = false;
    }

    if (!formData.username.trim()) {
      errors.username = "Username is required.";
      formIsValid = false;
    }

    if (formData.password && formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
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
      const response = await http.put("/update-profile", formData);
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating profile");
    }
  };

  return (
    <div className="d-flex mt-100 justify-content-center align-items-center vh-100 mb-5">
      <div className="col-lg-4 col-md-6 col-sm-8 p-4 bg-light bg-white shadow rounded-3">
        <form onSubmit={handleSubmit}>
          <div className="text-center mb-3">
            <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt="profile-img"
              className="rounded-circle"
              height="80"
            />
          </div>
          <h3 className="text-center">Update Profile</h3>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Enter your name"
            />
            <div className="invalid-feedback">{errors.name}</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
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
          <div className="mb-3 position-relative">
            <label className="form-label">New Password (Optional)</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
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
            <div className="invalid-feedback">{errors.password}</div>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
