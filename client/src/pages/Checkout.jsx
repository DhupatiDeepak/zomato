import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress, clearCart } from '../redux/cartSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

const Checkout = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress, cartItems } = cart;
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const placeOrderHandler = async (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));

        const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
        const shippingPrice = itemsPrice > 500 ? 0 : 50;
        const taxPrice = Number((0.18 * itemsPrice).toFixed(2));
        const totalPrice = itemsPrice + shippingPrice + taxPrice;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Helper? Or rely on state? State token is cleaner.
                },
            };
            // But wait, user token should be in Redux store too if I want it. 
            // I will use localStorage for now as simple approach, matching authSlice logic.

            const { data } = await axios.post(
                '/api/orders',
                {
                    orderItems: cartItems,
                    shippingAddress: { address, city, postalCode, country },
                    paymentMethod: 'Razorpay', // Hardcoded for now
                    itemsPrice,
                    shippingPrice,
                    taxPrice,
                    totalPrice,
                },
                config
            );

            toast.success('Order Placed Successfully');
            dispatch(clearCart());
            navigate(`/order/${data._id}`);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error placing order');
        }
    };

    return (

        <div className="container mx-auto px-6 py-12 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-serif font-bold mb-10 text-center text-gray-900">Secure Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                            <div className="flex items-center mb-6">
                                <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mr-4">1</div>
                                <h2 className="text-2xl font-bold text-gray-800">Shipping Details</h2>
                            </div>

                            <form id="checkout-form" onSubmit={placeOrderHandler}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                            placeholder="123 Main St"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                        <input
                                            type="text"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                            placeholder="Hyderabad"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                                        <input
                                            type="text"
                                            value={postalCode}
                                            onChange={(e) => setPostalCode(e.target.value)}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                            placeholder="500001"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                                        <input
                                            type="text"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                            placeholder="India"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-2xl shadow-lg sticky top-24 border border-gray-100">
                            <h2 className="text-2xl font-serif font-bold mb-6 text-gray-900 border-b pb-4">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
                                    <span className="font-medium">₹{cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="font-medium text-green-600">{cartItems.reduce((acc, item) => acc + item.price * item.qty, 0) > 500 ? 'Free' : '₹50.00'}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax (18% GST)</span>
                                    <span className="font-medium">₹{(0.18 * cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)).toFixed(2)}</span>
                                </div>
                                <div className="border-t pt-4 flex justify-between items-center">
                                    <span className="text-xl font-bold text-gray-900">Total</span>
                                    <span className="text-2xl font-bold text-primary">₹{(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0) * 1.18 + (cartItems.reduce((acc, item) => acc + item.price * item.qty, 0) > 500 ? 0 : 50)).toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                form="checkout-form"
                                type="submit"
                                className="w-full bg-primary text-white font-bold py-4 px-6 rounded-full hover:bg-red-700 transition duration-300 shadow-lg transform hover:-translate-y-1"
                            >
                                Place Order
                            </button>
                            <p className="text-xs text-center text-gray-400 mt-4">Safe and Secure Payments via Razorpay</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
