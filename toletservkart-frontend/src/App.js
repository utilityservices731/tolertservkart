import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ListingDetails from './pages/ListingDetails';
import ProductDetails from './pages/ProductDetails';
import UploadListing from './pages/UploadListing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EditProfile from './pages/EditProfile';
import OrderHistory from './pages/OrderHistory';
import Checkout from './pages/Checkout';
import Notifications from './pages/Notifications';
import AdminPanel from './pages/AdminPanel';
import ChatPage from './pages/ChatPage';
import Property from './pages/Property';
import HomeAppliances from './pages/HomeAppliances';
import Dresses from './pages/Dresses';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import CartPage from './pages/CartPage';
import ExploreAllProducts from './pages/ExploreAllProducts';
import SearchResults from './pages/SearchResults';

import OwnerLogin from './owner/OwnerLogin';
import OwnerRegister from './owner/OwnerRegister';
import OwnerDashboard from './owner/OwnerDashboard';
import OwnerUploadProduct from './owner/OwnerUploadProduct';
import OwnerMyProducts from './owner/OwnerMyProducts';
import OwnerOrderRequests from './owner/OwnerOrderRequests';
import OwnerWallet from './owner/OwnerWallet';
import OwnerProfileSettings from './owner/OwnerProfileSettings';
import OwnerSupport from './owner/OwnerSupport';
import OwnerMyOrders from './owner/OwnerMyOrders';

import AdminLogin from './admin/AdminLogin';
import AdminRegister from './admin/AdminRegister';
import AdminDashboard from './admin/AdminDashboard';
import AdminManageUsers from './admin/AdminManageUsers';
import AdminManageListings from './admin/AdminManageListings';
import AdminApproveRequests from './admin/AdminApproveRequests';
import AdminMessages from './admin/AdminMessages';
import AdminReports from './admin/AdminReports';
import AdminPaymentHistory from './admin/AdminPaymentHistory';
import AdminFeedbacks from './admin/AdminFeedbacks';
import AdminNotifications from './admin/AdminNotifications';
import AdminSettings from './admin/AdminSettings';

import PrivateRoute from './components/PrivateRoute';

// ✅ Import LocationProvider
import LocationProvider from './context/LocationProvider';

function App() {
  return (
    <LocationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:name" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
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
          <Route path="/cart" element={<CartPage />} />
          <Route path="/explore-all" element={<ExploreAllProducts />} />
          <Route path="/search" element={<SearchResults />} />

          {/* Owner Routes */}
          <Route path="/owner-login" element={<OwnerLogin />} />
          <Route path="/owner-register" element={<OwnerRegister />} />
          <Route
            path="/owner-dashboard"
            element={
              <PrivateRoute>
                <OwnerDashboard />
              </PrivateRoute>
            }
          />
          <Route path="/upload-product" element={<OwnerUploadProduct />} />
          <Route path="/my-products" element={<OwnerMyProducts />} />
          <Route path="/order-requests" element={<OwnerOrderRequests />} />
          <Route path="/wallet" element={<OwnerWallet />} />
          <Route path="/profile-settings" element={<OwnerProfileSettings />} />
          <Route path="/support" element={<OwnerSupport />} />
          <Route path="/my-orders" element={<OwnerMyOrders />} />

          {/* Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/manage-users" element={<AdminManageUsers />} />
          <Route path="/admin/manage-listings" element={<AdminManageListings />} />
          <Route path="/admin/approve-requests" element={<AdminApproveRequests />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/payment-history" element={<AdminPaymentHistory />} />
          <Route path="/admin/feedbacks" element={<AdminFeedbacks />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Routes>
      </Router>
    </LocationProvider>
  );
}

export default App;
