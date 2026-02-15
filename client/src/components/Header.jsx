
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { FaShoppingCart, FaUser, FaSearch, FaHeart, FaBars } from 'react-icons/fa';

const Header = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');

    const handleLogout = () => {
        dispatch(logout());
    };

    const searchHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
        } else {
            navigate('/');
        }
    };

    return (
        <header className="bg-white sticky top-0 z-50 font-sans shadow-sm">
            {/* Top Bar */}
            <div className="bg-primary text-white text-xs py-1 text-center font-medium tracking-wide">
                Welcome to Godavari Ruchulu - Authentic Traditional Tastes
            </div>

            {/* Main Header */}
            <div className="container mx-auto px-4 md:px-8 py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0">
                        {/* Placeholder for Logo Image from reference, using Text for now but styled */}
                        <div className="text-2xl md:text-3xl font-serif font-bold text-gray-900 tracking-tight">
                            <span className="text-primary">Godavari</span> Ruchulu
                        </div>
                    </Link>

                    {/* Search Bar - Hidden on mobile, visible on md+ */}
                    <div className="hidden md:flex flex-grow max-w-xl mx-8">
                        <form onSubmit={searchHandler} className="w-full relative">
                            <input
                                type="text"
                                placeholder="Search for pickles, powders, and more..."
                                className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-primary bg-gray-50 text-sm"
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <button type="submit" className="absolute right-0 top-0 h-full px-4 text-gray-500 hover:text-primary">
                                <FaSearch />
                            </button>
                        </form>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center space-x-6 text-gray-700">
                        <Link to="/wishlist" className="hover:text-primary transition hidden sm:block">
                            <FaHeart className="text-xl" />
                        </Link>

                        <Link to="/cart" className="relative hover:text-primary transition group">
                            <FaShoppingCart className="text-xl" />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                </span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <div className="relative group cursor-pointer">
                                <div className="flex items-center hover:text-primary">
                                    <FaUser className="text-xl" />
                                </div>
                                {/* Dropdown */}
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-md shadow-lg py-1 hidden group-hover:block transition-all duration-200 opacity-0 group-hover:opacity-100 transform z-50">
                                    <div className="px-4 py-2 border-b border-gray-50 text-sm text-gray-500">Hello, {user?.name}</div>
                                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">My Profile</Link>
                                    <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">Orders</Link>
                                    {user.isAdmin && (
                                        <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">Admin Dashboard</Link>
                                    )}
                                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Logout</button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="hover:text-primary font-medium text-sm">LOGIN</Link>
                        )}

                        {/* Mobile Menu Toggle - simplified */}
                        <button className="md:hidden text-2xl">
                            <FaBars />
                        </button>
                    </div>
                </div>

                {/* Mobile Search - Visible only on mobile */}
                <div className="md:hidden mt-4">
                    <form onSubmit={searchHandler} className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-primary bg-gray-50 text-sm"
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <FaSearch className="absolute right-3 top-2.5 text-gray-400" />
                    </form>
                </div>
            </div>

            {/* Navigation Bar */}
            <nav className="border-t border-gray-100 hidden md:block">
                <div className="container mx-auto px-8">
                    <ul className="flex items-center justify-center space-x-8 py-3 text-sm font-medium uppercase tracking-wide text-gray-800">
                        <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                        <li><Link to="/shop" className="hover:text-primary transition-colors">Shop</Link></li>
                        <li><Link to="/shop?category=Veg%20Pickles" className="hover:text-primary transition-colors">Veg Pickles</Link></li>
                        <li><Link to="/shop?category=Non-Veg%20Pickles" className="hover:text-primary transition-colors">Non-Veg Pickles</Link></li>
                        <li><Link to="/shop?category=Podis" className="hover:text-primary transition-colors">Podis</Link></li>
                        <li><Link to="/shop?category=Sweets" className="hover:text-primary transition-colors">Sweets</Link></li>
                        <li><Link to="/shop?category=Hot%20Snacks" className="hover:text-primary transition-colors">Hot Snacks</Link></li>
                        <li><Link to="/shop?category=Vadiyalu" className="hover:text-primary transition-colors">Vadiyalu</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
