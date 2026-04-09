import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const BLUE = "#1b3a6b";
const GOLD = "#c9a030";
const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='600'%3E%3Crect width='900' height='600' fill='%23edf2f7'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-size='28'%3ECatégorie SafinPay%3C/text%3E%3C/svg%3E";

const CATEGORY_ALIASES = [
  { key: "Électronique", match: /smartphone|téléphone|phone|samsung|xiaomi|zte|iphone|huawei|oppo|tecno|infinix|android|4g|5g|modem|wifi|laptop|ordinateur|pc|tablette|écouteur|earphone|tv|télévision|cinéma|console|playstation|xbox|ram|ssd|hdd|cpu|gpu|router/i },
  { key: "Mode", match: /vêtement|robe|chemise|pantalon|jupe|pull|manteau|pagne|tissu|tenue|habit|chaussure|basket|sac/i },
  { key: "Maison & Déco", match: /riz|pâte|spaghetti|maïs|farine|sucre|sel|huile|lait|yaourt|céréale|cerelac|nido|biscuit|café|thé|jus|boisson|whisky|bière|eau|nourriture|alimentation|savon|déo|shampoing|nettoyage|drap|oreiller|électroménager|electromenager|cuisine|décoration|deco/i },
  { key: "Beauté & Santé", match: /beauté|santé|crème|parfum|cosmétique|cheveux|huile de beauté|maquillage|gel|savon de beauté|soin/i },
  { key: "Sport & Loisirs", match: /guitare|piano|sport|football|basketball|vélo|fitness|yoga|loisir|jeu|jouet/i },
];

function detectCategory(title = "", description = "", dbCategory = "") {
  const source = `${title} ${description} ${dbCategory}`.toLowerCase();
  const alias = CATEGORY_ALIASES.find((item) => item.match.test(source));
  return alias?.key || dbCategory || "Autres";
}

function normalizeProduct(product) {
  const title = product?.title || product?.name || product?.nomproduit || "Produit sans titre";
  const description = product?.description || product?.descriptionproduit || "";
  const dbCategory = product?.category || product?.category_name || product?.nomcathegorieproduit || "";
  const category = detectCategory(title, description, dbCategory);
  const image = product?.image || (Array.isArray(product?.images) && product.images[0]) || FALLBACK_IMAGE;

  return {
    ...product,
    title,
    description,
    category,
    image,
  };
}

function getCategoryGradient(category) {
  if (category === "Électronique") return "linear-gradient(135deg, #1b3a6b 0%, #2b5aa7 100%)";
  if (category === "Mode") return "linear-gradient(135deg, #be185d 0%, #ec4899 100%)";
  if (category === "Maison & Déco") return "linear-gradient(135deg, #b45309 0%, #f59e0b 100%)";
  if (category === "Beauté & Santé") return "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)";
  if (category === "Sport & Loisirs") return "linear-gradient(135deg, #047857 0%, #22c55e 100%)";
  return "linear-gradient(135deg, #334155 0%, #64748b 100%)";
}

