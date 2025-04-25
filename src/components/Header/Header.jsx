import React from 'react';
import logo1 from "../../assets/logo1.png";
import NotificationBell from '../NotificationBell/NotificationBell.jsx';
import { Link, NavLink } from 'react-router-dom';


const Header = () => {

    const activeClassName = "text-blue-600 font-semibold";
    const baseLinkClasses = "text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm sm:text-base font-medium py-2";

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">


                    <div className="flex-shrink-0">
                        <Link to="/">
                            <img
                                src={logo1}
                                alt="EpiSante Logo"
                                className="h-10 w-auto"
                            />
                        </Link>
                    </div>


                    <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        <NavLink
                            to="/"
                            className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClassName : ''}`}
                            end
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/rendezvous"
                            className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClassName : ''}`}
                        >
                            Rendez-vous
                        </NavLink>
                        <NavLink
                            to="/diagnostic"
                            className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClassName : ''}`}
                        >
                            Symptom Checker
                        </NavLink>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClassName : ''}`}
                        >
                            Dashboard
                        </NavLink>

                        {/*
                        <NavLink to="/about" className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClassName : ''}`}>About</NavLink>
                        <NavLink to="/services" className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClassName : ''}`}>Services</NavLink>
                        */}

                        <div className="ml-4"> {/* Add some margin if needed */}
                            <NotificationBell />
                        </div>
                    </nav>

                    <div className="md:hidden flex items-center">
                        <div className="mr-2"> <NotificationBell/> </div> {/* Show bell on mobile too */}
                        <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                            <span className="sr-only">Open main menu</span>
                            <svg className="h-6 w-6" /* ... icon attributes ... */ stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>

                </div>
            </div>

            <div className="md:hidden hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {/* Mobile Links Here */}
                    <NavLink to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" end>Home</NavLink>
                    <NavLink to="/rendezvous" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Rendez-vous</NavLink>
                    <NavLink to="/diagnostic" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Symptom Checker</NavLink>
                    <NavLink to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Dashboard</NavLink>
                </div>
            </div>
        </header>
    );
};

export default Header;