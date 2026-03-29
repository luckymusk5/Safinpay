import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SAFIN_BLUE = "#1b3a6b";
const SAFIN_LIGHT_BG = "#f4f7f9";
const WHITE = "#ffffff";
const GOLD = "#c9a030";

// --- ON REUTILISE LES MEMES COMPOSANTS POUR LA COHERENCE ---
const NavbarSafin = () => (
  <header style={{ background: WHITE, borderBottom: "1px solid #e0e0e0" }}>
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "1rem 2rem", display: "flex", alignItems: "center", gap: "2rem" }}>
      <div style={{ fontSize: "1.8rem", fontWeight: "900", color: SAFIN_BLUE }}>Safinpay</div>
      <div style={{ flex: 1, display: "flex" }}>
        <input type="text" placeholder="Rechercher..." style={{ flex: 1, padding: "0.8rem", border: `2px solid ${SAFIN_BLUE}`, borderRadius: "4px 0 0 4px" }} />
        <button style={{ background: SAFIN_BLUE, color: WHITE, padding: "0 1.5rem", border: "none", borderRadius: "0 4px 4px 0" }}>Rechercher</button>
      </div>
      <div style={{ display: "flex", gap: "1.5rem", color: "#666" }}><span>Compte</span><span>Panier</span></div>
    </div>
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0.5rem 2rem", display: "flex", gap: "2rem", fontSize: "0.9rem" }}>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>Accueil</Link>
      <Link to="/categories" style={{ textDecoration: "none", color: "inherit", fontWeight: "bold", color: SAFIN_BLUE }}>Catégories</Link>
      <Link to="/store" style={{ textDecoration: "none", color: "inherit" }}>Boutique</Link>
      <span>Aide</span>
    </div>
  </header>
);

const FooterSafin = () => (
  <footer style={{ background: WHITE, padding: "4rem 2rem 2rem", borderTop: "1px solid #e0e0e0", marginTop: "4rem" }}>
    <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr", gap: "2rem" }}>
      <div>
        <div style={{ fontSize: "1.5rem", fontWeight: "900", color: SAFIN_BLUE, marginBottom: "1rem" }}>Safinpay</div>
        <p style={{ color: "#666", fontSize: "0.85rem" }}>La marketplace africaine connectée.</p>
      </div>
      <FooterCol title="À PROPOS" links={["Qui sommes-nous ?", "Blog"]} />
      <FooterCol title="AIDE" links={["Contact", "FAQ"]} />
      <FooterCol title="VENDEURS" links={["Vendre sur Safinpay"]} />
      <FooterCol title="PAIEMENT" links={["Mobile Money"]} />
    </div>
  </footer>
);

const FooterCol = ({ title, links }) => (
  <div>
    <h4 style={{ fontSize: "0.8rem", color: "#333", marginBottom: "1rem" }}>{title}</h4>
    {links.map(l => <div key={l} style={{ fontSize: "0.85rem", color: "#666", marginBottom: "0.5rem" }}>{l}</div>)}
  </div>
);

// --- PAGE CATEGORIES ---
const categories = [
  { name: "Électronique", image: "https://via.placeholder.com/200" },
  { name: "Mode", image: "https://via.placeholder.com/200" },
  { name: "Maison", image: "https://via.placeholder.com/200" },
  { name: "Beauté", image: "https://via.placeholder.com/200" },
  { name: "Sport", image: "https://via.placeholder.com/200" },
];

export default function Categories() {
  return (
    <div style={{ background: SAFIN_LIGHT_BG, minHeight: "100vh" }}>
      <NavbarSafin />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }}>
        <h1 style={{ color: SAFIN_BLUE, fontWeight: "800", textAlign: "center", marginBottom: "3rem" }}>
          Explorez nos <span style={{ color: GOLD }}>Catégories</span>
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.5rem" }}>
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              style={{
                background: WHITE, borderRadius: "12px", overflow: "hidden",
                boxShadow: "0 4px 15px rgba(0,0,0,0.05)", cursor: "pointer", textAlign: "center"
              }}
            >
              <div style={{ height: "180px" }}>
                <img src={cat.image} alt={cat.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "1.2rem" }}>
                <h2 style={{ fontSize: "1rem", color: SAFIN_BLUE, margin: 0 }}>{cat.name}</h2>
                <div style={{ marginTop: "0.5rem", fontSize: "0.7rem", color: GOLD, fontWeight: "800" }}>VOIR TOUT →</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <FooterSafin />
    </div>
  );
}