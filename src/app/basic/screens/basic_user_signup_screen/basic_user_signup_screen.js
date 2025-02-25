
import React, { Component } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import AuthenticationService from "../../../../services/authentication_service";
import { withRouter } from "../../../../common/with_router";
import Footer from "../../../../Component/SharedComponent/Footer";
import { Link } from "react-router-dom";
import "../../../../styles/HomePage.css";
import { toast } from "react-toastify";

class BasicUserSignupScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
            showPassword: false, // State to toggle password visibility
            error: null,
            success: null,
            errors: {}
        };
    }

    validateForm = () => {
        const { name, username, email, password } = this.state;
        let errors = {};
        let formIsValid = true;

        if (!name.trim()) {
            errors.name = "Name is required.";
            formIsValid = false;
        }

        if (!username.trim()) {
            errors.username = "Username is required.";
            formIsValid = false;
        }

        if (!email.trim()) {
            errors.email = "Email is required.";
            formIsValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = "Invalid email format.";
            formIsValid = false;
        }

        if (!password) {
            errors.password = "Password is required.";
            formIsValid = false;
        } else if (password.length < 6) {
            errors.password = "Password must be at least 6 characters long.";
            formIsValid = false;
        }

        this.setState({ errors });
        return formIsValid;
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    togglePasswordVisibility = () => {
        this.setState((prevState) => ({
            showPassword: !prevState.showPassword
        }));
    };

    handleSignupSubmit = (e) => {
        e.preventDefault();
        if (!this.validateForm()) return;

        const { name, username, email, password } = this.state;
        AuthenticationService.register({ name, username, email, password })
            .then((response) => {
                toast.success(response?.data?.message || "Registration successful! Please log in.");
                this.setState({
                    error: null,
                    name: '',
                    username: '',
                    email: '',
                    password: '',
                    errors: {}
                });
            })
            .catch((error) => {
                toast.error(error.response?.data?.message || "Registration failed. Please try again.");
                this.setState({
                    error: error.response?.data?.message || "Registration failed. Please try again.",
                    success: null
                });
            });
    };

    render() {
        const { name, username, email, password, showPassword, errors } = this.state;

        return (
            <>
                <div style={{marginTop:"150px"}} className="d-flex mt-80 justify-content-center align-items-center vh-100 mb-5">
                    <div className="col-lg-4 col-md-6 col-sm-8 p-4 bg-white shadow rounded-3">
                        <form onSubmit={this.handleSignupSubmit}>
                            <div className="text-center mb-3">
                                <img
                                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                                    alt="profile-img"
                                    className="rounded-circle"
                                    height="80"
                                />
                            </div>
                            <h3 className="text-center">Register</h3>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" name="name" value={name} onChange={this.handleChange} className={`form-control ${errors.name ? 'is-invalid' : ''}`} placeholder="Enter name" />
                                <div className="invalid-feedback">{errors.name}</div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input type="text" name="username" value={username} onChange={this.handleChange} className={`form-control ${errors.username ? 'is-invalid' : ''}`} placeholder="Enter username" />
                                <div className="invalid-feedback">{errors.username}</div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" name="email" value={email} onChange={this.handleChange} className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="Enter email" />
                                <div className="invalid-feedback">{errors.email}</div>
                            </div>
                            <div className="mb-3 position-relative">
                                <label className="form-label">Password</label>
                                <div className="input-group">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        name="password" 
                                        value={password} 
                                        onChange={this.handleChange} 
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                                        placeholder="Password"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={this.togglePasswordVisibility}
                                        style={{
                                            border: "none",
                                            background: "transparent",
                                            position: "absolute",
                                            right: "10px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            cursor: "pointer"
                                        }}
                                    >
                                        {showPassword ? <FaEye />:<FaEyeSlash /> }
                                    </button>
                                </div>
                                <div className="invalid-feedback">{errors.password}</div>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Signup</button>
                              <div className="text-center mt-3">
                                                        <p>Already have an account? <Link to="/login" className="text-primary">Log In</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

export default withRouter(BasicUserSignupScreen);
