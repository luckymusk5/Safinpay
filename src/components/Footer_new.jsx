import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const NAVY = "#1b3a6b";

const LINK_STYLE = {
  color: "#555",
  textDecoration: "none",
  fontSize: "0.875rem",
  cursor: "pointer",
  display: "block",
  marginBottom: "0.55rem",
  transition: "color 0.2s",
};

function FooterLink({ to, children }) {
  return to ? (
    <Link
      to={to}
      style={LINK_STYLE}
      onMouseEnter={e => e.currentTarget.style.color = NAVY}
      onMouseLeave={e => e.currentTarget.style.color = "#555"}
    >
      {children}
    </Link>
  ) : (
    <span
      style={LINK_STYLE}
      onMouseEnter={e => e.currentTarget.style.color = NAVY}
      onMouseLeave={e => e.currentTarget.style.color = "#555"}
    >
      {children}
    </span>
  );
}

function useWindowWidth() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

export default function Footer_new() {
  const currentYear = new Date().getFullYear();
  const w = useWindowWidth();
  const isMobile = w < 640;
  const isTablet = w < 900;

  const gridCols = isMobile
    ? "1fr"
    : isTablet
    ? "1fr 1fr"
    : "2fr repeat(4, 1fr)";

  return (
    <footer style={{ background: "#f9f9f9", borderTop: "1px solid #e8e8e8", marginTop: "3rem", fontFamily: "inherit" }}>

      {/* ── Main columns ── */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: isMobile ? "2rem 1.25rem" : "2.5rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: isMobile ? "1.5rem" : "2rem" }}>

          {/* Brand column */}
          <div>
            <span style={{ fontSize: "1.6rem", fontWeight: "800", letterSpacing: "-0.5px", display: "block", marginBottom: "0.9rem" }}>
              <span style={{ color: "#000000" }}>Safin</span><span style={{ color: NAVY }}>pay</span>
            </span>
            <p style={{ fontSize: "0.83rem", color: "#777", lineHeight: "1.6", marginBottom: "1.2rem", maxWidth: "240px" }}>
              La marketplace africaine qui connecte acheteurs et vendeurs à travers tout le continent.
            </p>
          </div>

          {/* À propos */}
          <div>
            <h4 style={{ fontSize: "0.875rem", fontWeight: "700", color: "#1a1a1a", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              À propos
            </h4>
            <FooterLink>Qui sommes-nous ?</FooterLink>
            <FooterLink>Carrières</FooterLink>
            <FooterLink>Presse</FooterLink>
            <FooterLink>Blog</FooterLink>
          </div>

          {/* Aide */}
          <div>
            <h4 style={{ fontSize: "0.875rem", fontWeight: "700", color: "#1a1a1a", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Aide
            </h4>
            <FooterLink>Nous contacter</FooterLink>
            <FooterLink>Centre d'aide</FooterLink>
            <FooterLink>Livraison & retours</FooterLink>
            <FooterLink to="/account">Mon compte</FooterLink>
          </div>

          {/* Vendeurs */}
          <div>
            <h4 style={{ fontSize: "0.875rem", fontWeight: "700", color: "#1a1a1a", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Vendeurs
            </h4>
            <FooterLink to="/become-seller">Devenir vendeur</FooterLink>
            <FooterLink to="/seller/dashboard">Dashboard</FooterLink>
            <FooterLink>Académie vendeur</FooterLink>
            <FooterLink>Conditions de vente</FooterLink>
          </div>

          {/* Paiement */}
          <div>
            <h4 style={{ fontSize: "0.875rem", fontWeight: "700", color: "#1a1a1a", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Paiement
            </h4>
            <FooterLink>Carte de crédit</FooterLink>
            <FooterLink>Mobile Money</FooterLink>
            <FooterLink>Virement bancaire</FooterLink>
            <FooterLink>Paiement livraison</FooterLink>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: "1px solid #e8e8e8", padding: isMobile ? "1rem 1.25rem" : "1.1rem 2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center",
          flexWrap: "wrap", gap: "0.5rem" }}>
          <p style={{ color: "#888", fontSize: "0.82rem", margin: 0 }}>
            © {currentYear} <strong><span style={{ color: "#000000" }}>Safin</span><span style={{ color: NAVY }}>pay</span></strong>. Tous droits réservés. En expansion à travers l'Afrique.
          </p>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {["Confidentialité", "Conditions d'utilisation", "Cookies"].map(label => (
              <span
                key={label}
                style={{ color: "#888", fontSize: "0.82rem", cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = NAVY}
                onMouseLeave={e => e.currentTarget.style.color = "#888"}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}