import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { clearWishlist } from '../redux/wishlistSlice';
import { addToCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';

const Wishlist = () => {
    const dispatch = useDispatch();
    const { wishlistItems } = useSelector((state) => state.wishlist);

    const handleClearWishlist = () => {
        dispatch(clearWishlist());
        toast.info('Wishlist cleared', { position: "bottom-center" });
    };

    const handleAddToCart = (e, product) => {
        e.preventDefault();
        dispatch(addToCart({ ...product, product: product._id, qty: 1 }));
        toast.success(`${product.name} added to cart`, { position: "bottom-center" });
    };

    return (
        <div className="bg-dark min-h-screen py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-serif font-black text-light uppercase tracking-tighter">
                            My <span className="text-primary italic">Favorites</span>
                        </h1>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-2">
                            {wishlistItems.length} items saved in your collection
                        </p>
                    </div>

                    {wishlistItems.length > 0 && (
                        <button
                            onClick={handleClearWishlist}
                            className="bg-white/5 hover:bg-primary/20 text-gray-400 hover:text-primary px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 border border-white/10 hover:border-primary/30 active:scale-95 shadow-xl"
                        >
                            Clear Wishlist
                        </button>
                    )}
                </div>

                {wishlistItems.length === 0 ? (
                    <div className="bg-white/5 rounded-[2rem] p-12 md:p-24 text-center border border-white/5 backdrop-blur-sm">
                        <div className="text-gray-700 text-8xl mb-6">♥</div>
                        <h2 className="text-2xl font-serif font-black text-light mb-4 uppercase tracking-widest">Your wishlist is empty</h2>
                        <p className="text-gray-500 mb-10 max-w-md mx-auto font-medium">
                            Looks like you haven't saved any of our authentic Godavari delicacies yet. Explore our shop and save your favorites!
                        </p>
                        <Link
                            to="/shop"
                            className="inline-block bg-primary hover:bg-red-700 text-white px-12 py-4 rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-300 shadow-2xl active:scale-95"
                        >
                            Explore Shop
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {wishlistItems.map((item) => (
                            <ProductCard
                                key={item._id}
                                product={item}
                                addToCartHandler={(e) => handleAddToCart(e, item)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
