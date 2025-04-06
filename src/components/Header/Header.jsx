import React from 'react';
import logo1 from "../../assets/logo1.png";
import NotificationBell from '../NotificationBell/NotificationBell.jsx';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <img src={logo1} alt="Site Logo" className="logo1" />

                <nav className="nav">
                    <ul className="nav-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <Link to="/diagnostic">Symptom Checker</Link>
                        <li><NotificationBell/></li>
                    </ul>
                </nav>


            </div>
        </header>
    );
};

export default Header;
