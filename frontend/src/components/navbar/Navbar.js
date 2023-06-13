import './Navbar.css';
import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import jwtDecode from 'jwt-decode';

const Navbar = () => {
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    const navigate = useNavigate();

    const logout = () => {
        window.localStorage.removeItem("token")
        navigate('/login')
    }

    const myPage = () => {
        const userId = jwtDecode(token).user_id;

        fetch(`/user?_id=${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          })
          .then(response => response.json())
          .then( data => {
            window.localStorage.setItem("token", data.token)
            setToken(window.localStorage.getItem("token"))

            const userName = data.user.userName
            navigate(`/user/${userName}`)
            })
        }
    
    if(token) {
        return (
            <nav data-cy="navbar" className="navbar">
                <h1>Acebook</h1>
                <div className="navbar-list">
                    <a onClick={ myPage }>My Page</a>
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