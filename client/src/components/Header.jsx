
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { FaShoppingCart, FaUser, FaSearch, FaHeart, FaBars } from 'react-icons/fa';

const Header = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);
    const { wishlistItems } = useSelector((state) => state.wishlist);
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
        <header className="bg-dark/80 backdrop-blur-xl sticky top-0 z-50 font-sans border-b border-white/5 transition-all duration-300">
            {/* Top Bar - More refined */}
            <div className="bg-primary/95 text-white text-[10px] md:text-xs py-1.5 text-center font-semibold tracking-[0.2em] uppercase">
                Free Delivery on orders above ₹1000 | Authentic Traditional Tastes
            </div>

            {/* Main Header */}
            <div className="container mx-auto px-4 md:px-8 py-5">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 group">
                        <div className="text-2xl md:text-3xl font-serif font-black text-light tracking-tighter transition-transform group-hover:scale-[1.02]">
                            <span className="text-primary italic">Godavari</span> <span>Ruchulu</span>
                        </div>
                    </Link>

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-grow max-w-xl mx-8">
                        <form onSubmit={searchHandler} className="w-full relative group">
                            <input
                                type="text"
                                placeholder="Search for pickles, powders, and more..."
                                className="w-full pl-5 pr-12 py-3 border border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white/5 text-sm transition-all duration-300 group-hover:bg-white/10 group-hover:shadow-lg text-light placeholder-gray-500"
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-full bg-primary text-white hover:bg-red-700 transition-colors shadow-sm">
                                <FaSearch size={14} />
                            </button>
                        </form>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center space-x-6 text-gray-400">
                        <Link to="/wishlist" className="relative hover:text-primary transition-all duration-300 transform hover:scale-110 hidden sm:block">
                            <FaHeart className="text-xl" />
                            {wishlistItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </Link>

                        <Link to="/cart" className="relative hover:text-white transition-all duration-300 transform hover:scale-110 group">
                            <FaShoppingCart className="text-xl" />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-secondary text-dark text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                </span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <div className="relative group cursor-pointer">
                                <div className="flex items-center hover:text-primary transition-all duration-300 transform hover:scale-110">
                                    <FaUser className="text-xl text-light" />
                                </div>
                                {/* Dropdown */}
                                <div className="absolute right-0 mt-2 w-52 bg-dark border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-2 hidden group-hover:block transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 z-50 overflow-hidden backdrop-blur-xl">
                                    <div className="px-5 py-3 border-b border-white/5 text-xs font-bold uppercase tracking-wider text-gray-500">Account Control</div>
                                    <Link to="/profile" className="block px-5 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors">My Profile</Link>
                                    <Link to="/orders" className="block px-5 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors">Orders</Link>
                                    {user?.isAdmin && (
                                        <Link to="/admin/dashboard" className="block px-5 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors">Admin Dashboard</Link>
                                    )}
                                    <div className="border-t border-white/5 mt-1">
                                        <button onClick={handleLogout} className="block w-full text-left px-5 py-3 text-sm font-bold text-primary hover:bg-white/5 transition-colors">Logout</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="bg-white/10 text-white hover:bg-primary px-7 py-2.5 rounded-full font-black text-[13px] tracking-widest transition-all duration-300 border border-white/10 active:scale-95 shadow-lg">LOGIN</Link>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button className="md:hidden text-2xl hover:text-primary transition-colors text-light">
                            <FaBars />
                        </button>
                    </div>
                </div>

                {/* Mobile Search */}
                <div className="md:hidden mt-5">
                    <form onSubmit={searchHandler} className="relative">
                        <input
                            type="text"
                            placeholder="Search locally made delights..."
                            className="w-full pl-5 pr-12 py-3 border border-white/10 rounded-full focus:outline-none focus:border-primary bg-white/5 text-sm text-light"
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-full bg-primary text-white">
                            <FaSearch size={14} />
                        </div>
                    </form>
                </div>
            </div>

            {/* Navigation Bar */}
            <nav className="border-t border-white/5 hidden md:block">
                <div className="container mx-auto px-8">
                    <ul className="flex items-center justify-center space-x-10 py-5 text-[13px] font-black uppercase tracking-[0.2em] text-white">
                        <li><Link to="/" className="hover:text-primary transition-all duration-300 relative group">Home<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span></Link></li>
                        <li><Link to="/shop" className="hover:text-primary transition-all duration-300 relative group">Shop<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span></Link></li>
                        <li><Link to="/shop?category=Veg%20Pickles" className="hover:text-primary transition-all duration-300 relative group">Veg Pickles<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span></Link></li>
                        <li><Link to="/shop?category=Non-Veg%20Pickles" className="hover:text-primary transition-all duration-300 relative group">Non-Veg Pickles<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span></Link></li>
                        <li><Link to="/shop?category=Podis" className="hover:text-primary transition-all duration-300 relative group">Podis<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span></Link></li>
                        <li><Link to="/shop?category=Sweets" className="hover:text-primary transition-all duration-300 relative group">Sweets<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span></Link></li>
                        <li><Link to="/shop?category=Hot%20Snacks" className="hover:text-primary transition-all duration-300 relative group">Hot Snacks<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span></Link></li>
                        <li><Link to="/shop?category=Vadiyalu" className="hover:text-primary transition-all duration-300 relative group">Vadiyalu<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span></Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
