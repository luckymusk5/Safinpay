import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import { AuthContext } from "../context/AuthContext";

const SAFIN_BLUE = "#1b3a6b";
const SAFIN_LIGHT_BG = "#f4f7f9";
const WHITE = "#ffffff";
const GOLD = "#c9a030";

function normalizeBoutique(boutique) {
  return {
    id: String(boutique?.idboutique || boutique?.id || boutique?.IDBOUTIQUE || ""),
    vendorId: String(boutique?.idvendeur || boutique?.vendor_id || ""),
    name: boutique?.nomboutique || boutique?.name || boutique?.shop_name || "Boutique sans nom",
    description: boutique?.descriptionboutique || boutique?.description || "Aucune description disponible.",
    address: boutique?.adresseboutique || boutique?.address || "Adresse non renseignée",
    verified: Boolean(boutique?.mentionverifierboutique ?? boutique?.verified),
    raw: boutique,
  };
}

export default function SellerStore() {
  const { boutiqueId, sellerId } = useParams();
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const resolvedBoutiqueId = boutiqueId || sellerId || user?.seller_id || "";

  const [boutique, setBoutique] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadBoutique = async () => {
      if (!resolvedBoutiqueId) {
        if (active) {
          setLoading(false);
          setError(user?.is_seller ? "Votre boutique n'est pas encore disponible." : "Sélectionnez une boutique dans la liste.");
        }
        return;
      }

      try {
        const res = await api.get(`/boutique/${resolvedBoutiqueId}`);
        const boutiqueData = normalizeBoutique(res.data?.boutique || res.data || {});
        const productList = Array.isArray(res.data?.produits) ? res.data.produits : [];
        if (active) {
          setBoutique(boutiqueData);
          setProducts(productList);
        }
      } catch (err) {
        console.error("Erreur chargement boutique:", err);
        if (active) {
          setError("Impossible de charger cette boutique pour le moment.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    setLoading(true);
    setError("");
    loadBoutique();

    return () => {
      active = false;
    };
  }, [resolvedBoutiqueId, user?.is_seller]);

  const initials = useMemo(() => {
    const source = boutique?.name || "B";
    return source
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("");
  }, [boutique?.name]);

  return (
    <div style={{ background: SAFIN_LIGHT_BG, minHeight: "100vh", paddingBottom: "4rem" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "2rem 1.5rem", position: "relative" }}>
        <div style={{ marginBottom: "1rem" }}>
          <Link to={user?.is_seller ? "/seller/dashboard" : "/boutiques"} style={{ color: SAFIN_BLUE, textDecoration: "none", fontWeight: 600 }}>
            ← {user?.is_seller ? "Retour au dashboard" : "Retour aux boutiques"}
          </Link>
        </div>

        {loading ? (
          <div style={{ padding: "4rem 1rem", textAlign: "center", color: "#666" }}>Chargement de la boutique...</div>
        ) : error ? (
          <div style={{ background: "#fff4f4", color: "#9b1c1c", border: "1px solid #f2c7c7", borderRadius: "12px", padding: "1.25rem" }}>
            {error}
          </div>
        ) : boutique ? (
          <>
            <div style={{ height: "260px", borderRadius: "18px", overflow: "hidden", position: "relative", boxShadow: "0 12px 32px rgba(0,0,0,0.12)" }}>
              <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${SAFIN_BLUE} 0%, #294d84 55%, ${GOLD} 100%)` }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.35))" }} />
              <div style={{ position: "absolute", left: "1.5rem", bottom: "1.5rem", color: "white" }}>
                <div style={{
                  width: "68px",
                  height: "68px",
                  borderRadius: "20px",
                  background: "rgba(255,255,255,0.16)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.55rem",
                  fontWeight: 800,
                  marginBottom: "0.9rem"
                }}>
                  {initials || "B"}
                </div>
                <h1 style={{ margin: 0, fontSize: "2.2rem", lineHeight: 1.1 }}>{boutique.name}</h1>
                <p style={{ margin: "0.45rem 0 0", maxWidth: "760px", color: "rgba(255,255,255,0.92)", lineHeight: 1.6 }}>
                  {boutique.description}
                </p>
              </div>
            </div>

            <div style={{
              background: WHITE,
              borderRadius: "16px",
              padding: "1.25rem 1.5rem",
              marginTop: "-32px",
              position: "relative",
              zIndex: 2,
              boxShadow: "0 12px 28px rgba(17,24,39,0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap"
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
                  <h2 style={{ margin: 0, color: SAFIN_BLUE, fontSize: "1.4rem" }}>Présentation de la boutique</h2>
                  {boutique.verified && (
                    <span style={{ background: "#edf7ed", color: "#26734d", borderRadius: "999px", padding: "0.25rem 0.7rem", fontSize: "0.8rem", fontWeight: 700 }}>
                      Vérifiée
                    </span>
                  )}
                </div>
                <p style={{ margin: "0.45rem 0 0", color: "#666" }}>{boutique.address}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ margin: 0, color: SAFIN_BLUE, fontWeight: 800, fontSize: "1.2rem" }}>{products.length}</p>
                <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>produit{products.length > 1 ? "s" : ""}</p>
              </div>
            </div>

            <h2 style={{ color: SAFIN_BLUE, marginTop: "2.5rem", marginBottom: "1.25rem", fontSize: "1.45rem" }}>
              Produits en <span style={{ color: GOLD }}>vente</span>
            </h2>

            {products.length === 0 ? (
              <div style={{ background: WHITE, borderRadius: "14px", padding: "2rem", textAlign: "center", color: "#666" }}>
                Aucun produit publié pour cette boutique.
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" }}>
                {products.map((product, idx) => (
                  <ProductCard key={product.id || idx} product={product} idx={idx} />
                ))}
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}