
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { FaShoppingCart, FaUser, FaSearch, FaHeart, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);
    const { wishlistItems } = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const searchHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
        } else {
            navigate('/');
        }
    };

    const closeMenuAndNavigate = (path) => {
        setIsMenuOpen(false);
        navigate(path);
    };

    return (
        <header className="bg-dark/80 backdrop-blur-xl sticky top-0 z-50 font-sans border-b border-white/5 transition-all duration-300">
            {/* Top Bar */}
            <div className="bg-primary text-white text-[10px] py-1 text-center font-bold tracking-widest uppercase">
                Free Delivery on orders above ₹1000
            </div>

            {/* Main Header */}
            <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
                <Link to="/" className="text-xl md:text-2xl font-serif font-black text-white">
                    <span className="text-primary italic">Ronanki</span> hot chips
                </Link>

                <div className="hidden md:flex flex-grow max-w-xl mx-6">
                    <form onSubmit={searchHandler} className="w-full relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-5 pr-12 py-2 border border-white/10 rounded-full bg-white/5 text-sm text-white"
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-full bg-primary text-white">
                            <FaSearch size={14} />
                        </button>
                    </form>
                </div>

                <div className="flex items-center space-x-5 text-gray-400">
                    <Link to="/wishlist" className="relative hover:text-primary">
                        <FaHeart className="text-xl" />
                        {wishlistItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {wishlistItems.length}
                            </span>
                        )}
                    </Link>

                    <Link to="/cart" className="relative hover:text-white">
                        <FaShoppingCart className="text-xl" />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-secondary text-dark text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                            </span>
                        )}
                    </Link>

                    {isAuthenticated ? (
                        <div className="relative group hidden md:block">
                            <FaUser className="text-lg text-light cursor-pointer hover:text-primary" />
                            <div className="absolute right-0 mt-2 w-48 bg-dark border border-white/10 rounded-xl shadow-2xl py-2 hidden group-hover:block z-[100]">
                                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Profile</Link>
                                <Link to="/orders" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Orders</Link>
                                {user?.isAdmin && <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-primary hover:bg-white/5">Admin Dashboard</Link>}
                                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-primary hover:bg-white/5">Logout</button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="hidden md:block bg-primary text-white px-4 py-1.5 rounded-full font-bold text-xs">LOGIN</Link>
                    )}

                    <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-2xl text-white">
                        <FaBars />
                    </button>
                </div>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden px-4 pb-3">
                <form onSubmit={searchHandler} className="relative">
                    <input
                        type="text"
                        placeholder="Search delights..."
                        className="w-full pl-5 pr-12 py-2 border border-white/10 rounded-full bg-white/5 text-sm text-white"
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-primary">
                        <FaSearch size={16} />
                    </div>
                </form>
            </div>

            {/* Desktop Nav */}
            <nav className="border-t border-white/5 hidden md:block">
                <div className="container mx-auto px-8 flex justify-center space-x-8 py-3 text-[11px] font-bold uppercase tracking-widest text-white">
                    <Link to="/" className="hover:text-primary">Home</Link>
                    <Link to="/shop" className="hover:text-primary">Shop</Link>
                    <Link to="/shop?category=Veg Pickles" className="hover:text-primary">Veg Pickles</Link>
                    <Link to="/shop?category=Non-Veg Pickles" className="hover:text-primary">Non-Veg Pickles</Link>
                    <Link to="/shop?category=Podis" className="hover:text-primary">Podis</Link>
                    <Link to="/shop?category=Sweets" className="hover:text-primary">Sweets</Link>
                    <Link to="/shop?category=Hot Snacks" className="hover:text-primary">Hot Snacks</Link>
                    <Link to="/shop?category=Vadiyalu" className="hover:text-primary">Vadiyalu</Link>
                </div>
            </nav>

            {/* Mobile Menu Drawer */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-[100] md:hidden">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setIsMenuOpen(false)}></div>
                    
                    {/* Drawer Content */}
                    <div className="absolute right-0 top-0 h-full w-[280px] bg-[#0F172A] shadow-2xl flex flex-col overflow-hidden" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
                        {/* Drawer Header */}
                        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#1E293B]">
                            <span className="text-primary font-black uppercase text-xs tracking-widest">Navigation</span>
                            <button onClick={() => setIsMenuOpen(false)} className="text-white hover:text-primary p-2">
                                <FaTimes size={20} />
                            </button>
                        </div>
                        
                        {/* Drawer Body */}
                        <div className="flex-grow overflow-y-auto py-2 bg-[#0F172A]">
                            <div className="flex flex-col">
                                {user?.isAdmin && (
                                    <button 
                                        onClick={() => closeMenuAndNavigate('/admin/dashboard')}
                                        className="w-full text-left px-8 py-4 border-b border-white/5 text-[#FF4444] font-black text-xs uppercase tracking-widest bg-white/5"
                                    >
                                        Admin Dashboard
                                    </button>
                                )}
                                
                                <button 
                                    onClick={() => closeMenuAndNavigate('/')}
                                    className="w-full text-left px-8 py-4 border-b border-white/10 text-white font-bold text-sm uppercase tracking-wide hover:bg-white/5"
                                >
                                    Home
                                </button>
                                
                                <button 
                                    onClick={() => closeMenuAndNavigate('/shop')}
                                    className="w-full text-left px-8 py-4 border-b border-white/10 text-white font-bold text-sm uppercase tracking-wide hover:bg-white/5"
                                >
                                    Shop All
                                </button>

                                <div className="px-8 py-4 bg-white/5 text-[10px] text-gray-400 font-black uppercase tracking-widest border-b border-white/5">
                                    Categories
                                </div>
                                
                                {['Veg Pickles', 'Non-Veg Pickles', 'Podis', 'Sweets', 'Hot Snacks', 'Vadiyalu'].map((cat) => (
                                    <button 
                                        key={cat}
                                        onClick={() => closeMenuAndNavigate(`/shop?category=${cat}`)}
                                        className="w-full text-left px-8 py-3 border-b border-white/5 text-gray-300 text-sm hover:text-white hover:bg-white/5"
                                    >
                                        {cat}
                                    </button>
                                ))}

                                <div className="mt-6 px-8 py-4 border-t border-white/10">
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4">Your Account</p>
                                    {isAuthenticated ? (
                                        <div className="flex flex-col gap-4">
                                            <button onClick={() => closeMenuAndNavigate('/profile')} className="text-white text-sm font-bold text-left">My Profile</button>
                                            <button onClick={() => closeMenuAndNavigate('/orders')} className="text-white text-sm font-bold text-left">My Orders</button>
                                            <button 
                                                onClick={handleLogout}
                                                className="w-full mt-2 py-3 bg-red-500/10 text-red-500 rounded-lg border border-red-500/20 text-xs font-black uppercase tracking-widest"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    ) : (
                                        <button 
                                            onClick={() => closeMenuAndNavigate('/login')}
                                            className="w-full py-4 bg-white text-black rounded-xl font-black text-xs uppercase tracking-widest shadow-xl"
                                        >
                                            Login / Register
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Drawer Footer */}
                        <div className="p-6 border-t border-white/10 bg-[#1E293B] text-center">
                            <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">
                                Ronanki hot chips &copy; 2026
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