export default function Categories() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadProducts = async () => {
      try {
        const res = await api.get("/products/");
        const data = Array.isArray(res.data) ? res.data : res.data.results || [];
        const normalized = data.map(normalizeProduct);
        if (active) {
          setProducts(normalized);
          if (!selectedCategory && normalized.length > 0) {
            setSelectedCategory(normalized[0].category);
          }
        }
      } catch (err) {
        console.error("Erreur chargement produits:", err);
        if (active) {
          setError("Impossible de charger les catégories pour le moment.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadProducts();
    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(() => {
    const grouped = new Map();

    products.forEach((product) => {
      const category = product.category || "Autres";
      if (!grouped.has(category)) {
        grouped.set(category, []);
      }
      grouped.get(category).push(product);
    });

    return Array.from(grouped.entries()).map(([name, items]) => {
      const representative = items.find((item) => item.image) || items[0] || {};
      return {
        name,
        count: items.length,
        image: representative.image || FALLBACK_IMAGE,
        gradient: getCategoryGradient(name),
        products: items,
        slug: name.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "et"),
      };
    }).sort((a, b) => a.name.localeCompare(b.name, "fr"));
  }, [products]);

  const selected = categories.find((cat) => cat.name === selectedCategory) || categories[0] || null;

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "2rem 1rem 3rem" }}>
        <div style={{
          background: `linear-gradient(135deg, ${BLUE} 0%, #234c88 55%, ${GOLD} 100%)`,
          color: "white",
          borderRadius: "24px",
          padding: "2rem",
          marginBottom: "1.5rem",
          boxShadow: "0 18px 45px rgba(27,58,107,0.2)"
        }}>
          <p style={{ margin: 0, letterSpacing: "0.12em", textTransform: "uppercase", fontSize: "0.78rem", opacity: 0.9 }}>
            Catégories basées sur la base de données
          </p>
          <h1 style={{ margin: "0.35rem 0 0.75rem", fontSize: "2.2rem", lineHeight: 1.1 }}>
            Découvrez les catégories avec leurs images réelles
          </h1>
          <p style={{ margin: 0, maxWidth: "760px", lineHeight: 1.6, color: "rgba(255,255,255,0.92)" }}>
            Chaque catégorie affiche désormais une image représentative prise parmi les produits disponibles en base, puis les produits de cette catégorie au clic.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#666" }}>Chargement des catégories...</div>
        ) : error ? (
          <div style={{ padding: "1.5rem", background: "#fff4f4", color: "#9b1c1c", border: "1px solid #f2c7c7", borderRadius: "12px" }}>{error}</div>
        ) : categories.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#666" }}>
            Aucune catégorie détectée dans la base de données.
          </div>
        ) : (
          <>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "1.25rem",
              marginBottom: "2rem"
            }}>
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setSelectedCategory(cat.name)}
                  style={{
                    textAlign: "left",
                    border: selectedCategory === cat.name ? `2px solid ${GOLD}` : "1px solid #e5e7eb",
                    borderRadius: "18px",
                    overflow: "hidden",
                    background: "white",
                    cursor: "pointer",
                    boxShadow: selectedCategory === cat.name ? "0 14px 34px rgba(201,160,48,0.18)" : "0 8px 24px rgba(15,23,42,0.06)",
                    padding: 0,
                    transition: "transform 0.2s ease, box-shadow 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ height: "180px", position: "relative", overflow: "hidden", background: cat.gradient }}>
                    <img
                      src={cat.image}
                      alt={cat.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9, mixBlendMode: "screen" }}
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_IMAGE;
                      }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.35))" }} />
                    <div style={{ position: "absolute", left: "1rem", bottom: "1rem", color: "white" }}>
                      <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 800 }}>{cat.name}</h3>
                      <p style={{ margin: "0.25rem 0 0", fontSize: "0.88rem", opacity: 0.92 }}>{cat.count} produit{cat.count > 1 ? "s" : ""}</p>
                    </div>
                  </div>

                  <div style={{ padding: "1rem 1.1rem 1.15rem" }}>
                    <p style={{ margin: 0, color: "#475467", fontSize: "0.92rem", lineHeight: 1.5 }}>
                      Cliquez pour voir les produits de cette catégorie.
                    </p>
                    <div style={{ marginTop: "0.8rem", color: GOLD, fontWeight: 700, fontSize: "0.9rem" }}>
                      Voir les produits →
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {selected && (
              <div style={{ marginTop: "2rem" }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "end",
                  gap: "1rem",
                  flexWrap: "wrap",
                  marginBottom: "1.25rem"
                }}>
                  <div>
                    <h2 style={{ margin: 0, color: BLUE, fontSize: "1.9rem" }}>{selected.name}</h2>
                    <p style={{ margin: "0.35rem 0 0", color: "#667085" }}>
                      {selected.count} produit{selected.count > 1 ? "s" : ""} trouvé{selected.count > 1 ? "s" : ""}
                    </p>
                  </div>
                  <Link to="/search" style={{ color: BLUE, textDecoration: "none", fontWeight: 700 }}>
                    Voir tout le catalogue
                  </Link>
                </div>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                  gap: "1.25rem"
                }}>
                  {selected.products.slice(0, 8).map((product) => (
                    <div key={product.id} style={{ background: "white", borderRadius: "16px", overflow: "hidden", border: "1px solid #e5e7eb", boxShadow: "0 8px 22px rgba(15,23,42,0.05)" }}>
                      <div style={{ height: "170px", background: "#f3f4f6" }}>
                        <img
                          src={product.image || FALLBACK_IMAGE}
                          alt={product.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          onError={(e) => {
                            e.currentTarget.src = FALLBACK_IMAGE;
                          }}
                        />
                      </div>
                      <div style={{ padding: "1rem" }}>
                        <p style={{ margin: "0 0 0.35rem", color: BLUE, fontWeight: 700, fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          {product.category}
                        </p>
                        <h3 style={{ margin: 0, fontSize: "1rem", color: "#111827" }}>{product.title}</h3>
                        <p style={{ margin: "0.5rem 0 0", color: "#475467", fontSize: "0.9rem", lineHeight: 1.5 }}>
                          {product.description || "Produit sans description."}
                        </p>
                        <Link to={`/product/${product.id}`} style={{ display: "inline-block", marginTop: "0.9rem", color: GOLD, fontWeight: 700, textDecoration: "none" }}>
                          Voir le produit →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}