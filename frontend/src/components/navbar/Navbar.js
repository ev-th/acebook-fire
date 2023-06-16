import './Navbar.css';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import jwtDecode from 'jwt-decode';

const Navbar = ({navigate}) => {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    // const navigate = useNavigate();

    const logout = () => {
        window.localStorage.removeItem("token");
        setToken("");
        navigate('/login');
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
                    <span onClick={ myPage }>My Page</span>
                    <span><Link to="/posts" className="nav-link">Posts</Link></span>
                    <span onClick={ logout }>Logout</span>
                </div>
            </nav>
        )
    } else {
        return (
            <nav data-cy="navbar" className="navbar">
                <h1>Acebook</h1>
                <div className="navbar-list">
                    <span><Link to="/login" className="nav-link">Login</Link></span>
                    <span><Link to="/signup" className="nav-link">Sign Up</Link></span>
                </div>
            </nav>
        )
    }
};

export default Navbar;