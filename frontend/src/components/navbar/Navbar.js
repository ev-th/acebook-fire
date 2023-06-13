import './Navbar.css';
import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";

const Navbar = () => {
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    const navigate = useNavigate();

    const logout = () => {
        window.localStorage.removeItem("token")
        navigate('/login')
    }

    if(token) {
        return (
            <nav data-cy="navbar" className="navbar">
                <h1>Acebook</h1>
                <div className="navbar-list">
                    <Link to="/"> <a>My Page</a> </Link>
                    <Link to="/posts"> <a>Posts</a> </Link>
                    <a onClick={ logout }>Logout</a>
                </div>
            </nav>
        )
    } else {
        return (
            <nav data-cy="navbar" className="navbar">
                <h1>Acebook</h1>
                <div className="navbar-list">
                    <Link to="/login"> <a>Login</a> </Link>
                    <Link to="/signup"> <a>Sign Up</a> </Link>
                </div>
            </nav>
        )
    }
};

export default Navbar;