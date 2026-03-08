import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { SearchContext } from "../context/SearchContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext) || {};
  const { cartItems } = useContext(CartContext) || { cartItems: [] };
  const { searchTerm, setSearchTerm } = useContext(SearchContext) || { searchTerm: "", setSearchTerm: () => {} };
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="navbar-logo">
        <span style={{ color: "white" }}>SafinPay</span>
      </Link>

      {/* Barre de recherche */}
      <form onSubmit={handleSearch} className="navbar-search">
        <input
          type="text"
          placeholder="Rechercher des produits, marques et plus..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Rechercher</button>
      </form>

      {/* Menu */}
      <div className="navbar-menu">
        {user ? (
          <>
            <div>
              <span className="navbar-link" style={{ cursor: "pointer" }}>Bonjour, {user.first_name || user.name || "Utilisateur"}</span>
            </div>
            <Link to="/account" className="navbar-link">Compte</Link>
            <button
              onClick={logout}
              className="navbar-link"
              style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", fontSize: "inherit", fontWeight: "inherit" }}
            >
              🚪 Déconnexion
            </button>
          </>
        ) : (
          <Link to="/login" className="navbar-link">Se connecter</Link>
        )}
        <Link to="/orders" className="navbar-link">Commandes</Link>
        {user?.is_seller && (
          <Link to="/seller/dashboard" className="navbar-link">Vendre</Link>
        )}
        <Link to="/cart" className="navbar-link" style={{ position: "relative" }}>
          Panier {cartItems.length > 0 && (
            <span style={{
              position: "absolute",
              top: "-8px",
              right: "-12px",
              background: "#ff9900",
              color: "white",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              fontWeight: "bold"
            }}>
              {cartItems.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
