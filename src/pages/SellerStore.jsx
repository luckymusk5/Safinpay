import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

// --- CONSTANTES DE STYLE (Cohérence avec le reste du site) ---
const SAFIN_BLUE = "#1b3a6b";
const SAFIN_LIGHT_BG = "#f4f7f9";
const WHITE = "#ffffff";
const GOLD = "#c9a030";

// --- DONNÉES SIMULÉES ---
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
    /* Note : On ne met PAS <Navbar /> ou <Footer /> ici. 
       Ils doivent être placés une seule fois dans App.jsx 
    */
    <div style={{ background: SAFIN_LIGHT_BG, minHeight: "100vh", paddingBottom: "4rem" }}>
      
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem", position: "relative" }}>
        
        {/* Banner Section */}
        <div style={{ height: "250px", borderRadius: "12px", overflow: "hidden", position: "relative" }}>
          <img src={seller.banner} alt="banner" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent, rgba(27,58,107,0.7))" }} />
        </div>

        {/* Profile Card (L'élément qui chevauche la bannière) */}
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
            border: "none", fontWeight: "700", cursor: "pointer", transition: "0.3s"
          }}
          onMouseEnter={(e) => e.target.style.opacity = "0.9"}
          onMouseLeave={(e) => e.target.style.opacity = "1"}
          >
            Suivre la boutique
          </button>
        </div>

        {/* Titre de section */}
        <h2 style={{ color: SAFIN_BLUE, marginTop: "3rem", marginBottom: "1.5rem", fontSize: "1.5rem" }}>
          Produits en <span style={{ color: GOLD }}>Vedette</span>
        </h2>

        {/* Grille de produits */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", 
          gap: "1.5rem" 
        }}>
          {products.map((product, idx) => (
            <ProductCard key={product.id} product={product} idx={idx} />
          ))}
        </div>

      </div>
    </div>
  );
}