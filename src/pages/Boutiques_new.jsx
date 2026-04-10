import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import AsyncProductImage from "../components/AsyncProductImage";
import { getBoutiqueLogo } from "../utils/boutiqueBranding";

const BLUE = "#1b3a6b";
const GOLD = "#c9a030";
const BG = "#f5f7fb";
const PROMO_IMAGES = [
  "https://tse1.mm.bing.net/th/id/OIP.N40sCCyNUETLuvBUWqq5RQHaFP?rs=1&pid=ImgDetMain&o=7&rm=3",
  "https://tse2.mm.bing.net/th/id/OIP.5vo0o-skIO6wJqzs1R7IdgHaFk?rs=1&pid=ImgDetMain&o=7&rm=3",
];

function normalizeBoutique(boutique) {
  return {
    id: String(boutique?.idboutique || boutique?.id || boutique?.IDBOUTIQUE || ""),
    name: boutique?.nomboutique || boutique?.name || boutique?.shop_name || "Boutique sans nom",
    description: boutique?.descriptionboutique || boutique?.description || "Aucune description disponible.",
    address: boutique?.adresseboutique || boutique?.address || "Adresse non renseignée",
    vendorId: boutique?.idvendeur || boutique?.vendor_id || "",
    verified: Boolean(boutique?.mentionverifierboutique ?? boutique?.verified),
    logo: boutique?.logo || boutique?.image || boutique?.logoUrl || null,
    raw: boutique,
  };
}

export default function Boutiques_new() {
  const [boutiques, setBoutiques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadBoutiques = async () => {
      try {
        const res = await api.get("/boutiques");
        const list = Array.isArray(res.data) ? res.data : [];
        if (active) {
          setBoutiques(list.map(normalizeBoutique).filter(boutique => boutique.id));
        }
      } catch (err) {
        console.error("Erreur chargement boutiques:", err);
        if (active) {
          setError("Impossible de charger les boutiques pour le moment.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadBoutiques();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: BG, padding: "2rem 0 3rem" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{
          background: `linear-gradient(135deg, ${BLUE} 0%, #234c88 55%, ${GOLD} 100%)`,
          color: "white",
          borderRadius: "24px",
          padding: "2rem",
          boxShadow: "0 18px 45px rgba(27,58,107,0.2)",
          marginBottom: "1.5rem"
        }}>
          <p style={{ margin: 0, textTransform: "uppercase", letterSpacing: "0.12em", fontSize: "0.78rem", opacity: 0.9 }}>
            Boutiques vendeurs
          </p>
          <h1 style={{ margin: "0.35rem 0 0.85rem", fontSize: "2.1rem", lineHeight: 1.1 }}>
            Explore toutes les boutiques disponibles
          </h1>
          <p style={{ margin: 0, maxWidth: "720px", color: "rgba(255,255,255,0.92)", lineHeight: 1.6 }}>
            Consulte les boutiques des vendeurs enregistrés, ouvre une boutique pour voir sa présentation et découvrir ses produits.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1rem",
          marginBottom: "1.5rem"
        }}>
          {PROMO_IMAGES.map((src, index) => (
            <div key={src} style={{
              background: "white",
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 10px 28px rgba(17,24,39,0.06)",
              border: "1px solid #e8edf3"
            }}>
              <AsyncProductImage
                src={src}
                alt={`Publicité boutique ${index + 1}`}
                loading="lazy"
                style={{ width: "100%", height: "180px", objectFit: "cover" }}
                wrapperStyle={{ width: "100%", height: "180px" }}
              />
            </div>
          ))}
        </div>

        {loading ? (
          <div style={{ padding: "3rem 1rem", textAlign: "center", color: "#666" }}>
            Chargement des boutiques...
          </div>
        ) : error ? (
          <div style={{ padding: "2rem", background: "#fff4f4", color: "#9b1c1c", borderRadius: "12px", border: "1px solid #f2c7c7" }}>
            {error}
          </div>
        ) : boutiques.length === 0 ? (
          <div style={{ padding: "3rem 1rem", textAlign: "center", color: "#666" }}>
            Aucune boutique disponible pour le moment.
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.25rem"
          }}>
            {boutiques.map((boutique) => (
              <Link
                key={boutique.id}
                to={`/boutiques/${boutique.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <article style={{
                  background: "white",
                  borderRadius: "18px",
                  overflow: "hidden",
                  border: "1px solid #e8edf3",
                  boxShadow: "0 10px 28px rgba(17,24,39,0.05)",
                  height: "100%",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease"
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 16px 36px rgba(17,24,39,0.1)";
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 28px rgba(17,24,39,0.05)";
                }}>
                  <div style={{
                    height: "150px",
                    background: `linear-gradient(135deg, ${BLUE} 0%, #294d84 45%, ${GOLD} 100%)`,
                    position: "relative",
                    padding: "1rem"
                  }}>
                    <div style={{
                      width: "76px",
                      height: "76px",
                      borderRadius: "22px",
                      background: "rgba(255,255,255,0.16)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden"
                    }}>
                      <AsyncProductImage
                        src={boutique.logo || getBoutiqueLogo(boutique)}
                        alt={boutique.name}
                        priority={false}
                        loading="lazy"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        wrapperStyle={{ width: "100%", height: "100%" }}
                      />
                    </div>
                    {boutique.verified && (
                      <span style={{
                        position: "absolute",
                        top: "1rem",
                        right: "1rem",
                        background: "rgba(255,255,255,0.18)",
                        color: "white",
                        borderRadius: "999px",
                        padding: "0.35rem 0.75rem",
                        fontSize: "0.8rem",
                        fontWeight: 700
                      }}>
                        Vérifiée
                      </span>
                    )}
                  </div>

                  <div style={{ padding: "1rem 1rem 1.1rem" }}>
                    <h2 style={{ margin: "0 0 0.4rem", color: BLUE, fontSize: "1.15rem" }}>
                      {boutique.name}
                    </h2>
                    <p style={{ margin: "0 0 0.35rem", color: "#6b7280", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                      ID boutique: {boutique.id}
                    </p>
                    <p style={{ margin: 0, color: "#5f6b7a", lineHeight: 1.6, fontSize: "0.94rem" }}>
                      {boutique.description}
                    </p>
                    <div style={{ marginTop: "0.9rem", color: "#667085", fontSize: "0.88rem" }}>
                      {boutique.address}
                    </div>
                    <div style={{
                      marginTop: "1rem",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.45rem",
                      color: BLUE,
                      fontWeight: 700,
                      fontSize: "0.9rem"
                    }}>
                      Voir la boutique
                      <span aria-hidden="true">→</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
