import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const ProductList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/products');
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login');
        } else {
            fetchProducts();
        }
    }, [user, navigate]);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                };
                await axios.delete(`/api/products/${id}`, config);
                toast.success('Product deleted');
                fetchProducts();
            } catch (error) {
                toast.error('Error deleting product');
            }
        }
    };

    const createProductHandler = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            };
            const { data } = await axios.post(`/api/products`, {}, config);
            toast.success('Product created');
            navigate(`/admin/product/${data._id}/edit`);
        } catch (error) {
            toast.error('Error creating product');
        }
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Products</h1>
                <button className="bg-primary text-white px-4 py-2 rounded flex items-center hover:bg-red-600" onClick={createProductHandler}>
                    <FaPlus className="mr-2" /> Create Product
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">NAME</th>
                            <th className="py-2 px-4 border-b">PRICE</th>
                            <th className="py-2 px-4 border-b">CATEGORY</th>
                            <th className="py-2 px-4 border-b">STOCK</th>
                            <th className="py-2 px-4 border-b">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className="text-center">
                                <td className="py-2 px-4 border-b">{product._id}</td>
                                <td className="py-2 px-4 border-b">{product.name}</td>
                                <td className="py-2 px-4 border-b">₹{product.price}</td>
                                <td className="py-2 px-4 border-b">{product.category}</td>
                                <td className="py-2 px-4 border-b">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${product.countInStock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'} ({product.countInStock})
                                    </span>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <Link to={`/admin/product/${product._id}/edit`} className="mr-2 text-blue-500 hover:text-blue-700">
                                        <FaEdit />
                                    </Link>
                                    <button onClick={() => deleteHandler(product._id)} className="text-red-500 hover:text-red-700">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;
