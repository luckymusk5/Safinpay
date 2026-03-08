import { Link } from "react-router-dom";

export default function Footer_new() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: "#131921", color: "white", marginTop: "3rem" }}>
      {/* Top Section - Back to Top */}
      <div style={{ padding: "2rem 1.5rem", borderBottom: "1px solid #3f4554" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              background: "#ff9900",
              color: "white",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "background-color 0.3s"
            }}
            onMouseEnter={(e) => e.target.style.background = "#e68a1f"}
            onMouseLeave={(e) => e.target.style.background = "#ff9900"}
          >
            ↑ Retour en haut
          </button>
        </div>
      </div>

      {/* Main Footer Sections */}
      <div style={{
        padding: "2rem 1.5rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "2rem",
        maxWidth: "1400px",
        margin: "0 auto"
      }}>
        {/* About */}
        <div>
          <h3 style={{ marginBottom: "1rem", fontWeight: "600" }}>À propos de SafinPay</h3>
          <ul style={{ listStyle: "none", color: "#a9b3ba" }}>
            <li style={{ marginBottom: "0.5rem" }}>
              <span style={{ color: "#a9b3ba", cursor: "pointer" }}>Qui sommes-nous?</span>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <span style={{ color: "#a9b3ba", cursor: "pointer" }}>Carrières</span>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <span style={{ color: "#a9b3ba", cursor: "pointer" }}>Presse</span>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <span style={{ color: "#a9b3ba", cursor: "pointer" }}>Blog</span>
            </li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 style={{ marginBottom: "1rem", fontWeight: "600" }}>Aide</h3>
          <ul style={{ listStyle: "none", color: "#a9b3ba" }}>
            <li style={{ marginBottom: "0.5rem" }}>
              <span style={{ color: "#a9b3ba", cursor: "pointer" }}>Nous contacter</span>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <span style={{ color: "#a9b3ba", cursor: "pointer" }}>Centre d'aide</span>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <span style={{ color: "#a9b3ba", cursor: "pointer" }}>Livraison & retours</span>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <Link to="/account" style={{ color: "#a9b3ba", textDecoration: "none" }}>Aide sur le compte</Link>
            </li>
          </ul>
        </div>

        {/* For Sellers */}
        <div>
          <h3 style={{ marginBottom: "1rem", fontWeight: "600" }}>Pour vendeurs</h3>
          <ul style={{ listStyle: "none", color: "#a9b3ba" }}>
            <li style={{ marginBottom: "0.5rem" }}>
              <Link to="/become-seller" style={{ color: "#a9b3ba", textDecoration: "none" }}>Devenir vendeur</Link>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <Link to="/seller/dashboard" style={{ color: "#a9b3ba", textDecoration: "none" }}>Dashboard vendeur</Link>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <span style={{ color: "#a9b3ba", cursor: "pointer" }}>Académie vendeur</span>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <span style={{ color: "#a9b3ba", cursor: "pointer" }}>Conditions de vente</span>
            </li>
          </ul>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 style={{ marginBottom: "1rem", fontWeight: "600" }}>Moyens de paiement</h3>
          <ul style={{ listStyle: "none", color: "#a9b3ba" }}>
            <li style={{ marginBottom: "0.5rem" }}>Carte de crédit</li>
            <li style={{ marginBottom: "0.5rem" }}>Portefeuille mobile</li>
            <li style={{ marginBottom: "0.5rem" }}>Virement bancaire</li>
            <li style={{ marginBottom: "0.5rem" }}>Paiement à la livraison</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section - Legal */}
      <div style={{
        padding: "2rem 1.5rem",
        borderTop: "1px solid #3f4554",
        textAlign: "center",
        color: "#a9b3ba"
      }}>
        <div style={{ marginBottom: "1rem" }}>
          <span style={{ color: "#a9b3ba", marginRight: "2rem", cursor: "pointer" }}>Confidentialité</span>
          <span style={{ color: "#a9b3ba", marginRight: "2rem", cursor: "pointer" }}>Conditions d'utilisation</span>
          <span style={{ color: "#a9b3ba", cursor: "pointer" }}>Paramètres de cookies</span>
        </div>
        <p style={{ margin: "0.5rem 0" }}>© {currentYear} SafinPay. Tous droits réservés.</p>
        <p style={{ margin: "0", fontSize: "0.9rem" }}>En expansion à travers l'Afrique</p>
      </div>
    </footer>
  );
}