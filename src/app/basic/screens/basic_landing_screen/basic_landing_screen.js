import React, { Component } from "react";
import {Link} from "react-router-dom";

export default class BasicLandingPage extends Component {
    handleLogin = () => {
        // Logic to redirect or open login modal
        console.log("Login button clicked");
    };

    handleSignup = () => {
        // Logic to redirect or open signup modal
        console.log("Signup button clicked");
    };

    render() {
        return (
            <div className="landing-page">
                {/*<BasicTopNav/>*/}
                <div className="text-center mt-100 pt-5">
                    <h5>Welcome to Kitchen Inventory Management</h5>
                    <p>Efficiently manage your kitchen's inventory.</p>
                    <Link to="/login">
                        <button className="btn btn-primary">
                            Get started
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}
