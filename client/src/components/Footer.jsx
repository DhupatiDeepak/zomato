import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8 font-sans">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* About */}
                    <div>
                        <h3 className="text-2xl font-serif font-bold text-white mb-6">Ronanki hot chips</h3>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Authentic traditional pickles and powders from the heart of Godavari. Made with love, preserving the taste of our ancestors.
                        </p>
                        <div className="flex space-x-4">
                            <SocialIcon icon={<FaFacebook />} />
                            <SocialIcon icon={<FaInstagram />} />
                            <SocialIcon icon={<FaTwitter />} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Quick Links</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li><Link to="/" className="hover:text-primary transition">Home</Link></li>
                            <li><Link to="/about" className="hover:text-primary transition">About Us</Link></li>
                            <li><Link to="/shop" className="hover:text-primary transition">Shop</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition">Contact Us</Link></li>
                            <li><Link to="/privacy" className="hover:text-primary transition">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Categories</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li><Link to="/category/veg-pickles" className="hover:text-primary transition">Veg Pickles</Link></li>
                            <li><Link to="/category/non-veg-pickles" className="hover:text-primary transition">Non-Veg Pickles</Link></li>
                            <li><Link to="/category/powders" className="hover:text-primary transition">Podis (Powders)</Link></li>
                            <li><Link to="/category/sweets" className="hover:text-primary transition">Traditional Sweets</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Contact Us</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-start">
                                <FaMapMarkerAlt className="mt-1 mr-3 text-primary" />
                                <span>12-3-45, Main Road, Amalapuram,<br />East Godavari, AP - 533201</span>
                            </li>
                            <li className="flex items-center">
                                <FaPhone className="mr-3 text-primary" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center">
                                <FaEnvelope className="mr-3 text-primary" />
                                <span>hello@ronankihotchips.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Ronanki hot chips. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

const SocialIcon = ({ icon }) => (
    <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition duration-300">
        {icon}
    </a>
);

export default Footer;
