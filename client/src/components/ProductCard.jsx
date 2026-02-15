import { Link } from 'react-router-dom';
import { FaStar, FaHeart } from 'react-icons/fa';

const ProductCard = ({ product, addToCartHandler }) => {
    return (
        <div className="bg-white rounded-lg overflow-hidden group hover:shadow-xl transition duration-300 border border-transparent hover:border-gray-100 relative">
            <div className="h-64 overflow-hidden relative">
                <Link to={`/product/${product._id}`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>
                {/* Sale Badge if needed */}
                {/* <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-sm">SALE</div> */}

                {/* Quick Actions (Reference style often has these on hover) */}
                <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition duration-300 translate-y-4 group-hover:translate-y-0">
                    <button className="bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition" title="Add to Wishlist">
                        <FaHeart />
                    </button>
                </div>
            </div>

            <div className="p-4">
                <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide font-semibold">{product.category || 'Pickles'}</div>

                <Link to={`/product/${product._id}`}>
                    <h3 className="text-base font-bold text-gray-900 mb-3 hover:text-primary transition line-clamp-1">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center space-x-2 mb-4">
                    <span className="text-lg font-bold text-primary">₹{product.price}</span>
                    {/* Fake original price for visual interest if not real data */}
                    <span className="text-xs text-gray-400 line-through">₹{Math.round(product.price * 1.2)}</span>
                </div>

                <div className="flex items-center justify-between">
                    {/* Qty Selector - Simplified to just text for grid */}
                    <span className="text-xs text-gray-500">250g</span>

                    <button
                        onClick={addToCartHandler}
                        className="bg-black text-white text-xs font-bold uppercase px-4 py-2 rounded-sm hover:bg-primary transition duration-300 tracking-wider w-full ml-4"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
