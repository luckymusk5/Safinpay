import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import { AuthContext } from "../context/AuthContext";
import AsyncProductImage from "../components/AsyncProductImage";
import { getBoutiqueLogo } from "../utils/boutiqueBranding";

const SAFIN_BLUE = "#1b3a6b";
const SAFIN_LIGHT_BG = "#f4f7f9";
const WHITE = "#ffffff";
const GOLD = "#c9a030";
const PROMO_IMAGE = "https://tse1.mm.bing.net/th/id/OIP.N40sCCyNUETLuvBUWqq5RQHaFP?rs=1&pid=ImgDetMain&o=7&rm=3";

function normalizeBoutique(boutique) {
  return {
    id: String(boutique?.idboutique || boutique?.id || boutique?.IDBOUTIQUE || ""),
    vendorId: String(boutique?.idvendeur || boutique?.vendor_id || ""),
    name: boutique?.nomboutique || boutique?.name || boutique?.shop_name || "Boutique sans nom",
    description: boutique?.descriptionboutique || boutique?.description || "Aucune description disponible.",
    address: boutique?.adresseboutique || boutique?.address || "Adresse non renseignée",
    verified: Boolean(boutique?.mentionverifierboutique ?? boutique?.verified),
    logo: boutique?.logo || boutique?.image || boutique?.logoUrl || null,
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

  const boutiqueLogo = useMemo(() => boutique?.logo || getBoutiqueLogo(boutique), [boutique]);

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
                  width: "84px",
                  height: "84px",
                  borderRadius: "22px",
                  background: "rgba(255,255,255,0.16)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  marginBottom: "0.9rem"
                }}>
                  <AsyncProductImage
                    src={boutiqueLogo}
                    alt={boutique?.name || "Boutique"}
                    priority
                    loading="eager"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    wrapperStyle={{ width: "100%", height: "100%" }}
                  />
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
                  <img
                    src={boutiqueLogo}
                    alt={boutique?.name || "Boutique"}
                    style={{ width: "34px", height: "34px", borderRadius: "10px", objectFit: "cover", border: "1px solid rgba(0,0,0,0.08)" }}
                    loading="lazy"
                    decoding="async"
                  />
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

            <div style={{
              marginTop: "1rem",
              background: WHITE,
              borderRadius: "14px",
              border: "1px solid #e8edf3",
              boxShadow: "0 10px 24px rgba(17,24,39,0.05)",
              padding: "1rem 1.25rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap"
            }}>
              <div>
                <p style={{ margin: 0, color: SAFIN_BLUE, fontWeight: 800, fontSize: "0.9rem", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  Boutique
                </p>
                <h3 style={{ margin: "0.25rem 0 0", color: "#111827", fontSize: "1.15rem" }}>{boutique.name}</h3>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ margin: 0, color: "#6b7280", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  ID boutique
                </p>
                <p style={{ margin: "0.2rem 0 0", color: SAFIN_BLUE, fontWeight: 800, fontSize: "1rem" }}>{boutique.id}</p>
              </div>
            </div>

            <div style={{
              marginTop: "1.25rem",
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.35fr) minmax(0, 1fr)",
              gap: "1rem"
            }}>
              <div style={{
                background: WHITE,
                borderRadius: "18px",
                padding: "1rem",
                boxShadow: "0 12px 28px rgba(17,24,39,0.06)",
                border: "1px solid #e8edf3"
              }}>
                <AsyncProductImage
                  src={PROMO_IMAGE}
                  alt="Publicité boutique"
                  loading="lazy"
                  style={{ width: "100%", height: "260px", objectFit: "cover", borderRadius: "14px" }}
                  wrapperStyle={{ width: "100%", height: "260px" }}
                />
              </div>
              <div style={{
                background: `linear-gradient(135deg, ${SAFIN_BLUE} 0%, #234c88 100%)`,
                borderRadius: "18px",
                padding: "1.25rem",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 12px 28px rgba(17,24,39,0.06)"
              }}>
                <div>
                  <p style={{ margin: 0, textTransform: "uppercase", letterSpacing: "0.12em", fontSize: "0.75rem", opacity: 0.9 }}>Boutique mise en avant</p>
                  <h3 style={{ margin: "0.45rem 0 0.8rem", fontSize: "1.45rem", lineHeight: 1.2 }}>Des visuels plus propres, plus clairs, plus vendables</h3>
                  <p style={{ margin: 0, color: "rgba(255,255,255,0.9)", lineHeight: 1.6 }}>
                    Les boutiques et les produits sont maintenant présentés avec plus d’espace, des images visibles et une hiérarchie plus nette.
                  </p>
                </div>
                <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                  <span style={{ background: "rgba(255,255,255,0.16)", padding: "0.35rem 0.75rem", borderRadius: "999px", fontSize: "0.85rem", fontWeight: 700 }}>Image rapide</span>
                  <span style={{ background: "rgba(255,255,255,0.16)", padding: "0.35rem 0.75rem", borderRadius: "999px", fontSize: "0.85rem", fontWeight: 700 }}>Theme SafinPay</span>
                </div>
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