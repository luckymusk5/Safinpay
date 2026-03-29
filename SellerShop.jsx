import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import ProductCard_new from "../components/ProductCard_new";
import Navbar_new from "../components/Navbar_new";
import Footer_new from "../components/Footer_new";

export default function SellerShop() {
  const { sellerId } = useParams();
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSellerShop = async () => {
      try {
        // Récupérer les infos du vendeur + sa boutique
        const sellerRes = await api.get(`/sellers/${sellerId}/`);
        setSeller(sellerRes.data);

        // Récupérer les produits de ce vendeur
        const productsRes = await api.get("/products/", {
          params: { seller: sellerId }
        });

        const productsList = Array.isArray(productsRes.data)
          ? productsRes.data
          : productsRes.data.results || [];

        setProducts(productsList);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger la boutique du vendeur.");
      } finally {
        setLoading(false);
      }
    };

    if (sellerId) fetchSellerShop();
  }, [sellerId]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="spinner" />
      </div>
    );
  }

  if (error || !seller) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "#c00" }}>
        <h2>Boutique introuvable</h2>
        <p>{error || "Le vendeur n'existe pas ou a été supprimé."}</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: "1rem" }}>
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  return (
    <>
      <Navbar_new />
      <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", paddingTop: "2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1.5rem" }}>

          {/* En-tête de la boutique */}
          <div style={{
            background: "white",
            borderRadius: "12px",
            padding: "2.5rem",
            marginBottom: "2.5rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
          }}>
            <div style={{ display: "flex", gap: "2rem", alignItems: "center", flexWrap: "wrap" }}>
              <div style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "4px solid #ff9900",
                flexShrink: 0
              }}>
                <img
                  src={seller.shop_image || seller.logo || "/placeholder-shop.png"}
                  alt={seller.shop_name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => e.target.src = "https://via.placeholder.com/120?text=Shop"}
                />
              </div>

              <div style={{ flex: 1, minWidth: "300px" }}>
                <h1 style={{ margin: "0 0 0.5rem 0", fontSize: "2.2rem", color: "#1b3a6b" }}>
                  {seller.shop_name}
                </h1>
                <p style={{ color: "#555", fontSize: "1.05rem", marginBottom: "1rem" }}>
                  {seller.description || "Boutique officielle sur SafinPay"}
                </p>

                <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", color: "#666" }}>
                  <div>⭐ <strong>{seller.avg_rating || "4.8"}</strong> ({seller.total_reviews || 0} avis)</div>
                  <div>📦 {products.length} produits</div>
                  <div>📍 {seller.location || "Afrique"}</div>
                </div>
              </div>

              <div>
                <button className="btn btn-primary" style={{ padding: "0.8rem 1.8rem", fontSize: "1.05rem" }}>
                  Contacter le vendeur
                </button>
              </div>
            </div>
          </div>

          {/* Section Produits */}
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ marginBottom: "1.5rem", color: "#1b3a6b" }}>
              Produits de {seller.shop_name}
            </h2>

            {products.length === 0 ? (
              <div style={{
                background: "white",
                padding: "4rem",
                textAlign: "center",
                borderRadius: "8px"
              }}>
                <p style={{ fontSize: "1.2rem", color: "#666" }}>
                  Ce vendeur n'a pas encore ajouté de produits.
                </p>
              </div>
            ) : (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "1.8rem"
              }}>
                {products.map(product => (
                  <ProductCard_new key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer_new />
    </>
  );
}