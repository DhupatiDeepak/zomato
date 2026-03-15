import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, product: product._id, qty }));
        toast.success(`${product.name} added to cart`, { position: "bottom-center" });
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;

    return (

        <div className="container mx-auto px-6 py-12">
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-primary mb-8 transition duration-300">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Back to Shopping
            </Link>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-12">
                    <div className="h-96 md:h-auto overflow-hidden relative group">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>

                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="flex items-center space-x-2 mb-4">
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                {product.category || 'Traditional'}
                            </span>
                            {product.countInStock > 0 ? (
                                <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">In Stock</span>
                            ) : (
                                <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Out of Stock</span>
                            )}
                        </div>

                        <h2 className="text-4xl font-serif font-bold mb-4 text-gray-900 leading-tight">
                            {product.name}
                        </h2>

                        <div className="flex items-center mb-6 space-x-4">
                            <div className="flex text-yellow-400 text-lg">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className={i < product.rating ? 'text-yellow-400' : 'text-gray-300'} />
                                ))}
                            </div>
                            <span className="text-gray-500 text-sm font-medium">({product.numReviews} customer reviews)</span>
                        </div>

                        <p className="text-4xl font-bold text-primary mb-6">₹{product.price}</p>

                        <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                            {product.description}
                        </p>

                        <div className="border-t border-gray-100 pt-8 mt-auto">
                            {product.countInStock > 0 && (
                                <div className="flex items-center mb-6">
                                    <span className="font-semibold text-gray-700 mr-4">Quantity:</span>
                                    <div className="relative">
                                        <select
                                            value={qty}
                                            onChange={(e) => setQty(Number(e.target.value))}
                                            className="appearance-none border-2 border-gray-200 rounded-lg py-2 pl-4 pr-10 text-gray-700 font-bold focus:outline-none focus:border-primary cursor-pointer bg-white"
                                        >
                                            {[...Array(product.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={addToCartHandler}
                                className={`w-full md:w-auto bg-gray-900 text-white font-bold py-4 px-10 rounded-full hover:bg-primary transition duration-300 shadow-lg transform hover:-translate-y-1 flex items-center justify-center ${product.countInStock === 0 ? 'opacity-50 cursor-not-allowed hover:bg-gray-900 hover:translate-y-0' : ''}`}
                                disabled={product.countInStock === 0}
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
