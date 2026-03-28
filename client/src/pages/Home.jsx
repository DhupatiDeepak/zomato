import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/Skeleton';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { user, isAuthenticated } = useSelector((state) => state.auth);

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

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const slides = [
        {
            image: '/images/hero.png',
            subtitle: 'Est. 1995 • Handcrafted Tradition',
            title: 'SPICY PERFECTION',
            description: 'Experience the raw, unadulterated flavors of Ronanki hot chips. Made with sun-dried ingredients and time-honored family secrets.'
        },
        {
            image: '/images/veg_pickles.png',
            subtitle: 'Grandmother\'s Recipes',
            title: 'VEG DELIGHTS',
            description: 'From stone-ground Gongura to classic Mango Avakaya, rediscover the taste of home in every bite.'
        },
        {
            image: '/images/non_veg_pickles.png',
            subtitle: 'Premium Selection',
            title: 'MEATY BLISS',
            description: 'Succulent pieces of chicken and mutton marinated in artisan spices. A gourmet non-veg experience like no other.'
        },
        {
            image: '/images/spread.png',
            subtitle: 'The Full Feast',
            title: 'GOURMET SPREAD',
            description: 'Explore our complete collection of authentic Andhra powders, pickles, and traditional sweets.'
        },
        {
            image: '/images/laddus.png',
            subtitle: 'Sweet Endings',
            title: 'SWEET HERITAGE',
            description: 'Hand-rolled Sunnundalu and Ghee Ariselu. Pure, festive flavors delivered right to your doorstep.'
        }
    ];

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
        // Non-Veg Pickles
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
        // Podis
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
        // Sweets
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
        // Hot Snacks
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
            name: 'Classic Ronanki Chekarlu',
            image: '/images/brown_chekarlu.png',
            price: 260,
            category: 'Hot Snacks',
            rating: 4.8,
            numReviews: 18
        },
        // Vadiyalu
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

    // ... (keeping dummy data logic, I will target the rendering part for the button)

    // Helper functions to filter products for the specific rows in reference
    const getProductsByCategory = (category) => {
        // Try to filter real products first safely
        let filtered = Array.isArray(products) 
            ? products.filter(p => p && p.category?.toLowerCase().includes(category.toLowerCase()))
            : [];
        
        // If no real products, fall back to dummy data for that category
        if (filtered.length === 0) {
            filtered = Array.isArray(dummyData) 
                ? dummyData.filter(p => p && p.category?.toLowerCase().includes(category.toLowerCase()))
                : [];
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
        <div className="bg-dark min-h-screen pb-20 relative">
            {/* Mobile-Only Admin Quick Access Banner */}
            {isAuthenticated && user?.isAdmin && (
                <div className="md:hidden bg-[#0F172A] border-b border-primary/20 p-4 animate-pulse">
                    <button 
                        onClick={() => navigate('/admin/dashboard')}
                        className="w-full bg-primary/10 border border-primary text-primary py-3 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                    >
                        ⚡ Access Admin Dashboard
                    </button>
                    <p className="text-[9px] text-gray-500 text-center mt-2 font-bold uppercase tracking-widest">Administrator Quick Access</p>
                </div>
            )}

            {/* 1. Hero Section - Premium Cinematic Slideshow - Compact Height */}
            <div className="relative w-full h-[450px] md:h-[550px] bg-dark overflow-hidden group">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out ${
                            index === currentSlide ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-110 rotate-1'
                        }`}
                    >
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent"></div>
                        
                        <div className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center text-white">
                            <div className={`overflow-hidden mb-2 transition-all duration-1000 delay-300 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <h2 className="text-secondary text-sm md:text-base font-black tracking-[0.4em] uppercase">
                                    {slide.subtitle}
                                </h2>
                            </div>
                            
                            <div className={`overflow-hidden mb-4 transition-all duration-1000 delay-500 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                                <h1 className="text-5xl md:text-8xl font-serif font-black leading-[0.8] tracking-tighter uppercase">
                                    {slide.title.split(' ')[0]} <br />
                                    <span className="text-secondary italic">{slide.title.split(' ')[1]}</span>
                                </h1>
                            </div>
                            
                            <div className={`max-w-2xl mb-8 transition-all duration-1000 delay-700 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <p className="text-gray-300 text-base md:text-lg leading-relaxed font-medium">
                                    {slide.description}
                                </p>
                            </div>
                            
                            <div className={`flex gap-4 transition-all duration-1000 delay-1000 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <button className="bg-white text-dark hover:bg-secondary hover:text-dark px-10 py-4 rounded-full font-black text-xs tracking-widest transition-all duration-300 shadow-2xl hover:shadow-secondary/40 active:scale-95 uppercase">
                                    Shop Collection
                                </button>
                                <button className="border-2 border-white/30 hover:border-white text-white px-10 py-4 rounded-full font-black text-xs tracking-widest transition-all duration-300 active:scale-95 uppercase backdrop-blur-md">
                                    Our Legacy
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Slide Indicators - Compact positioning */}
                <div className="absolute bottom-10 right-10 z-20 flex gap-3">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            className={`h-1 transition-all duration-500 rounded-full ${
                                i === currentSlide ? 'w-10 bg-secondary' : 'w-3 bg-white/20 hover:bg-white/40'
                            }`}
                        />
                    ))}
                </div>

                <div className="absolute bottom-10 left-10 hidden md:flex gap-8 z-20">
                   <div className="flex flex-col">
                       <span className="text-secondary font-black text-2xl">100%</span>
                       <span className="text-gray-400 text-[9px] uppercase font-black tracking-[0.3em]">Pure Natural</span>
                   </div>
                   <div className="w-[1px] h-10 bg-white/10"></div>
                   <div className="flex flex-col">
                       <span className="text-secondary font-black text-2xl">25+</span>
                       <span className="text-gray-400 text-[9px] uppercase font-black tracking-[0.3em]">Ancient Recipes</span>
                   </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 gap-4 text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start">
                        <h2 className="text-2xl md:text-3xl font-serif font-black text-light mb-1.5 tracking-tighter uppercase">Taste Categories</h2>
                        <div className="h-1.5 w-16 bg-primary"></div>
                    </div>
                    <a href="/shop" className="text-[10px] md:text-xs font-black text-gray-500 hover:text-primary uppercase tracking-[0.2em] transition-colors border-b-2 border-transparent hover:border-primary pb-1">
                        Explore All Collections &rarr;
                    </a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
                    {[
                        { name: 'Veg Pickles', img: '/images/veg_pickles.png' },
                        { name: 'Non-Veg Pickles', img: '/images/non_veg_pickles.png' },
                        { name: 'Podis', img: '/images/podis.png' },
                        { name: 'Sweets', img: '/images/laddus.png' },
                        { name: 'Hot Snacks', img: '/images/brown_chekarlu.png' },
                        { name: 'Vadiyalu', img: '/images/vadiyalu_category.png' }
                    ].map((cat, idx) => (
                        <Link key={idx} to={`/shop?category=${encodeURIComponent(cat.name)}`} className="group cursor-pointer block text-center">
                            <div className="relative w-28 h-28 md:w-36 md:h-36 mx-auto rounded-full overflow-hidden mb-4 border-4 border-white/5 shadow-2xl group-hover:shadow-primary/40 transition-all duration-500 transform group-hover:-translate-y-1.5">
                                <img
                                    src={cat.img}
                                    alt={cat.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                />
                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                            <h3 className="text-[10px] md:text-xs font-black text-light group-hover:text-primary uppercase tracking-widest transition-colors">{cat.name}</h3>
                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter mt-1 opacity-0 group-hover:opacity-100 transition-opacity">View Products</p>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="bg-dark/40 py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 gap-4 text-center md:text-left">
                        <div className="flex flex-col items-center md:items-start">
                            <h2 className="text-2xl md:text-3xl font-serif font-black text-light mb-1.5 tracking-tighter uppercase">Signature Delicacy</h2>
                            <div className="h-1.5 w-16 bg-primary"></div>
                        </div>
                        <a href="/product/chicken-avakai" className="text-[10px] md:text-xs font-black text-gray-500 hover:text-primary uppercase tracking-[0.2em] transition-colors border-b-2 border-transparent hover:border-primary pb-1">
                            Discover More &rarr;
                        </a>
                    </div>

                    <div className="bg-dark/60 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/5 overflow-hidden backdrop-blur-sm">
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/2 h-80 md:h-[450px] relative group">
                                <img
                                    src="/images/non_veg_pickles.png"
                                    alt="Chicken Avakai"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-8 left-8">
                                    <span className="bg-primary text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl">
                                        Chef's Choice
                                    </span>
                                </div>
                            </div>                            <div className="md:w-1/2 p-8 md:p-14 flex flex-col justify-center items-center md:items-start text-center md:text-left bg-dark/20 backdrop-blur-sm">
                                <h3 className="text-3xl md:text-4xl font-serif font-black text-light mb-3 leading-tight tracking-tighter">Chicken Avakai <br /><span className="text-primary italic">From Andhra</span></h3>
                                <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                                    <span className="text-3xl font-black text-light">₹349</span>
                                    <span className="text-base text-gray-500 line-through font-medium">₹499</span>
                                    <span className="text-primary text-[10px] font-black bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full uppercase tracking-wider">30% OFF</span>
                                </div>

                                <p className="text-gray-400 mb-8 leading-relaxed font-medium text-base italic max-w-md">
                                    "Experience the authentic spicy punch of Ronanki Chicken Avakai. Made with premium chicken chunks, traditional spices, and cold-pressed groundnut oil."
                                </p>

                                <div className="flex flex-col sm:flex-row gap-5 items-center justify-center md:justify-start">
                                    <div className="bg-white/5 border border-white/10 rounded-full flex items-center justify-between px-5 py-3 w-36">
                                        <button className="text-gray-500 hover:text-primary font-black transition-colors">-</button>
                                        <span className="font-black text-light text-sm">1 KG</span>
                                        <button className="text-gray-400 hover:text-primary font-black transition-colors">+</button>
                                    </div>
                                    <button
                                        className="bg-primary hover:bg-red-700 text-white px-10 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 shadow-2xl shadow-primary/20 active:scale-95 flex-grow sm:flex-grow-0"
                                        onClick={(e) => handleAddToCart(e, {
                                            _id: 'featured_chicken_avakai',
                                            name: 'Chicken Avakai From Andhra',
                                            price: 349,
                                            image: '/images/non_veg_pickles.png',
                                            category: 'Non-Veg Pickles',
                                            countInStock: 10
                                        })}
                                    >
                                        Add to Basket
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Category Rows - Refined Titles */}
            <CategoryRow title="Veg Pickles" products={vegPickles} loading={loading} addToCartHandler={handleAddToCart} />
            <CategoryRow title="Non-Veg Pickles" products={nonVegPickles} loading={loading} addToCartHandler={handleAddToCart} />
            <CategoryRow title="Podis" products={podis} loading={loading} addToCartHandler={handleAddToCart} />
            <CategoryRow title="Sweets" products={sweets} loading={loading} addToCartHandler={handleAddToCart} />
            <CategoryRow title="Hot Snacks" products={snacks} loading={loading} addToCartHandler={handleAddToCart} highlight={true} />
            <CategoryRow title="Vadiyalu" products={vadiyalu} loading={loading} addToCartHandler={handleAddToCart} />

            {cartItems.length > 0 && (
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[92%] md:w-auto bg-dark/90 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-4 md:p-6 px-8 md:px-12 rounded-[1.5rem] md:rounded-[2rem] z-50 flex justify-between items-center animate-slideUp gap-8 md:gap-14">
                    <div className="hidden sm:block">
                        <p className="text-gray-400 text-[9px] uppercase font-black tracking-widest mb-0.5">Items in Basket</p>
                        <p className="text-xl font-black text-white">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</p>
                    </div>
                    <div className="flex items-center gap-6 md:gap-10">
                        <div>
                            <p className="text-gray-400 text-[9px] uppercase font-black tracking-widest mb-0.5">Estimated Total</p>
                            <p className="text-xl font-black text-secondary">₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</p>
                        </div>
                        <button
                            onClick={() => navigate('/cart')}
                            className="bg-white text-dark hover:bg-secondary px-8 py-3.5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-300 shadow-xl active:scale-95 whitespace-nowrap"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}

            {/* 6. Testimonials - Premium Compact Layout */}
            <div className="container mx-auto px-4 py-16 pb-24">
                <div className="flex flex-col items-center text-center mb-12">
                    <h2 className="text-3xl font-serif font-black text-light mb-3 tracking-tighter uppercase italic">Words of Love</h2>
                    <div className="h-1.5 w-20 bg-primary"></div>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-4">What our community says about us</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <TestimonialCard
                        name="Srinivas K."
                        text="The veg pickles from Ronanki hot chips are amazing! Reminds me of my grandmother's recipes. The Gongura pickle is specifically outstanding and has that authentic stone-ground texture."
                        rating={5}
                    />
                    <TestimonialCard
                        name="Sunitha Reddy"
                        text="The non-veg pickles are hygiene and incredibly tasty! The texture of pieces in Chicken Avakai is just perfect—juicy and well-marinated. Will definitely be a regular customer!"
                        rating={5}
                    />
                </div>
            </div>

        </div>
    );
};

 // --- Helper Components (Internal for now for speed) ---

const CategoryRow = ({ title, products, loading, addToCartHandler, highlight }) => (
    <div className={`container mx-auto px-4 py-12 md:py-16 border-b border-white/5 relative ${highlight ? 'bg-primary/5 rounded-[3rem] my-8 border border-primary/20 shadow-[0_0_50px_rgba(239,68,68,0.1)]' : ''}`}>
        {highlight && (
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[9px] font-black px-5 py-1.5 rounded-full uppercase tracking-[0.3em] shadow-2xl z-10">
                Customer Favorite • Hot & Fresh
            </div>
        )}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 gap-4 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
                <h2 className="text-xl md:text-2xl font-serif font-black text-light mb-1.5 tracking-tighter uppercase">
                    {title} {highlight && <span className="text-primary italic ml-2">Special</span>}
                </h2>
                <div className={`h-1 w-10 ${highlight ? 'bg-primary w-20' : 'bg-primary'}`}></div>
            </div>
            <Link to="/shop" className="text-[9px] font-black text-gray-500 hover:text-primary uppercase tracking-[0.2em] transition-colors border-b border-transparent hover:border-primary pb-1 flex items-center gap-2">
                View Collection <span>→</span>
            </Link>
        </div>

        {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
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
    <div className="bg-dark/40 p-8 rounded-[2rem] shadow-2xl border border-white/5 relative overflow-hidden group hover:-translate-y-1.5 transition-all duration-500 backdrop-blur-sm">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/20 group-hover:bg-primary transition-colors"></div>
        <div className="flex text-secondary mb-5 text-xs">
            {[...Array(5)].map((_, i) => (
                <span key={i} className={i < rating ? "text-secondary" : "text-gray-700"}>★</span>
            ))}
        </div>
        <p className="text-light font-serif italic mb-6 leading-relaxed text-base">"{text}"</p>
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-black text-primary text-[10px] uppercase">
                {name.charAt(0)}
            </div>
            <h4 className="font-black text-light uppercase text-[9px] tracking-[0.2em]">{name}</h4>
        </div>
    </div>
);

export default Home;
