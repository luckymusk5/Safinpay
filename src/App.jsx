import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Imports des composants
import Navbar_new from "./components/Navbar_new";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Footer_new from "./components/Footer_new";

// Imports des pages
import HomeSimple from "./pages/HomeSimple";
import ProductDetail_new from "./pages/ProductDetail_new";
import Cart_new from "./pages/Cart_new";
import SellerShop from "./pages/SellerShop";
import Categories from "./pages/Categories";
import Orders_new from "./pages/Orders_new";
import Account_new from "./pages/Account_new";
import SellerDashboard_new from "./pages/SellerDashboard_new";
import BecomeSeller_new from "./pages/BecomeSeller_new";
import Search_new from "./pages/Search_new";
import Login_new from "./pages/Login_new";
import Register_new from "./pages/Register_new";
import Payment_new from "./pages/Payment_new";
import OrderConfirmation_new from "./pages/OrderConfirmation_new";
import AddProduct_new from "./pages/AddProduct_new"; 

// Imports des Contextes
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";
import { SearchProvider } from "./context/SearchContext";

const Page404 = () => (
  <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <h1 style={{ fontSize: '100px', color: '#003366', margin: '0' }}>404</h1>
    <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Oups ! Cette page n'existe pas.</h2>
    <p style={{ color: '#666', marginBottom: '30px' }}>Il semble que vous vous soyez égaré sur Safinpay.</p>
    <Link to="/" style={{ padding: '12px 25px', backgroundColor: '#003366', color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
      Retourner à l'accueil
    </Link>
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <SearchProvider>
            <Router>
              <Navbar_new />
              <Routes>
                {/* Routes publiques */}
                <Route path="/" element={<HomeSimple />} />
                <Route path="/login" element={<Login_new />} />
                <Route path="/register" element={<Register_new />} />
                <Route path="/product/:id" element={<ProductDetail_new />} />
                <Route path="/search" element={<Search_new />} />
                <Route path="/seller/:sellerId" element={<SellerShop />} />
                <Route path="/categories" element={<Categories />} />

                {/* Routes protégées */}
                <Route path="/cart" element={<ProtectedRoute requireAuth={true}><Cart_new /></ProtectedRoute>} />
                <Route path="/payment" element={<ProtectedRoute requireAuth={true}><Payment_new /></ProtectedRoute>} />
                <Route path="/order-confirmation/:orderId" element={<ProtectedRoute requireAuth={true}><OrderConfirmation_new /></ProtectedRoute>} />
                <Route path="/orders" element={<ProtectedRoute requireAuth={true}><Orders_new /></ProtectedRoute>} />
                <Route path="/account" element={<ProtectedRoute requireAuth={true}><Account_new /></ProtectedRoute>} />
                <Route path="/become-seller" element={<ProtectedRoute requireAuth={true}><BecomeSeller_new /></ProtectedRoute>} />
                <Route path="/seller/dashboard" element={<ProtectedRoute requireAuth={true} requireSeller={true}><SellerDashboard_new /></ProtectedRoute>} />

                {/* Page 404 */}
                <Route path="*" element={<Page404 />} />
              </Routes>
              <Footer_new />
            </Router>
          </SearchProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
