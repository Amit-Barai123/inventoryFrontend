
import { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import '../../../../styles/Header.css';

export default class BasicTopNav extends Component {
    render() {
        return (
            <div className="fixed-top">
                <header className="topbar">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <ul className="social-network">
                                    <li>
                                        <Link className="waves-effect waves-dark" to="#">
                                            <i className="bi bi-facebook"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="waves-effect waves-dark" to="#">
                                            <i className="bi bi-twitter"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="waves-effect waves-dark" to="#">
                                            <i className="bi bi-linkedin"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="waves-effect waves-dark" to="#">
                                            <i className="bi bi-pinterest"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>
                <nav className="navbar navbar-expand-lg navbar-dark mx-background-top-linear">
                    <div className="container">
                        <Link
                            className="navbar-brand"
                            rel="nofollow"
                            target="_blank"
                            to="/"
                        >
                            INVENTORY.COM
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarResponsive"
                            aria-controls="navbarResponsive"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item ">
                                    <NavLink className="nav-link" to='/'>
                                        Home
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/about-us">
                                        About Us
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/contact-us">
                                        Contact Us
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">
                                        Login
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/signup">
                                        Register
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}
