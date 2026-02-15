import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

const OrderList = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login');
        } else {
            const fetchOrders = async () => {
                try {
                    const config = {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    };
                    const { data } = await axios.get('http://localhost:5000/api/orders', config);
                    setOrders(data);
                    setLoading(false);
                } catch (error) {
                    console.error(error);
                    setLoading(false);
                }
            };
            fetchOrders();
        }
    }, [user, navigate]);

    if (loading) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Orders</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">USER</th>
                            <th className="py-2 px-4 border-b">DATE</th>
                            <th className="py-2 px-4 border-b">TOTAL</th>
                            <th className="py-2 px-4 border-b">PAID</th>
                            <th className="py-2 px-4 border-b">DELIVERED</th>
                            <th className="py-2 px-4 border-b">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="text-center">
                                <td className="py-2 px-4 border-b">{order._id}</td>
                                <td className="py-2 px-4 border-b">{order.user && order.user.name}</td>
                                <td className="py-2 px-4 border-b">{order.createdAt.substring(0, 10)}</td>
                                <td className="py-2 px-4 border-b">₹{order.totalPrice}</td>
                                <td className="py-2 px-4 border-b">
                                    {order.isPaid ? (
                                        order.paidAt.substring(0, 10)
                                    ) : (
                                        <FaTimes className="text-red-500 inline" />
                                    )}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {order.isDelivered ? (
                                        order.deliveredAt.substring(0, 10)
                                    ) : (
                                        <FaTimes className="text-red-500 inline" />
                                    )}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <Link to={`/order/${order._id}`} className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 text-sm">
                                        Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderList;
