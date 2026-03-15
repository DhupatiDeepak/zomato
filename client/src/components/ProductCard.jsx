import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../redux/wishlistSlice';

const ProductCard = ({ product, addToCartHandler }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const dispatch = useDispatch();
    const { wishlistItems } = useSelector((state) => state.wishlist);
    const isFavorite = wishlistItems.some((x) => x._id === product._id);

    return (
        <div className="bg-white/5 rounded-2xl overflow-hidden group hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 border border-white/5 hover:border-primary/30 relative flex flex-col h-full active:scale-[0.98] backdrop-blur-md">
            {/* Wishlist/Like Button overlay */}
            <button 
                onClick={() => dispatch(toggleWishlist(product))}
                className={`absolute top-4 right-4 z-10 w-10 h-10 bg-dark/60 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 border border-white/5 ${isFavorite ? 'text-primary' : 'text-gray-400 hover:text-primary hover:scale-110'}`}
            >
                <FaHeart />
            </button>

            <div className="h-64 overflow-hidden relative bg-white/5">
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-white/5 animate-pulse">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                    </div>
                )}
                <Link to={`/product/${product._id}`} className="block h-full">
                    <img
                        src={product.image}
                        alt={product.name}
                        onLoad={() => setImageLoaded(true)}
                        className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'} ${product.countInStock === 0 ? 'grayscale' : ''}`}
                    />
                    <div className="absolute inset-0 bg-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    {product.countInStock === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-dark/60 backdrop-blur-[2px]">
                            <span className="bg-red-600 text-white text-xs font-black px-6 py-2 rounded-full uppercase tracking-[0.2em] shadow-2xl">
                                Out of Stock
                            </span>
                        </div>
                    )}
                </Link>
                
                {/* Weight badge */}
                <div className="absolute bottom-4 left-4">
                    <span className="bg-primary backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-xl">
                        250g • Handcrafted
                    </span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="text-[10px] text-primary mb-2 uppercase tracking-[0.2em] font-black">{product.category || 'Premium Pickle'}</div>

                <Link to={`/product/${product._id}`}>
                    <h3 className="text-lg font-serif font-black text-light mb-3 hover:text-primary transition-colors leading-tight line-clamp-2">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center space-x-3 mb-6">
                    <span className="text-2xl font-black text-light">₹{product.price}</span>
                    <span className="text-sm text-gray-500 line-through font-medium">₹{Math.round(product.price * 1.2)}</span>
                    <span className="text-[10px] text-secondary font-black uppercase tracking-wider bg-secondary/10 px-2 py-0.5 rounded-full border border-secondary/20">Save 20%</span>
                </div>

                <div className="mt-auto">
                    <button
                        onClick={addToCartHandler}
                        disabled={product.countInStock === 0}
                        className={`w-full ${product.countInStock === 0 ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-white/10 text-white hover:bg-primary'} py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-300 border border-white/10 hover:border-transparent active:scale-95 flex items-center justify-center gap-2 group/btn`}
                    >
                        <span>{product.countInStock === 0 ? 'Sold Out' : 'Add to Basket'}</span>
                        {product.countInStock > 0 && <span className="transition-transform group-hover/btn:translate-x-1">→</span>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
