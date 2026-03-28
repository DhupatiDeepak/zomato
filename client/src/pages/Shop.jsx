import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/Skeleton';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const dispatch = useDispatch();

    const queryParams = new URLSearchParams(location.search);
    const categoryFilter = queryParams.get('category');

    useEffect(() => {
        const fetchProducts = async () => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);

            try {
                const { data } = await axios.get('/api/products', {
                    signal: controller.signal
                });
                clearTimeout(timeoutId);
                setProducts(Array.isArray(data) ? data : []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts(dummyData); // Fallback to dummy data on error or timeout
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
            image: '/images/mango_dummy.png',
            price: 250,
            category: 'Veg Pickles',
            rating: 4.5,
            numReviews: 10
        },
        {
            _id: 'd2',
            name: 'Gongura Pickle',
            image: '/images/mango_dummy.png',
            price: 220,
            category: 'Veg Pickles',
            rating: 4.8,
            numReviews: 15
        },
        {
            _id: 'd3',
            name: 'Cut Mango Pickle',
            image: '/images/mango_dummy.png',
            price: 240,
            category: 'Veg Pickles',
            rating: 4.2,
            numReviews: 8
        },
        {
            _id: 'd4',
            name: 'Tomato Pickle',
            image: '/images/mango_dummy.png',
            price: 200,
            category: 'Veg Pickles',
            rating: 4.6,
            numReviews: 12
        },
        {
            _id: 'd5',
            name: 'Chicken Pickle (Boneless)',
            image: '/images/chicken_dummy.png',
            price: 550,
            category: 'Non-Veg Pickles',
            rating: 4.9,
            numReviews: 25
        },
        {
            _id: 'd6',
            name: 'Prawns Pickle',
            image: '/images/chicken_dummy.png',
            price: 650,
            category: 'Non-Veg Pickles',
            rating: 4.7,
            numReviews: 18
        },
        {
            _id: 'd7',
            name: 'Mutton Pickle',
            image: '/images/chicken_dummy.png',
            price: 750,
            category: 'Non-Veg Pickles',
            rating: 4.8,
            numReviews: 20
        },
        {
            _id: 'd8',
            name: 'Fish Pickle',
            image: '/images/chicken_dummy.png',
            price: 450,
            category: 'Non-Veg Pickles',
            rating: 4.3,
            numReviews: 10
        },
        {
            _id: 'd9',
            name: 'Kandi Podi',
            image: '/images/podis_dummy.png',
            price: 180,
            category: 'Podis',
            rating: 4.5,
            numReviews: 14
        },
        {
            _id: 'd10',
            name: 'Karivepaku Podi',
            image: '/images/podis_dummy.png',
            price: 190,
            category: 'Podis',
            rating: 4.6,
            numReviews: 11
        },
        {
            _id: 'd11',
            name: 'Nalla Karam',
            image: '/images/podis_dummy.png',
            price: 170,
            category: 'Podis',
            rating: 4.4,
            numReviews: 9
        },
        {
            _id: 'd12',
            name: 'Idli Karam',
            image: '/images/podis_dummy.png',
            price: 160,
            category: 'Podis',
            rating: 4.7,
            numReviews: 16
        },
        {
            _id: 'd13',
            name: 'Authentic Laddus',
            image: '/images/sweets_dummy.png',
            price: 400,
            category: 'Sweets',
            rating: 4.8,
            numReviews: 22
        },
        {
            _id: 'd14',
            name: 'Gulabilu',
            image: '/images/sweets_dummy.png',
            price: 500,
            category: 'Sweets',
            rating: 4.9,
            numReviews: 30
        },
        {
            _id: 'd15',
            name: 'Sunnundalu',
            image: '/images/sweets_dummy.png',
            price: 350,
            category: 'Sweets',
            rating: 4.6,
            numReviews: 18
        },
        {
            _id: 'd16',
            name: 'Kaja',
            image: '/images/sweets_dummy.png',
            price: 320,
            category: 'Sweets',
            rating: 4.5,
            numReviews: 15
        },
        {
            _id: 'd17',
            name: 'Handcrafted Chekkalu',
            image: '/images/brown_chekarlu.png',
            price: 250,
            category: 'Hot Snacks',
            rating: 4.7,
            numReviews: 25
        },
        {
            _id: 'd18',
            name: 'Red Chakralu',
            image: '/images/red_chakralu.png',
            price: 240,
            category: 'Hot Snacks',
            rating: 4.6,
            numReviews: 20
        },
        {
            _id: 'd19',
            name: 'Traditional Chekkis',
            image: '/images/chekkis.png',
            price: 230,
            category: 'Hot Snacks',
            rating: 4.5,
            numReviews: 15
        },
        {
            _id: 'd19b',
            name: 'Classic Godavari Chekarlu',
            image: '/images/laddus.png',
            price: 260,
            category: 'Hot Snacks',
            rating: 4.8,
            numReviews: 18
        },
        {
            _id: 'd20',
            name: 'Saggubiyyam Vadiyalu',
            image: '/images/mango_dummy.png',
            price: 300,
            category: 'Vadiyalu',
            rating: 4.8,
            numReviews: 12
        },
        {
            _id: 'd21',
            name: 'Minapa Vadiyalu',
            image: '/images/mango_dummy.png',
            price: 280,
            category: 'Vadiyalu',
            rating: 4.7,
            numReviews: 10
        }
    ];

    const getFilteredProducts = () => {
        let allProducts = Array.isArray(products) && products.length > 0 ? products : dummyData;

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
        <div className="bg-dark min-h-screen py-8 md:py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl md:text-4xl font-serif font-black text-light mb-8 md:mb-10 uppercase text-center tracking-tighter">
                    {categoryFilter ? `${categoryFilter}` : 'All Products'}
                </h1>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <SkeletonCard key={i} />)}
                    </div>
                ) : (
                    <>
                        {displayProducts.length === 0 ? (
                            <div className="text-center py-20 px-4">
                                <h2 className="text-xl md:text-2xl text-gray-500 font-bold uppercase tracking-widest whitespace-normal md:whitespace-nowrap">No products found.</h2>
                            </div>
                        ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
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
        </div>
    );
};

export default Shop;
