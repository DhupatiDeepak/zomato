import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${id}`);
                setName(data.name);
                setPrice(data.price);
                setImage(data.image);
                setBrand(data.brand);
                setCategory(data.category);
                setCountInStock(data.countInStock);
                setDescription(data.description);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProduct();
    }, [id]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const { data } = await axios.post('/api/upload', formData, config);

            setImage(data.image);
            setUploading(false);
            toast.success('Image uploaded successfully');
        } catch (error) {
            console.error(error);
            setUploading(false);
            toast.error('Error uploading image');
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}` 
                },
            };
            await axios.put(`/api/products/${id}`, {
                name, price, image, brand, category, countInStock, description
            }, config);
            toast.success('Product Updated');
            navigate('/admin/productlist');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error updating product');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/admin/productlist" className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 mb-4 inline-block">Go Back</Link>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Price</label>
                        <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full border p-2 rounded" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Image</label>
                        <div className="flex items-center gap-4 mb-2">
                            {image && <img src={image} alt="Preview" className="w-16 h-16 object-cover rounded" />}
                            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="flex-grow border p-2 rounded" />
                        </div>
                        <input type="file" onChange={uploadFileHandler} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-red-700" />
                        {uploading && <p className="text-xs text-secondary mt-1">Uploading...</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Brand</label>
                        <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full border p-2 rounded" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Category</label>
                        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border p-2 rounded" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Count In Stock</label>
                        <input type="number" value={countInStock} onChange={(e) => setCountInStock(Number(e.target.value))} className="w-full border p-2 rounded" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border p-2 rounded" rows="4"></textarea>
                    </div>
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-red-600">Update</button>
                </form>
            </div>
        </div>
    );
};

export default ProductEdit;
