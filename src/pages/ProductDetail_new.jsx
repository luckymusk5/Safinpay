import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  const cartContext = useContext(CartContext);
  const { addToCart } = cartContext || { addToCart: () => {} };

  const authContext = useContext(AuthContext);
  const { user } = authContext || { user: null };

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await api.get(`/products/${id}/`);
        console.log("Données produit reçues:", res.data);
        console.log("Image brute:", res.data.image);
        setProduct(res.data);
        // Charger les avis aussi
        try {
          const reviewRes = await api.get(`/reviews/?product_id=${id}`);
          setReviews(reviewRes.data || []);
        } catch (err) {
          console.log("Pas d'avis trouvés");
        }
      } catch (err) {
        console.error("Erreur au chargement du produit:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!product) return;
    
    setIsAdding(true);
    try {
      addToCart(product, quantity);
      setQuantity(1);
    } catch (err) {
      console.error("Erreur:", err);
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) return <div style={{ padding: "2rem", textAlign: "center" }}>Chargement...</div>;
  if (!product) return <div style={{ padding: "2rem", textAlign: "center" }}>Produit non trouvé</div>;

  // Construire l'URL complète de l'image
  let imageUrl = product.image;
  if (imageUrl && !imageUrl.startsWith('http')) {
    imageUrl = `http://127.0.0.1:8000${imageUrl}`;
  }
  if (!imageUrl) {
    imageUrl = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Crect fill='%23f0f0f0' width='500' height='500'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='24'%3E📦 Pas de photo%3C/text%3E%3C/svg%3E";
  }

  const priceNumber = parseFloat(product.price) || 0;
  const discount = product.discount || product.remise || 0;
  const originalPrice = discount > 0 ? Math.round(priceNumber / (1 - discount / 100)) : priceNumber;
  const avgRating = product.average_rating || 4.5;
  const reviewCount = reviews.length || 0;

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", padding: "2rem 0" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: "1.5rem", color: "#666", fontSize: "0.9rem" }}>
          <a href="/" style={{ color: "#0066c0", textDecoration: "none" }}>Accueil</a>
          <span> / </span>
          <a href="/" style={{ color: "#0066c0", textDecoration: "none" }}>Produits</a>
          <span> / </span>
          <span>{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div style={{ backgroundColor: "white", borderRadius: "8px", padding: "2rem", marginBottom: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
          {/* Image Section */}
          <div>
            <div style={{
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              padding: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "500px",
              marginBottom: "1rem",
              border: "1px solid #e7e7e7"
            }}>
              <img
                src={imageUrl}
                alt={product.name}
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                onError={(e) => {
                  console.error("Erreur chargement image:", imageUrl);
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Crect fill='%23eee' width='500' height='500'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='20'%3EImage non disponible%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
          </div>

          {/* Details Section */}
          <div>
            {/* Product Title */}
            <h1 style={{ fontSize: "1.8rem", fontWeight: "700", marginBottom: "1rem", color: "#0f1111", lineHeight: "1.4" }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid #e7e7e7" }}>
              <div style={{ fontSize: "1rem" }}>
                {'★'.repeat(Math.floor(avgRating))}
              </div>
              <span style={{ color: "#0066c0", fontSize: "0.9rem" }}>{avgRating.toFixed(1)} sur 5</span>
              <span style={{ color: "#666", fontSize: "0.9rem" }}>({reviewCount} avis)</span>
            </div>

            {/* Price Section */}
            <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
              <div style={{ fontSize: "0.85rem", color: "#666", marginBottom: "0.5rem" }}>Prix :</div>
              <div style={{ fontSize: "2.2rem", fontWeight: "700", color: "#d9534f", marginBottom: "0.5rem" }}>
                {priceNumber.toLocaleString()} FCFA
              </div>
              {discount > 0 && (
                <div style={{ fontSize: "0.9rem", color: "#666" }}>
                  <span style={{ textDecoration: "line-through" }}>{originalPrice.toLocaleString()} FCFA</span>
                  <span style={{ marginLeft: "0.75rem", backgroundColor: "#d9534f", color: "white", padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "0.8rem", fontWeight: "600" }}>
                    -{discount}%
                  </span>
                </div>
              )}
            </div>

            {/* Disponibilité */}
            <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "#d4edda", borderRadius: "8px", color: "#155724", fontSize: "0.95rem" }}>
              ✓ Disponible en stock ({product.stock || 10}+ unités)
            </div>

            {/* Description courte */}
            <div style={{ marginBottom: "1.5rem", fontSize: "0.95rem", color: "#555", lineHeight: "1.6" }}>
              {product.description || "Produit de haute qualité"}
            </div>

            {/* Quantité */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem", fontSize: "0.9rem" }}>
                Quantité :
              </label>
              <div style={{ display: "flex", alignItems: "center", border: "1px solid #d5d5d5", borderRadius: "4px", width: "fit-content" }}>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ padding: "0.5rem 1rem", border: "none", backgroundColor: "white", cursor: "pointer", fontSize: "1.2rem" }}
                >
                  −
                </button>
                <input 
                  type="number" 
                  value={quantity} 
                  readOnly 
                  style={{ width: "60px", textAlign: "center", border: "none", fontSize: "1rem", fontWeight: "600" }} 
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ padding: "0.5rem 1rem", border: "none", backgroundColor: "white", cursor: "pointer", fontSize: "1.2rem" }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
              <button 
                onClick={handleAddToCart}
                disabled={isAdding}
                style={{
                  flex: 1,
                  padding: "0.75rem 1.5rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                  backgroundColor: "#d9534f",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: isAdding ? "not-allowed" : "pointer",
                  opacity: isAdding ? 0.7 : 1
                }}
              >
                {isAdding ? "Ajout..." : "Ajouter au panier"}
              </button>
              <button 
                style={{
                  padding: "0.75rem 1.5rem",
                  fontSize: "1rem",
                  backgroundColor: "white",
                  border: "1px solid #d5d5d5",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Wishlist
              </button>
            </div>

            {/* Seller Info */}
            <div style={{ backgroundColor: "#f5f5f5", padding: "1rem", borderRadius: "8px", borderLeft: "3px solid #d9534f" }}>
              <p style={{ margin: 0, marginBottom: "0.5rem", fontWeight: "600" }}>Vendu par :</p>
              <p style={{ margin: 0, fontSize: "1rem", color: "#0f1111" }}>{product.seller_shop_name || "SafinPay"}</p>
              <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.9rem", color: "#0066c0" }}>✓ Vendeur de confiance</p>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div style={{ backgroundColor: "white", borderRadius: "8px", padding: "2rem", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "1.5rem", borderBottom: "2px solid #d9534f", paddingBottom: "0.75rem" }}>
            À propos de ce produit
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            <div>
              <h3 style={{ fontWeight: "600", marginBottom: "0.75rem", color: "#0f1111" }}>Caractéristiques :</h3>
              <ul style={{ paddingLeft: "1.5rem", color: "#555", lineHeight: "2" }}>
                <li>✓ Qualité premium garantie</li>
                <li>✓ Livraison gratuite</li>
                <li>✓ Satisfait ou remboursé</li>
                <li>✓ Retour facile (30 jours)</li>
                <li>✓ Service client 24/7</li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontWeight: "600", marginBottom: "0.75rem", color: "#0f1111" }}>Informations :</h3>
              <p style={{ color: "#555", marginBottom: "0.5rem" }}><strong>SKU :</strong> {product.id}</p>
              <p style={{ color: "#555", marginBottom: "0.5rem" }}><strong>Catégorie :</strong> {product.category || "Général"}</p>
              <p style={{ color: "#555", marginBottom: "0.5rem" }}><strong>Marque :</strong> {product.brand || "SafinPay"}</p>
              <p style={{ color: "#555", marginBottom: "0.5rem" }}><strong>Disponibilité :</strong> <span style={{ color: "#28a745" }}>En stock</span></p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div style={{ backgroundColor: "white", borderRadius: "8px", padding: "2rem" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "1.5rem", borderBottom: "2px solid #d9534f", paddingBottom: "0.75rem" }}>
            Avis des clients ({reviewCount})
          </h2>

          {/* Reviews List */}
          {reviews.length > 0 ? (
            <div>
              {reviews.slice(0, 5).map((review, idx) => (
                <div key={idx} style={{ paddingBottom: "1.5rem", marginBottom: "1.5rem", borderBottom: "1px solid #e7e7e7" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <strong style={{ color: "#0f1111" }}>{review.buyer_name || "Utilisateur"}</strong>
                    <span style={{ fontSize: "0.85rem", color: "#666" }}>{review.rating || 5}/5</span>
                  </div>
                  <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "0.5rem" }}>{review.title || "Bon produit"}</p>
                  <p style={{ color: "#555", margin: "0" }}>{review.comment || "Très satisfait de mon achat"}</p>
                  <p style={{ fontSize: "0.8rem", color: "#999", marginTop: "0.5rem" }}>✓ Achat vérifié</p>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
              <p>Aucun avis pour le moment. Soyez le premier à laisser un avis!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
