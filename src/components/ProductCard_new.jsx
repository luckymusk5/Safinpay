import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

export default function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();
  
  const cartContext = useContext(CartContext);
  const { addToCart } = cartContext || { addToCart: () => {} };

  const authContext = useContext(AuthContext);
  const { user } = authContext || { user: null };

  // Normaliser les noms de champs (le backend peut retourner EN ou FR, ou products.json)
  // Gérer les images du JSON (array) ou du backend (string)
  let imageUrl = product.image;
  if (!imageUrl && product.images && Array.isArray(product.images) && product.images.length > 0) {
    imageUrl = product.images[0]; // Prendre la première image du array
  }

  const normalizedProduct = {
    id: product.id,
    name: product.nom || product.name || product.title,
    description: product.description,
    price: product.prix || product.price || 0,
    image: imageUrl,
    discount: product.remise || product.discount || 0,
    seller_name: product.nom_de_la_boutique_du_vendeur || product.seller_shop_name || "Vendeur",
    seller_shop_name: product.seller_shop_name,
    seller_id: product.seller_id, 
    reviews_count: product.nombre_d_avis || product.review_count || 0,
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setIsAdding(true);
    
    try {
      addToCart(normalizedProduct, quantity);
      setQuantity(1); // Réinitialiser la quantité
    } catch (err) {
      console.error("Erreur:", err);
    } finally {
      setIsAdding(false);
    }
  };

  // Protéger contre les données manquantes
  if (!normalizedProduct) {
    return <div className="product-card"><p>❌ Produit null</p></div>;
  }

  // Les champs du backend peuvent être en français ou anglais
  const prix = parseFloat(normalizedProduct.price) || 0;
  
  // Afficher quand même le produit même si le prix est invalide
  if (!prix || prix <= 0) {
    console.warn("Produit avec prix invalide ou manquant:", normalizedProduct.name, prix);
  }

  let remise = normalizedProduct.discount || 0;
  
  // Protéger contre les divisions par zéro et les valeurs invalides
  if (remise >= 100) remise = 99;
  if (remise < 0) remise = 0;
  
  const divisor = (1 - remise / 100);
  const originalPrice = divisor > 0 ? Math.round(prix / divisor) : prix;

  // Gestion de l'image - peut être null ou une URL externe
  let finalImageUrl = normalizedProduct.image;
  
  if (!finalImageUrl) {
    finalImageUrl = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23f0f0f0' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='14'%3E📦 Pas de photo%3C/text%3E%3C/svg%3E";
  } else if (!finalImageUrl.startsWith('http') && !finalImageUrl.startsWith('data:')) {
    // Si c'est une URL relative du backend, ajouter l'URL de base
    finalImageUrl = `http://127.0.0.1:8000${finalImageUrl}`;
  }
  // Sinon, c'est déjà une URL complète (du JSON), on la garde telle quelle

  return (
    <div className="product-card">
      {/* Image - Cliquable */}
      <Link to={`/product/${normalizedProduct.id}`} style={{ textDecoration: "none" }}>
        <div className="product-image-container" style={{ cursor: "pointer" }}>
          <img
            src={finalImageUrl}
            alt={normalizedProduct.name}
            className="product-image"
            onError={(e) => {
              console.error("Erreur chargement image:", finalImageUrl);
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23eee' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='12'%3EImage non disponible%3C/text%3E%3C/svg%3E";
            }}
          />
          {remise > 0 && (
            <span style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              background: "#d5001c",
              color: "white",
              padding: "0.5rem",
              borderRadius: "4px",
              fontWeight: "700",
              fontSize: "0.85rem"
            }}>
              -{remise}%
            </span>
          )}
        </div>
      </Link>

      {/* Titre - Cliquable */}
      <Link to={`/product/${normalizedProduct.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <h3 className="product-title" style={{ cursor: "pointer", transition: "color 0.3s" }} onMouseEnter={(e) => e.target.style.color = "#0066c0"} onMouseLeave={(e) => e.target.style.color = "inherit"}>
          {normalizedProduct.name}
        </h3>
      </Link>

      {/* Rating */}
      <div className="product-rating">
        <span className="product-stars">5/5</span>
        <span className="product-reviews">({normalizedProduct.reviews_count} avis)</span>
      </div>

      {/* Prix */}
      <div className="product-price-container">
        {originalPrice > 0 && <span className="product-original-price">{Math.max(1, originalPrice).toLocaleString()} FCFA</span>}
        {prix > 0 ? (
          <span className="product-price">{prix.toLocaleString()} FCFA</span>
        ) : (
          <span className="product-price" style={{ color: "#d5001c", fontWeight: "bold" }}>Prix sur demande</span>
        )}
        {remise > 0 && <div className="product-discount">Économiser {remise}%</div>}
      </div>

      {/* Actions */}
      <div className="product-actions">
        <button 
          className="btn-add-to-cart"
          onClick={handleAddToCart}
          disabled={isAdding}
          style={{ opacity: isAdding ? 0.6 : 1, cursor: isAdding ? 'not-allowed' : 'pointer' }}
        >
          {isAdding ? "Ajout..." : "Ajouter au panier"}
        </button>
        <button
          className="btn-wishlist"
          onClick={() => setIsWishlisted(!isWishlisted)}
          title="Ajouter à la liste de souhaits"
        >
          {isWishlisted ? "Favori" : "Ajouter aux favoris"}
        </button>
      </div>

      {/* Détails vendeur */}
      <div style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "#666" }}>
        <p>Vendu par: {normalizedProduct.seller_name}</p>
      </div>
    </div>
  );
}
