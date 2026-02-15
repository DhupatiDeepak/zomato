import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const dispatch = useDispatch();

    const queryParams = new URLSearchParams(location.search);
    const categoryFilter = queryParams.get('category');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/products');
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (e, product) => {
        e.preventDefault();
        dispatch(addToCart({ ...product, product: product._id, qty: 1 }));
        toast.success(`${product.name} added to cart`, { position: "bottom-center" });
    };

    // Implied dummy data for fallback (same as Home but could be centralized)
    const dummyData = [
        {
            _id: 'd1',
            name: 'Mango Avakaya',
            image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=500&q=80',
            price: 250,
            category: 'Veg Pickles',
            rating: 4.5,
            numReviews: 10
        },
        {
            _id: 'd2',
            name: 'Gongura Pickle',
            image: 'https://images.unsplash.com/photo-1626202158925-5674c0c16b67?w=500&q=80',
            price: 220,
            category: 'Veg Pickles',
            rating: 4.8,
            numReviews: 15
        },
        {
            _id: 'd3',
            name: 'Cut Mango Pickle',
            image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=500&q=80',
            price: 240,
            category: 'Veg Pickles',
            rating: 4.2,
            numReviews: 8
        },
        {
            _id: 'd4',
            name: 'Tomato Pickle',
            image: 'https://images.unsplash.com/photo-1606927958988-cb5436336a5b?w=500&q=80',
            price: 200,
            category: 'Veg Pickles',
            rating: 4.6,
            numReviews: 12
        },
        {
            _id: 'd5',
            name: 'Chicken Pickle (Boneless)',
            image: 'https://images.unsplash.com/photo-1626202158925-5674c0c16b67?w=500&q=80',
            price: 550,
            category: 'Non-Veg Pickles',
            rating: 4.9,
            numReviews: 25
        },
        {
            _id: 'd6',
            name: 'Prawns Pickle',
            image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=500&q=80',
            price: 650,
            category: 'Non-Veg Pickles',
            rating: 4.7,
            numReviews: 18
        },
        {
            _id: 'd7',
            name: 'Mutton Pickle',
            image: 'https://images.unsplash.com/photo-1606927958988-cb5436336a5b?w=500&q=80',
            price: 750,
            category: 'Non-Veg Pickles',
            rating: 4.8,
            numReviews: 20
        },
        {
            _id: 'd8',
            name: 'Fish Pickle',
            image: 'https://images.unsplash.com/photo-1626202158925-5674c0c16b67?w=500&q=80',
            price: 450,
            category: 'Non-Veg Pickles',
            rating: 4.3,
            numReviews: 10
        },
        {
            _id: 'd9',
            name: 'Kandi Podi',
            image: 'https://images.unsplash.com/photo-1596450632360-1e5446002f2d?w=500&q=80',
            price: 180,
            category: 'Podis',
            rating: 4.5,
            numReviews: 14
        },
        {
            _id: 'd10',
            name: 'Karivepaku Podi',
            image: 'https://images.unsplash.com/photo-1626202158925-5674c0c16b67?w=500&q=80',
            price: 190,
            category: 'Podis',
            rating: 4.6,
            numReviews: 11
        },
        {
            _id: 'd11',
            name: 'Nalla Karam',
            image: 'https://images.unsplash.com/photo-1596450632360-1e5446002f2d?w=500&q=80',
            price: 170,
            category: 'Podis',
            rating: 4.4,
            numReviews: 9
        },
        {
            _id: 'd12',
            name: 'Idli Karam',
            image: 'https://images.unsplash.com/photo-1626202158925-5674c0c16b67?w=500&q=80',
            price: 160,
            category: 'Podis',
            rating: 4.7,
            numReviews: 16
        },
        {
            _id: 'd13',
            name: 'Ariselu (Ghee)',
            image: 'https://images.unsplash.com/photo-1605151600889-72f87a827448?w=500&q=80',
            price: 400,
            category: 'Sweets',
            rating: 4.8,
            numReviews: 22
        },
        {
            _id: 'd14',
            name: 'Pootharekulu',
            image: 'https://images.unsplash.com/photo-1702482387183-5a2133464528?w=500&q=80',
            price: 500,
            category: 'Sweets',
            rating: 4.9,
            numReviews: 30
        },
        {
            _id: 'd15',
            name: 'Sunnundalu',
            image: 'https://images.unsplash.com/photo-1605151600889-72f87a827448?w=500&q=80',
            price: 350,
            category: 'Sweets',
            rating: 4.6,
            numReviews: 18
        },
        {
            _id: 'd16',
            name: 'Kaja',
            image: 'https://images.unsplash.com/photo-1702482387183-5a2133464528?w=500&q=80',
            price: 320,
            category: 'Sweets',
            rating: 4.5,
            numReviews: 15
        },
        {
            _id: 'd17',
            name: 'Chekkalu',
            image: 'https://images.unsplash.com/photo-1605151600889-72f87a827448?w=500&q=80',
            price: 250,
            category: 'Hot Snacks',
            rating: 4.7,
            numReviews: 25
        },
        {
            _id: 'd18',
            name: 'Murukulu',
            image: 'https://images.unsplash.com/photo-1626202158925-5674c0c16b67?w=500&q=80',
            price: 240,
            category: 'Hot Snacks',
            rating: 4.6,
            numReviews: 20
        },
        {
            _id: 'd19',
            name: 'Janthikalu',
            image: 'https://images.unsplash.com/photo-1605151600889-72f87a827448?w=500&q=80',
            price: 230,
            category: 'Hot Snacks',
            rating: 4.5,
            numReviews: 15
        },
        {
            _id: 'd20',
            name: 'Saggubiyyam Vadiyalu',
            image: 'https://images.unsplash.com/photo-1596450632360-1e5446002f2d?w=500&q=80',
            price: 300,
            category: 'Vadiyalu',
            rating: 4.8,
            numReviews: 12
        },
        {
            _id: 'd21',
            name: 'Minapa Vadiyalu',
            image: 'https://images.unsplash.com/photo-1626202158925-5674c0c16b67?w=500&q=80',
            price: 280,
            category: 'Vadiyalu',
            rating: 4.7,
            numReviews: 10
        }
    ];

    const getFilteredProducts = () => {
        let allProducts = products.length > 0 ? products : dummyData;

        if (categoryFilter) {
            // Fuzzy match for category (e.g. 'veg' matches 'Veg Pickles')
            // Special handling for 'Veg Pickles' vs 'Non-Veg Pickles' to avoid overlap if searching just 'Veg'
            // But here we usually pass full category name.
            if (categoryFilter === 'Veg Pickles') {
                return allProducts.filter(p => p.category === 'Veg Pickles');
            }
            if (categoryFilter === 'Non-Veg Pickles') {
                return allProducts.filter(p => p.category === 'Non-Veg Pickles');
            }
            return allProducts.filter(p => p.category?.toLowerCase().includes(categoryFilter.toLowerCase()));
        }
        return allProducts;
    };

    const displayProducts = getFilteredProducts();

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8 uppercase text-center">
                {categoryFilter ? `${categoryFilter}` : 'All Products'}
            </h1>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-lg"></div>)}
                </div>
            ) : (
                <>
                    {displayProducts.length === 0 ? (
                        <div className="text-center py-20">
                            <h2 className="text-2xl text-gray-600">No products found in this category.</h2>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {displayProducts.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    addToCartHandler={(e) => handleAddToCart(e, product)}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Shop;
