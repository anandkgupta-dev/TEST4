import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="nav-brand">NexusHR Analytics</Link>
            <div className="nav-links">
                {user ? (
                    <>
                        <span style={{ color: 'var(--text-secondary)' }}>Welcome, {user.username}</span>
                        <Link to="/" className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Dashboard</Link>
                        <button onClick={handleLogout} className="btn-danger">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn-primary" style={{ background: 'transparent', border: '1px solid var(--primary-color)' }}>Login</Link>
                        <Link to="/signup" className="btn-primary">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
