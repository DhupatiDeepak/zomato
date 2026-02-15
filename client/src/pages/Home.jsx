import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);

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
        e.preventDefault(); // Prevent navigation to product details
        dispatch(addToCart({ ...product, product: product._id, qty: 1 }));
        toast.success(`${product.name} added to cart`, { position: "bottom-center" });
        // navigate('/cart'); // Removed redirect per user request
    };

    // Dummy Data for when backend is empty
    const dummyData = [
        // Veg Pickles
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
        // Non-Veg Pickles
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
        // Podis
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
        // Sweets
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
        // Hot Snacks
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
        // Vadiyalu
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

    // ... (keeping dummy data logic, I will target the rendering part for the button)

    // Helper functions to filter products for the specific rows in reference
    const getProductsByCategory = (category) => {
        // Try to filter real products first
        let filtered = products.filter(p => p.category?.toLowerCase().includes(category.toLowerCase()));

        // If no real products, fall back to dummy data for that category
        if (filtered.length === 0) {
            filtered = dummyData.filter(p => p.category?.toLowerCase().includes(category.toLowerCase()));
        }

        return filtered.slice(0, 4);
    };

    const vegPickles = getProductsByCategory('Veg Pickles');
    const nonVegPickles = getProductsByCategory('Non-Veg Pickles');
    const sweets = getProductsByCategory('Sweets');
    const snacks = getProductsByCategory('Hot Snacks');
    const podis = getProductsByCategory('Podis');
    const vadiyalu = getProductsByCategory('Vadiyalu');


    return (
        <div className="bg-white min-h-screen pb-20 relative">
            {/* 1. Hero Section - Full Width Banner */}
            <div className="relative w-full h-[500px] bg-gray-900 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1626202158925-5674c0c16b67?q=80&w=2070&auto=format&fit=crop"
                    alt="Authentic Pickles"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-end pr-10 md:pr-32 text-white">
                    <h2 className="text-xl md:text-2xl font-light tracking-widest mb-2 uppercase">Authentic & Homemade</h2>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-right leading-tight">
                        NON - VEG PICKLES <br />
                        <span className="text-xl md:text-2xl font-sans font-normal mt-4 block normal-case opacity-90">
                            Taste the tradition of Andhra with our <br />premium collection
                        </span>
                    </h1>
                    <button className="bg-primary hover:bg-red-700 text-white px-8 py-3 rounded-sm font-bold tracking-wider uppercase transition">
                        Shop Now
                    </button>
                </div>
            </div>

            {/* 2. Top Categories Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Top categories</h2>
                    <a href="/shop" className="text-sm font-bold text-gray-500 hover:text-primary uppercase">View all &rarr;</a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 text-center">
                    {['Veg Pickles', 'Non-Veg Pickles', 'Dry Non-Veg Items', 'Hot Snacks', 'Sweets', 'Podis', 'Vadiyalu'].map((cat, idx) => (
                        <Link key={idx} to={`/shop?category=${encodeURIComponent(cat)}`} className="group cursor-pointer block">
                            <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-primary transition shadow-sm">
                                <img
                                    src={`https://source.unsplash.com/random/150x150?food,${cat.split(' ')[0]}`}
                                    // Fallback if unsplash source is flaky, effectively a placeholder for now
                                    onError={(e) => e.target.src = 'https://via.placeholder.com/150?text=' + cat.charAt(0)}
                                    alt={cat}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                />
                            </div>
                            <h3 className="text-xs md:text-sm font-bold text-gray-700 group-hover:text-primary uppercase tracking-wide">{cat}</h3>
                        </Link>
                    ))}
                </div>
            </div>

            {/* 3. Featured Product Section (Chicken Avakaya) */}
            <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">Chicken avakai from andhra</h2>
                        <a href="/product/chicken-avakai" className="text-sm font-bold text-gray-500 hover:text-primary uppercase">View all &rarr;</a>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/2 h-80 md:h-[450px] relative">
                                <img
                                    src="https://images.unsplash.com/photo-1599305090598-fe179d501227?w=800&auto=format&fit=crop&q=60"
                                    alt="Chicken Avakai"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 left-4">
                                    {/* Any badge */}
                                </div>
                            </div>
                            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                                <h3 className="text-3xl font-serif font-bold text-gray-900 mb-2">Chicken Avakai From Andhra</h3>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="text-2xl font-bold text-primary">₹349</span>
                                    <span className="text-gray-400 line-through">₹499</span>
                                    <span className="text-green-600 text-sm font-bold bg-green-50 px-2 py-1 rounded">30% OFF</span>
                                </div>

                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    Experience the authentic spicy punch of Godavari Chicken Avakai. Made with premium chicken chunks, traditional spices, and cold-pressed groundnut oil. A must-try delicacy!
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="border border-gray-300 rounded flex items-center justify-between px-4 py-2 w-32">
                                        <button className="text-gray-500 hover:text-primary">-</button>
                                        <span className="font-bold text-gray-800">1</span>
                                        <button className="text-gray-500 hover:text-primary">+</button>
                                    </div>
                                    <button
                                        className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-sm font-bold uppercase tracking-wider transition flex-grow sm:flex-grow-0"
                                        onClick={(e) => handleAddToCart(e, {
                                            _id: 'featured_chicken_avakai',
                                            name: 'Chicken Avakai From Andhra',
                                            price: 349,
                                            image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=800&auto=format&fit=crop&q=60',
                                            category: 'Non-Veg Pickles',
                                            countInStock: 10
                                        })}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Category Rows */}
            <CategoryRow title="Veg Pickles" products={vegPickles} loading={loading} addToCartHandler={handleAddToCart} />
            <CategoryRow title="Non-Veg Pickles" products={nonVegPickles} loading={loading} addToCartHandler={handleAddToCart} />
            <CategoryRow title="Podis" products={podis} loading={loading} addToCartHandler={handleAddToCart} />
            <CategoryRow title="Sweets" products={sweets} loading={loading} addToCartHandler={handleAddToCart} />
            <CategoryRow title="Hot Snacks" products={snacks} loading={loading} addToCartHandler={handleAddToCart} />
            <CategoryRow title="Vadiyalu" products={vadiyalu} loading={loading} addToCartHandler={handleAddToCart} />

            {cartItems.length > 0 && (
                <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 px-8 z-50 flex justify-between items-center animate-slideUp">
                    <div>
                        <p className="text-gray-600 text-sm">Total Items</p>
                        <p className="text-xl font-bold text-gray-900">{cartItems.reduce((acc, item) => acc + item.qty, 0)} Items</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <p className="text-xl font-bold text-primary mr-4">₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</p>
                        <button
                            onClick={() => navigate('/cart')}
                            className="bg-primary text-white px-8 py-3 rounded-sm font-bold uppercase tracking-wider hover:bg-red-700 transition shadow-lg"
                        >
                            Checkout &rarr;
                        </button>
                    </div>
                </div>
            )}

            {/* 6. Testimonials */}
            <div className="container mx-auto px-4 py-16 pb-24"> {/* Added extra padding bottom for sticky bar */}
                <h2 className="text-2xl font-bold text-gray-800 mb-8 uppercase tracking-wide border-l-4 border-primary pl-4">Customer Testimonials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <TestimonialCard
                        name="Srinivas"
                        text="The veg pickles from Godavari Ruchulu are amazing! Reminds me of my grandmother's recipes. The Gongura pickle is specifically outstanding."
                        rating={5}
                    />
                    <TestimonialCard
                        name="Sunitha"
                        text="The non-veg pickles are hygiene and tasty! The texture of pieces in Chicken Avakai is just perfect. Will order again!"
                        rating={5}
                    />
                </div>
            </div>

        </div>
    );
};

// --- Helper Components (Internal for now for speed) ---

const CategoryRow = ({ title, products, loading, addToCartHandler }) => (
    <div className="container mx-auto px-4 py-12 border-b border-gray-100">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">{title}</h2>
            <Link to="/shop" className="text-sm font-bold text-gray-500 hover:text-primary flex items-center">
                View all <span className="ml-1 text-lg">›</span>
            </Link>
        </div>

        {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-lg"></div>)}
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        addToCartHandler={(e) => addToCartHandler(e, product)}
                    />
                ))}
            </div>
        )}
    </div>
);

const TestimonialCard = ({ name, text, rating }) => (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex text-secondary mb-4">
            {[...Array(5)].map((_, i) => (
                <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>★</span>
            ))}
        </div>
        <p className="text-gray-600 italic mb-6 leading-relaxed">"{text}"</p>
        <h4 className="font-bold text-gray-900 uppercase text-sm tracking-wider">- {name}</h4>
    </div>
);

export default Home;
