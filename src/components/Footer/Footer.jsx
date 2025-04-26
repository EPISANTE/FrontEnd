// src/components/Footer/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// Import some social icons from react-icons
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 mt-auto"> {/* Ensure footer is pushed down if content is short (using flex-grow on main) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

                    {/* Copyright Section */}
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-semibold text-white mb-2">EpiSante</h3>
                        <p className="text-sm">
                            © {new Date().getFullYear()} EpiSante. All rights reserved.
                        </p>
                        {/* Optional: Add logo here */}
                    </div>

                    <div className="md:col-span-1">
                        <h4 className="text-base font-semibold text-white uppercase tracking-wider mb-3">Quick Links</h4>
                        <nav className="space-y-2">
                            <Link to="/" className="block text-sm hover:text-white transition-colors">Home</Link>
                            <Link to="/dashboard" className="block text-sm hover:text-white transition-colors">Dashboard</Link>
                            <Link to="/rendezvous" className="block text-sm hover:text-white transition-colors">Rendez-vous</Link>
                            {/* Add other relevant links */}
                            {/* <Link to="/about" className="block text-sm hover:text-white transition-colors">About Us</Link> */}
                            {/* <a href="/terms" className="block text-sm hover:text-white transition-colors">Terms of Service</a> */}
                            {/* <a href="/privacy" className="block text-sm hover:text-white transition-colors">Privacy Policy</a> */}
                        </nav>
                    </div>

                    <div className="md:col-span-1">
                        <h4 className="text-base font-semibold text-white uppercase tracking-wider mb-3">Follow Us</h4>
                        <div className="flex justify-center md:justify-start space-x-5">
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white transition-colors">
                                <FaFacebookF className="h-5 w-5" />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-white transition-colors">
                                <FaTwitter className="h-5 w-5" />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white transition-colors">
                                <FaLinkedinIn className="h-5 w-5" />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition-colors">
                                <FaInstagram className="h-5 w-5" />
                            </a>
                            {/* Add other social links */}
                        </div>
                        {/* Optional: Contact Info */}
                        {/* <p className="text-sm mt-4">contact@episante.com</p> */}
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;