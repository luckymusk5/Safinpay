import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

// --- COULEURS SAFINPAY ---
const SAFIN_BLUE = "#1b3a6b";
const SAFIN_LIGHT_BG = "#f4f7f9";
const WHITE = "#ffffff";
const GOLD = "#c9a030";

// --- COMPOSANT HEADER SAFINPAY ---
const NavbarSafin = () => (
  <header style={{ background: WHITE, borderBottom: "1px solid #e0e0e0" }}>
    {/* Barre principale de recherche */}
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "1rem 2rem", display: "flex", alignItems: "center", gap: "2rem" }}>
      <div style={{ fontSize: "1.8rem", fontWeight: "900", color: SAFIN_BLUE }}>Safinpay</div>
      
      <div style={{ flex: 1, display: "flex" }}>
        <input 
          type="text" 
          placeholder="Rechercher des produits, fournisseurs..." 
          style={{ flex: 1, padding: "0.8rem", border: `2px solid ${SAFIN_BLUE}`, borderRadius: "4px 0 0 4px", outline: "none" }}
        />
        <button style={{ background: SAFIN_BLUE, color: WHITE, padding: "0 1.5rem", border: "none", borderRadius: "0 4px 4px 0", fontWeight: "bold", cursor: "pointer" }}>
          Rechercher
        </button>
      </div>

      <div style={{ display: "flex", gap: "1.5rem", color: "#666", fontSize: "0.9rem" }}>
        <span style={{ cursor: "pointer" }}>Compte</span>
        <span style={{ cursor: "pointer" }}>Favoris</span>
        <span style={{ cursor: "pointer" }}>Panier</span>
      </div>
    </div>

    {/* Liens de Navigation */}
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0.5rem 2rem", display: "flex", gap: "2rem", fontSize: "0.9rem", color: "#333" }}>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>Accueil</Link>
      <Link to="/products" style={{ textDecoration: "none", color: "inherit" }}>Produits</Link>
      <span style={{ cursor: "pointer" }}>Fournisseurs</span>
      <span style={{ cursor: "pointer" }}>Commandes</span>
      <span style={{ cursor: "pointer" }}>Messages</span>
      <span style={{ cursor: "pointer" }}>Aide</span>
    </div>
  </header>
);

// --- COMPOSANT FOOTER SAFINPAY (D'après votre image) ---
const FooterSafin = () => (
  <footer style={{ background: WHITE, padding: "4rem 2rem 2rem", borderTop: "1px solid #e0e0e0", marginTop: "4rem" }}>
    <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr", gap: "2rem" }}>
      <div>
        <div style={{ fontSize: "1.5rem", fontWeight: "900", color: SAFIN_BLUE, marginBottom: "1rem" }}>Safinpay</div>
        <p style={{ color: "#666", fontSize: "0.85rem", lineHeight: "1.5" }}>
          La marketplace africaine qui connecte acheteurs et vendeurs à travers tout le continent.
        </p>
      </div>
      
      <FooterColumn title="À PROPOS" links={["Qui sommes-nous ?", "Carrières", "Presse", "Blog"]} />
      <FooterColumn title="AIDE" links={["Nous contacter", "Centre d'aide", "Livraison & retours", "Mon compte"]} />
      <FooterColumn title="VENDEURS" links={["Devenir vendeur", "Dashboard", "Académie vendeur", "Conditions de vente"]} />
      <FooterColumn title="PAIEMENT" links={["Carte de crédit", "Mobile Money", "Virement bancaire", "Paiement livraison"]} />
    </div>

    <div style={{ maxWidth: "1400px", margin: "2rem auto 0", paddingTop: "2rem", borderTop: "1px solid #eee", display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "#999" }}>
      <span>© 2026 Safinpay. Tous droits réservés. En expansion à travers l'Afrique.</span>
      <div style={{ display: "flex", gap: "1rem" }}>
        <span>Confidentialité</span>
        <span>Conditions d'utilisation</span>
        <span>Cookies</span>
      </div>
    </div>
  </footer>
);

const FooterColumn = ({ title, links }) => (
  <div>
    <h4 style={{ fontSize: "0.9rem", color: "#333", marginBottom: "1.2rem", fontWeight: "bold" }}>{title}</h4>
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {links.map(link => (
        <li key={link} style={{ marginBottom: "0.6rem", color: "#666", fontSize: "0.85rem", cursor: "pointer" }}>{link}</li>
      ))}
    </ul>
  </div>
);

// --- DONNÉES ---
const seller = {
  name: "TechStore Cameroun",
  description: "Votre boutique de gadgets et accessoires tech de haute qualité.",
  banner: "https://via.placeholder.com/1200x300",
};

const products = [
  { id: 1, displayTitle: "Smartphone Samsung", price: 150000, images: ["https://via.placeholder.com/200"], _cat: "Électronique", _rating: 4.8, _sold: 120, _free: true, _prime: true },
  { id: 2, displayTitle: "Casque Bluetooth", price: 25000, images: ["https://via.placeholder.com/200"], _cat: "Électronique", _rating: 4.5, _sold: 85, _free: false, _prime: true },
  { id: 3, displayTitle: "Ordinateur Portable", price: 350000, images: ["https://via.placeholder.com/200"], _cat: "Électronique", _rating: 4.9, _sold: 45, _free: true, _prime: false },
];

export default function SellerStore() {
  return (
    <div style={{ background: SAFIN_LIGHT_BG, minHeight: "100vh" }}>
      <NavbarSafin />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem", position: "relative" }}>
        {/* Banner */}
        <div style={{ height: "250px", borderRadius: "12px", overflow: "hidden", position: "relative" }}>
          <img src={seller.banner} alt="banner" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent, rgba(27,58,107,0.7))" }} />
        </div>

        {/* Profile Card */}
        <div style={{ 
          background: WHITE, borderRadius: "15px", padding: "2rem", 
          marginTop: "-50px", position: "relative", boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" 
        }}>
          <div>
            <h1 style={{ color: SAFIN_BLUE, fontSize: "2rem", fontWeight: "800", margin: "0 0 0.5rem" }}>{seller.name}</h1>
            <p style={{ color: "#666", margin: 0 }}>{seller.description}</p>
          </div>
          <button style={{ 
            background: SAFIN_BLUE, color: WHITE, padding: "0.8rem 2rem", borderRadius: "8px", 
            border: "none", fontWeight: "700", cursor: "pointer"
          }}>
            Suivre la boutique
          </button>
        </div>

        <h2 style={{ color: SAFIN_BLUE, marginTop: "3rem", marginBottom: "1.5rem" }}>
          Produits en <span style={{ color: GOLD }}>Vedette</span>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" }}>
          {products.map((product, idx) => (
            <ProductCard key={product.id} product={product} idx={idx} />
          ))}
        </div>
      </div>

      <FooterSafin />
    </div>
  );
}