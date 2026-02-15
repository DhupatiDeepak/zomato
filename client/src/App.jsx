import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Order from './pages/Order';

import ProductList from './pages/admin/ProductList';
import ProductEdit from './pages/admin/ProductEdit';
import OrderList from './pages/admin/OrderList';

import Profile from './pages/Profile';

import ScrollToTop from './components/ScrollToTop';

function App() {
    return (
        <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/order/:id" element={<Order />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />

                        {/* Admin Routes */}
                        <Route path="/admin/productlist" element={<ProductList />} />
                        <Route path="/admin/product/:id/edit" element={<ProductEdit />} />
                        <Route path="/admin/orderlist" element={<OrderList />} />
                    </Routes>
                </main>
                <ToastContainer position="top-right" autoClose={3000} />
            </div>
            <Footer />
        </Router>
    );
}

export default App;
