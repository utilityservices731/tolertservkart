import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ListingDetails from './pages/ListingDetails';
import UploadListing from './pages/UploadListing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import EditProfile from './pages/EditProfile';
import OrderHistory from './pages/OrderHistory';
import Checkout from './pages/Checkout';
import Notifications from './pages/Notifications';
import AdminPanel from './pages/AdminPanel';
import ChatPage from './pages/ChatPage';
import Property from './pages/Property';
import HomeAppliances from './pages/HomeAppliances';
import Dresses from './pages/Dresses';
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";

// ✅ Corrected path for Owner components
import OwnerLogin from "./owner/OwnerLogin";
import OwnerRegister from "./owner/OwnerRegister";
import OwnerDashboard from "./owner/OwnerDashboard";
import PrivateRoute from "./components/PrivateRoute";
import OwnerUploadProduct from "./owner/OwnerUploadProduct";
import OwnerMyProducts from "./owner/OwnerMyProducts";
import OwnerOrderRequests from "./owner/OwnerOrderRequests";
import OwnerWallet from "./owner/OwnerWallet";
import OwnerProfileSettings from "./owner/OwnerProfileSettings";
import OwnerSupport from "./owner/OwnerSupport";

// Admin components
import AdminLogin from "./admin/AdminLogin";
import AdminRegister from "./admin/AdminRegister";
import AdminDashboard from "./admin/AdminDashboard";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:name" element={<CategoryPage />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route path="/upload" element={<UploadListing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/property" element={<Property />} />
        <Route path="/home-appliances" element={<HomeAppliances />} />
        <Route path="/dresses" element={<Dresses />} />
        {/* Owner Routes */}
        <Route path="/owner-login" element={<OwnerLogin />} />
        <Route path="/owner-register" element={<OwnerRegister />} />
         <Route path="/owner-dashboard" element={<OwnerDashboard />} />
    <Route path="/upload-product" element={<OwnerUploadProduct />} />
    <Route path="/my-products" element={<OwnerMyProducts />} />
    <Route path="/order-requests" element={<OwnerOrderRequests />} />
    <Route path="/wallet" element={<OwnerWallet />} />
    <Route path="/profile-settings" element={<OwnerProfileSettings />} />
    <Route path="/support" element={<OwnerSupport />} />
        <Route
          path="/owner-dashboard"
          element={
            <PrivateRoute>
              <OwnerDashboard />
            </PrivateRoute>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
