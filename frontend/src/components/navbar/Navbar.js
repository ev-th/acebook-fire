import './Navbar.css';
import React from "react";
import {Link, useNavigate} from "react-router-dom";

const Navbar = () => {
    const logout = () => {
        window.localStorage.removeItem("token")
        useNavigate('/login')
      }
    return(
        <header data-cy="navbar" className="navbar">
        <h1>Acebook</h1>
        <div className="navbar-list">
            <Link to="/"> <a>My Page</a> </Link>
            <Link to="/posts"> <a>Posts</a> </Link>
            <a onClick={ logout }>Logout</a>
        </div>
    </header>
    )
};

export default Navbar;