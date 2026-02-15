import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Order = () => {
    const { id } = useParams();
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [sdkReady, setSdkReady] = useState(false);

    useEffect(() => {
        const addRazorpayScript = async () => {
            const { data: clientId } = await axios.get('http://localhost:5000/api/config/razorpay');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };

        const fetchOrder = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
                const { data } = await axios.get(`http://localhost:5000/api/orders/${id}`, config);
                setOrder(data);
                setLoading(false);

                if (!window.Razorpay) {
                    addRazorpayScript();
                } else {
                    setSdkReady(true);
                }
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    const paymentHandler = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };

        // Create Order on Razorpay
        const { data: { key } } = await axios.get('http://localhost:5000/api/config/razorpay');
        const { data: orderData } = await axios.post('http://localhost:5000/api/orders/razorpay', { amount: order.totalPrice }, config);

        const options = {
            key: key,
            amount: orderData.amount,
            currency: "INR",
            name: "Godavari Ruchulu",
            description: "Order Payment",
            order_id: orderData.id,
            handler: async function (response) {
                try {
                    await axios.put(`http://localhost:5000/api/orders/${order._id}/pay`, {
                        paymentResult: {
                            id: response.razorpay_payment_id,
                            status: 'success',
                            update_time: Date.now(),
                            email_address: order.user?.email,
                        }
                    }, config);
                    toast.success('Payment Successful');
                    window.location.reload();
                } catch (error) {
                    toast.error('Payment verification failed');
                }
            },
            prefill: {
                name: order.user?.name,
                email: order.user?.email,
            },
            theme: {
                color: "#E23744",
            },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };


    if (loading) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="container mx-auto px-6 py-12 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-serif font-bold text-gray-900">
                        Order <span className="text-primary">#{order._id}</span>
                    </h1>
                    <Link to="/profile" className="text-gray-600 hover:text-primary transition">
                        Back to Orders
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Shipping & Payment</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="font-semibold text-gray-500 uppercase text-xs tracking-wider mb-2">Shipping To</h3>
                                    <p className="text-lg font-medium text-gray-900">{order.user?.name}</p>
                                    <p className="text-gray-600">{order.user?.email}</p>
                                    <p className="text-gray-600 mt-2">
                                        {order.shippingAddress?.address},<br />
                                        {order.shippingAddress?.city}, {order.shippingAddress?.postalCode},<br />
                                        {order.shippingAddress?.country}
                                    </p>
                                    <div className="mt-4">
                                        {order.isDelivered ? (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                Delivered at {order.deliveredAt}
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                                Not Delivered
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-500 uppercase text-xs tracking-wider mb-2">Payment Method</h3>
                                    <p className="text-lg font-medium text-gray-900 mb-2">{order.paymentMethod}</p>
                                    <div>
                                        {order.isPaid ? (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                Paid on {order.paidAt?.substring(0, 10)}
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                                                Not Paid
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Order Items</h2>
                            {order.orderItems?.length === 0 ? <p className="text-gray-500">Order is empty</p> : (
                                <div className="space-y-6">
                                    {order.orderItems?.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg shadow-sm mr-4" />
                                                <div>
                                                    <Link to={`/product/${item.product}`} className="text-lg font-medium text-gray-900 hover:text-primary transition">
                                                        {item.name}
                                                    </Link>
                                                    <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                                                </div>
                                            </div>
                                            <div className="font-bold text-gray-900">
                                                {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-2xl shadow-lg sticky top-24 border border-gray-100">
                            <h2 className="text-2xl font-serif font-bold mb-6 text-gray-900 border-b pb-4">Order Summary</h2>
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Items</span>
                                    <span className="font-medium">₹{order.itemsPrice?.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="font-medium">₹{order.shippingPrice?.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <span className="font-medium">₹{order.taxPrice?.toFixed(2)}</span>
                                </div>
                                <div className="border-t pt-4 flex justify-between items-center">
                                    <span className="text-xl font-bold text-gray-900">Total</span>
                                    <span className="text-2xl font-bold text-primary">₹{order.totalPrice?.toFixed(2)}</span>
                                </div>
                            </div>

                            {!order.isPaid && (
                                <button
                                    onClick={paymentHandler}
                                    className="w-full bg-primary text-white font-bold py-4 px-6 rounded-full hover:bg-red-700 transition duration-300 shadow-lg transform hover:-translate-y-1 mt-4"
                                    disabled={!sdkReady}
                                >
                                    Pay with Razorpay
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
