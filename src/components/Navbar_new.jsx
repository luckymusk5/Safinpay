import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { SearchContext } from "../context/SearchContext";

const NAVY = "#1b3a6b";
const NAV_LINKS = [
  { label: "Accueil", to: "/" },
  { label: "Produits", to: "/search" },
  { label: "Fournisseurs", to: "/search" },
  { label: "Commandes", to: "/orders" },
  { label: "Messages", to: "/account" },
  { label: "Aide", to: "/account" },
];

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
    <header style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.07)", position: "sticky", top: 0, zIndex: 100 }}>
      {/* ── Row 1: Logo + Search + Account links ── */}
      <div style={{ display: "flex", alignItems: "center", padding: "0.85rem 2rem", gap: "1.5rem", maxWidth: "1400px", margin: "0 auto" }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <span style={{ fontSize: "1.8rem", fontWeight: "800", letterSpacing: "-0.5px" }}>
            <span style={{ color: "#000000" }}>Safin</span><span style={{ color: NAVY }}>pay</span>
          </span>
        </Link>

        {/* Search bar */}
        <form onSubmit={handleSearch} style={{ flex: 1, display: "flex", maxWidth: "680px" }}>
          <input
            type="text"
            placeholder="Rechercher des produits, fournisseurs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: "0.65rem 1rem",
              border: `2px solid ${NAVY}`,
              borderRight: "none",
              borderRadius: "6px 0 0 6px",
              fontSize: "0.93rem",
              outline: "none",
              color: "#333",
              background: "white",
              fontFamily: "inherit"
            }}
          />
          <button
            type="submit"
            style={{
              padding: "0 1.3rem",
              background: NAVY,
              color: "white",
              border: "none",
              borderRadius: "0 6px 6px 0",
              cursor: "pointer",
              fontSize: "0.88rem",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "inherit"
            }}
          >
            Rechercher
          </button>
        </form>

        {/* Right account links */}
        <div style={{ display: "flex", gap: "1.8rem", alignItems: "center", flexShrink: 0 }}>
          {user ? (
            <>
              <span style={{ color: "#444", fontSize: "0.9rem", fontWeight: "500" }}>
                {user.first_name || user.name || "Mon compte"}
              </span>
              <button
                onClick={logout}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#444", fontSize: "0.9rem", fontWeight: "500", padding: 0, fontFamily: "inherit" }}
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link to="/login" style={{ color: "#444", textDecoration: "none", fontSize: "0.9rem", fontWeight: "500" }}>Compte</Link>
          )}
          <Link to="/account" style={{ color: "#444", textDecoration: "none", fontSize: "0.9rem", fontWeight: "500" }}>Favoris</Link>
          <Link to="/cart" style={{ color: "#444", textDecoration: "none", fontSize: "0.9rem", fontWeight: "500", position: "relative" }}>
            Panier
            {cartItems.length > 0 && (
              <span style={{
                position: "absolute", top: "-8px", right: "-14px",
                background: NAVY, color: "white",
                borderRadius: "50%", width: "18px", height: "18px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.7rem", fontWeight: "bold"
              }}>
                {cartItems.length}
              </span>
            )}
          </Link>
          {user?.is_seller && (
            <Link to="/seller/dashboard" style={{ color: NAVY, textDecoration: "none", fontSize: "0.9rem", fontWeight: "700" }}>Vendre</Link>
          )}
        </div>
      </div>

      {/* ── Row 2: Navigation links ── */}
      <div style={{ borderTop: "1px solid #f0f0f0" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1.5rem", display: "flex" }}>
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              style={{
                padding: "0.5rem 1.1rem",
                color: "#333",
                textDecoration: "none",
                fontSize: "0.88rem",
                fontWeight: "500",
                borderBottom: "2px solid transparent",
                transition: "color 0.2s, border-color 0.2s",
                display: "block"
              }}
              onMouseEnter={e => { e.currentTarget.style.color = NAVY; e.currentTarget.style.borderBottomColor = NAVY; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#333"; e.currentTarget.style.borderBottomColor = "transparent"; }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
