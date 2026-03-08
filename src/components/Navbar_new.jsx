import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
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

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

export default function Navbar() {
  const { user, logout } = useContext(AuthContext) || {};
  const { cartItems } = useContext(CartContext) || { cartItems: [] };
  const { searchTerm, setSearchTerm } = useContext(SearchContext) || { searchTerm: "", setSearchTerm: () => {} };
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const w = useWindowWidth();
  const isMobile = w < 768;
  const isTablet = w < 1024;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Close mobile menu on navigation
  const closeMenu = () => setMenuOpen(false);

  return (
    <header style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.07)", position: "sticky", top: 0, zIndex: 200 }}>
      {/* ── Row 1: Logo + Search + Account links ── */}
      <div style={{
        display: "flex", alignItems: "center",
        padding: isMobile ? "0.7rem 1rem" : "0.85rem 2rem",
        gap: isMobile ? "0.75rem" : "1.5rem",
        maxWidth: "1400px", margin: "0 auto"
      }}>

        {/* Hamburger button (mobile only) */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "4px", flexShrink: 0, display: "flex",
              flexDirection: "column", gap: "5px"
            }}
          >
            <span style={{
              display: "block", width: "22px", height: "2px",
              background: menuOpen ? NAVY : "#333",
              borderRadius: "2px",
              transition: "transform 0.25s, opacity 0.25s",
              transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none"
            }} />
            <span style={{
              display: "block", width: "22px", height: "2px",
              background: "#333", borderRadius: "2px",
              transition: "opacity 0.25s",
              opacity: menuOpen ? 0 : 1
            }} />
            <span style={{
              display: "block", width: "22px", height: "2px",
              background: menuOpen ? NAVY : "#333",
              borderRadius: "2px",
              transition: "transform 0.25s",
              transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none"
            }} />
          </button>
        )}

        {/* Logo */}
        <Link to="/" onClick={closeMenu} style={{ textDecoration: "none", flexShrink: 0 }}>
          <span style={{ fontSize: isMobile ? "1.45rem" : "1.8rem", fontWeight: "800", letterSpacing: "-0.5px" }}>
            <span style={{ color: "#000000" }}>Safin</span><span style={{ color: NAVY }}>pay</span>
          </span>
        </Link>

        {/* Search bar — hidden on mobile (shown in mobile menu) */}
        {!isMobile && (
          <form onSubmit={handleSearch} style={{ flex: 1, display: "flex", maxWidth: "680px" }}>
            <input
              type="text"
              placeholder="Rechercher des produits, fournisseurs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1, padding: "0.65rem 1rem",
                border: `2px solid ${NAVY}`, borderRight: "none",
                borderRadius: "6px 0 0 6px", fontSize: "0.93rem",
                outline: "none", color: "#333", background: "white", fontFamily: "inherit",
                transition: "box-shadow 0.2s"
              }}
              onFocus={e => e.target.style.boxShadow = `0 0 0 3px rgba(27,58,107,0.15)`}
              onBlur={e => e.target.style.boxShadow = "none"}
            />
            <button type="submit" style={{
              padding: "0 1.3rem", background: NAVY, color: "white",
              border: "none", borderRadius: "0 6px 6px 0", cursor: "pointer",
              fontSize: "0.88rem", fontWeight: "700",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "inherit", transition: "background 0.2s"
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#14306a"}
              onMouseLeave={e => e.currentTarget.style.background = NAVY}
            >
              Rechercher
            </button>
          </form>
        )}

        {/* Right account links — hidden on mobile */}
        {!isMobile && (
          <div style={{ display: "flex", gap: isTablet ? "1.1rem" : "1.8rem", alignItems: "center", flexShrink: 0 }}>
            {user ? (
              <>
                <span style={{ color: "#444", fontSize: "0.9rem", fontWeight: "500" }}>
                  {user.first_name || user.name || "Mon compte"}
                </span>
                <button onClick={logout} style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "#444", fontSize: "0.9rem", fontWeight: "500", padding: 0, fontFamily: "inherit",
                  transition: "color 0.2s"
                }}
                  onMouseEnter={e => e.currentTarget.style.color = NAVY}
                  onMouseLeave={e => e.currentTarget.style.color = "#444"}
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link to="/login" style={{ color: "#444", textDecoration: "none", fontSize: "0.9rem", fontWeight: "500", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = NAVY}
                onMouseLeave={e => e.currentTarget.style.color = "#444"}
              >Compte</Link>
            )}
            <Link to="/account" style={{ color: "#444", textDecoration: "none", fontSize: "0.9rem", fontWeight: "500", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = NAVY}
              onMouseLeave={e => e.currentTarget.style.color = "#444"}
            >Favoris</Link>
            <Link to="/cart" style={{ color: "#444", textDecoration: "none", fontSize: "0.9rem", fontWeight: "500", position: "relative", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = NAVY}
              onMouseLeave={e => e.currentTarget.style.color = "#444"}
            >
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
        )}

        {/* Mobile: cart icon (right) */}
        {isMobile && (
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "1rem" }}>
            <Link to="/cart" onClick={closeMenu} style={{ color: "#444", textDecoration: "none", fontSize: "0.9rem", fontWeight: "500", position: "relative" }}>
              Panier
              {cartItems.length > 0 && (
                <span style={{
                  position: "absolute", top: "-8px", right: "-14px",
                  background: NAVY, color: "white",
                  borderRadius: "50%", width: "18px", height: "18px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.65rem", fontWeight: "bold"
                }}>
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        )}
      </div>

      {/* ── Row 2: Navigation links (desktop) ── */}
      {!isMobile && (
        <div style={{ borderTop: "1px solid #f0f0f0" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1.5rem", display: "flex", overflowX: "auto" }}>
            {NAV_LINKS.map(({ label, to }) => (
              <Link key={label} to={to} style={{
                padding: "0.5rem 1.1rem", color: "#333", textDecoration: "none",
                fontSize: "0.88rem", fontWeight: "500",
                borderBottom: "2px solid transparent",
                transition: "color 0.2s, border-color 0.2s",
                display: "block", whiteSpace: "nowrap"
              }}
                onMouseEnter={e => { e.currentTarget.style.color = NAVY; e.currentTarget.style.borderBottomColor = NAVY; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#333"; e.currentTarget.style.borderBottomColor = "transparent"; }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Mobile dropdown menu ── */}
      {isMobile && (
        <div style={{
          overflow: "hidden",
          maxHeight: menuOpen ? "600px" : "0",
          transition: "max-height 0.35s ease",
          background: "white",
          borderTop: menuOpen ? "1px solid #f0f0f0" : "none"
        }}>
          {/* Mobile search */}
          <form onSubmit={e => { handleSearch(e); closeMenu(); }} style={{ display: "flex", margin: "0.75rem 1rem" }}>
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1, padding: "0.6rem 0.85rem",
                border: `2px solid ${NAVY}`, borderRight: "none",
                borderRadius: "6px 0 0 6px", fontSize: "0.9rem",
                outline: "none", color: "#333", background: "white"
              }}
            />
            <button type="submit" style={{
              padding: "0 1rem", background: NAVY, color: "white",
              border: "none", borderRadius: "0 6px 6px 0",
              cursor: "pointer", fontSize: "0.85rem", fontWeight: "700"
            }}>
              OK
            </button>
          </form>

          {/* Nav links */}
          {NAV_LINKS.map(({ label, to }) => (
            <Link key={label} to={to} onClick={closeMenu} style={{
              display: "block", padding: "0.7rem 1.25rem",
              color: "#333", textDecoration: "none",
              fontSize: "0.95rem", fontWeight: "500",
              borderBottom: "1px solid #f5f5f5",
              transition: "background 0.15s, color 0.15s"
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(27,58,107,0.05)"; e.currentTarget.style.color = NAVY; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#333"; }}
            >
              {label}
            </Link>
          ))}

          {/* Account links */}
          <div style={{ padding: "0.5rem 1rem 0.75rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {user ? (
              <>
                <span style={{ color: "#444", fontSize: "0.9rem", fontWeight: "500", alignSelf: "center" }}>
                  {user.first_name || user.name || "Mon compte"}
                </span>
                <button onClick={() => { logout(); closeMenu(); }} style={{
                  background: "none", border: "1px solid #ddd",
                  borderRadius: "6px", padding: "0.4rem 0.8rem",
                  color: "#444", fontSize: "0.88rem", cursor: "pointer"
                }}>
                  Déconnexion
                </button>
              </>
            ) : (
              <Link to="/login" onClick={closeMenu} style={{
                color: NAVY, textDecoration: "none", fontSize: "0.9rem",
                fontWeight: "600", padding: "0.4rem 0.8rem",
                border: `1px solid ${NAVY}`, borderRadius: "6px"
              }}>Connexion</Link>
            )}
            <Link to="/account" onClick={closeMenu} style={{
              color: "#444", textDecoration: "none", fontSize: "0.88rem",
              padding: "0.4rem 0"
            }}>Favoris</Link>
            {user?.is_seller && (
              <Link to="/seller/dashboard" onClick={closeMenu} style={{
                color: NAVY, textDecoration: "none", fontSize: "0.88rem",
                fontWeight: "700", padding: "0.4rem 0"
              }}>Vendre</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
