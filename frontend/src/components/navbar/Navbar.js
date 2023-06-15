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
                    <a onClick={ myPage }>My Page</a>
                    <Link to="/posts">Posts</Link>
                    <a onClick={ logout }>Logout</a>
                </div>
            </nav>
        )
    } else {
        return (
            <nav data-cy="navbar" className="navbar">
                <h1>Acebook</h1>
                <div className="navbar-list">
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                </div>
            </nav>
        )
    }
};

export default Navbar;