import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/cartSlice';
import { FaTrash, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    // Redirect to home if cart is empty per user request
    useEffect(() => {
        if (cartItems.length === 0) {
            navigate('/');
        }
    }, [cartItems, navigate]);


    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=checkout');
    };

    return (
        <div className="container mx-auto px-6 py-8"> {/* Reduced top padding */}
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-primary mb-6 transition font-medium"
            >
                <FaArrowLeft className="mr-2" /> Back
            </button>

            <h1 className="text-4xl font-serif font-bold mb-10 text-center text-gray-900 border-b pb-4">Your Shopping Cart</h1>

            {cartItems.length === 0 ? (
                // access to this block is unlikely due to redirect, but keeping as fallback
                <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                    <div className="mb-6 opacity-50">
                        <FaShoppingCart className="text-6xl mx-auto text-gray-300" />
                    </div>
                    <p className="text-2xl mb-6 text-gray-600 font-light">Your cart is currently empty</p>
                    <Link to="/" className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition duration-300 shadow-md">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            {cartItems.map((item) => (
                                <div key={item.product} className="flex items-center p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition duration-200">
                                    <div className="w-24 h-24 flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md shadow-sm" />
                                    </div>

                                    <div className="flex-grow px-6">
                                        <Link to={`/product/${item.product}`} className="text-xl font-serif font-bold text-gray-800 hover:text-primary transition">{item.name}</Link>
                                        <p className="text-gray-500 text-sm mt-1">Authentic Taste</p>
                                    </div>

                                    <div className="flex items-center space-x-6">
                                        <div className="font-bold text-lg text-gray-900 w-20 text-right">₹{item.price}</div>

                                        <div className="relative">
                                            <select
                                                value={item.qty}
                                                onChange={(e) => dispatch(addToCart({ ...item, qty: Number(e.target.value) }))}
                                                className="appearance-none border border-gray-300 rounded-md py-1 pl-3 pr-8 text-gray-700 font-medium focus:outline-none focus:border-primary bg-white"
                                            >
                                                {[...Array(item.countInStock || 10).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                            </div>
                                        </div>

                                        <button onClick={() => removeFromCartHandler(item.product)} className="text-gray-400 hover:text-red-500 transition duration-300 p-2 rounded-full hover:bg-red-50">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-xl shadow-lg sticky top-24 border border-gray-100">
                            <h2 className="text-2xl font-serif font-bold mb-6 text-gray-900">Order Summary</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                                    <span className="font-medium">₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping Estimate</span>
                                    <span className="font-medium">Calculated at Checkout</span>
                                </div>
                                <div className="border-t pt-4 flex justify-between text-xl font-bold text-gray-900">
                                    <span>Total</span>
                                    <span className="text-primary">₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={checkoutHandler}
                                className="w-full bg-primary text-white font-bold py-4 px-6 rounded-full hover:bg-red-700 transition duration-300 shadow-lg transform hover:-translate-y-1 block text-center"
                            >
                                Proceed to Checkout
                            </button>

                            <div className="mt-6 flex justify-center space-x-2 text-gray-400">
                                {/* Add payment icons placeholders if wanted */}
                                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
