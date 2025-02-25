

import React, { Component } from 'react';
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import AuthenticationService from "../../../../services/authentication_service";
import withAuth from "../../../../common/with_auth";
import { withRouter } from "../../../../common/with_router";
import { Link } from 'react-router-dom';
import Footer from '../../../../Component/SharedComponent/Footer';
import "../../../../styles/HomePage.css";

class BasicUserLoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '', 
            password: '',
            showPassword: false // Toggle password visibility
        };
    }

    handleLoginSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        const { auth, setAuth } = this.props;

        try {
            const data = { username, password };
            const res = await AuthenticationService.login(data);
            if (res && res.data.success) {
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });
                this.props.loggedin(res.data);
                localStorage.setItem('auth', JSON.stringify(res.data));
                this.props.router.navigate('/');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    togglePasswordVisibility = () => {
        this.setState((prevState) => ({
            showPassword: !prevState.showPassword
        }));
    };

    render() {
        const { username, password, showPassword } = this.state;

        return (
            <>
                <div className="container d-flex justify-content-center align-items-center mt-100 vh-100">
                    <div className="col-md-4 bg-white border rounded-3 shadow p-4">
                        <div className="text-center mb-3">
                            <img
                                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                                alt="profile-img"
                                className="rounded-circle"
                                height="80"
                            />
                        </div>
                        <h3 className="text-center mb-3">Login</h3>
                        <form onSubmit={this.handleLoginSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" name="username" value={username} required
                                    onChange={this.handleChange}
                                    className="form-control" id="username"
                                    placeholder="Enter username" />
                            </div>
                            <div className="mb-3 position-relative">
                                <label htmlFor="password" className="form-label">Password</label>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={password}
                                        required
                                        onChange={this.handleChange}
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter your password"
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
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>
                            <div className="mb-3 text-end">
                                <Link className='text-primary' to='/forgot-password'>Forgot password?</Link>
                            </div> 
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </form>
                        <div className="text-center mt-3">
                            <p>Don't have an account? <Link to="/signup" className="text-primary">Sign Up</Link></p>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

// Ensure correct order of HOCs
export default withRouter(withAuth(BasicUserLoginScreen));

