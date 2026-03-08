import { useEffect, useState, useContext, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";

function useWindowWidth() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

const NAVY  = "#1b3a6b";
const GOLD  = "#c9a030";
const WHITE = "#ffffff";

const CATEGORIES  = ["Électronique", "Vêtements", "Livres", "Maison", "Sports"];
const PRICE_RANGES = [
  { label: "0 – 10 000 FCFA",       value: "0-10000"       },
  { label: "10 000 – 50 000 FCFA",  value: "10000-50000"   },
  { label: "50 000 – 200 000 FCFA", value: "50000-200000"  },
  { label: "Plus de 200 000 FCFA",  value: "200000+"       },
];

const detectCategory = (title = "", description = "") => {
  const t = (title + " " + description).toLowerCase();
  if (/smartphone|téléphone|phone|samsung|xiaomi|zte|iphone|huawei|oppo|tecno|infinix|android|4g|5g|modem|wifi|laptop|ordinateur|pc|tablette|écouteur|earphone|batterie externe|powerbank|clavier|souris|tv|télévision|cinéma|console|playstation|xbox|ram|ssd|hdd|cpu|gpu|router/.test(t)) return "Électronique";
  if (/vêtement|robe|chemise|pantalon|jupe|pull|manteau|pagne|tissu|tenue|habit|chaussure|basket|sac/.test(t)) return "Vêtements";
  if (/livre|roman|manuel|dictionnaire|scolaire|bande dessinée/.test(t)) return "Livres";
  if (/riz|pâte|spaghetti|maïs|farine|sucre|sel|huile|lait|yaourt|céréale|cerelac|nido|biscuit|café|thé|jus|boisson|whisky|bière|eau|nourriture|alimentation|savon|déo|shampoing|nettoyage|drap|oreiller/.test(t)) return "Maison";
  if (/guitare|piano|sport|football|basketball|vélo|fitness|yoga/.test(t)) return "Sports";
  return "Maison";
};

const MAX_DISPLAY = 20;  // jamais plus de 20 produits affichés
const BATCH_SIZE  = 100; // produits scannés par tick (libère le thread entre chaque batch)

// Test de correspondance filtres — aucune allocation, appelé dans le scan
function matchesFilters(p, searchQ, catFilter, priceFilter, freeF, primeF, ratingF) {
  if (searchQ && !p.titleQ.includes(searchQ) && !p.descQ.includes(searchQ)) return false;
  if (catFilter && p._cat !== catFilter) return false;
  if (priceFilter) {
    const px = p.price;
    if (priceFilter === "0-10000"      && px > 10000)                  return false;
    if (priceFilter === "10000-50000"  && (px < 10000 || px > 50000))  return false;
    if (priceFilter === "50000-200000" && (px < 50000 || px > 200000)) return false;
    if (priceFilter === "200000+"      && px < 200000)                 return false;
  }
  if (freeF  && !p._free)  return false;
  if (primeF && !p._prime) return false;
  if (ratingF && p._rating < ratingF) return false;
  return true;
}

const formatPrice = (price) =>
  !price || price <= 0 ? "Prix sur demande" : price.toLocaleString("fr-FR") + " FCFA";

const renderStars = (rating) => {
  const full = Math.floor(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
};

// ── Composants module-level (pas recréés à chaque rendu) ──────────────────
function FilterSection({ title, children }) {
  return (
    <div style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(27,58,107,0.1)" }}>
      <h4 style={{ fontSize: "0.82rem", fontWeight: "700", textTransform: "uppercase",
        letterSpacing: "0.07em", color: NAVY, marginBottom: "0.85rem" }}>
        {title}
      </h4>
      {children}
    </div>
  );
}

function RadioItem({ name, value, label, checked, onChange }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.45rem",
      cursor: "pointer", fontSize: "0.85rem", color: checked ? NAVY : "#444", fontWeight: checked ? "600" : "400" }}>
      <span style={{
        width: "15px", height: "15px", borderRadius: "50%",
        border: "2px solid " + (checked ? GOLD : "#ccc"),
        background: checked ? GOLD : WHITE,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, transition: "all 0.15s"
      }}>
        {checked && <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: WHITE }} />}
      </span>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} style={{ display: "none" }} />
      {label}
    </label>
  );
}

function ProductCard({ product, idx = 0 }) {
  const title    = product.displayTitle;
  const imageUrl = product.images && product.images[0] ? product.images[0] : null;
  return (
    <div className="product-card" style={{
      background: WHITE, borderRadius: "10px", overflow: "hidden",
      boxShadow: "0 2px 10px rgba(27,58,107,0.07)",
      border: "1px solid rgba(27,58,107,0.08)",
      transition: "transform 0.22s, box-shadow 0.22s, border-color 0.22s",
      display: "flex", flexDirection: "column",
      animation: `fadeInUp 0.4s ease both`,
      animationDelay: `${Math.min(idx * 0.05, 0.6)}s`
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(27,58,107,0.15)"; e.currentTarget.style.borderColor = GOLD; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 10px rgba(27,58,107,0.07)"; e.currentTarget.style.borderColor = "rgba(27,58,107,0.08)"; }}
    >
      <div style={{ width: "100%", height: "175px", background: "#f0f3f9",
        display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
        {imageUrl ? (
          <img src={imageUrl} alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={e => { e.target.style.display = "none"; }} />
        ) : (
          <span style={{ color: "#aab", fontSize: "0.75rem", padding: "0.5rem", textAlign: "center" }}>
            {title.slice(0, 40)}
          </span>
        )}
      </div>
      <div style={{ padding: "0.9rem", flex: 1, display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: "0.68rem", fontWeight: "700", textTransform: "uppercase",
          letterSpacing: "0.05em", color: NAVY, background: "rgba(27,58,107,0.07)",
          padding: "2px 7px", borderRadius: "4px", display: "inline-block", marginBottom: "0.5rem", alignSelf: "flex-start" }}>
          {product._cat}
        </span>
        <p style={{ margin: "0 0 0.5rem", fontSize: "0.85rem", fontWeight: "600",
          color: "#1a1a1a", lineHeight: "1.4", flex: 1,
          overflow: "hidden", display: "-webkit-box",
          WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
          {title}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "0.5rem" }}>
          <span style={{ color: GOLD, fontSize: "0.8rem" }}>{renderStars(product._rating)}</span>
          <span style={{ color: "#888", fontSize: "0.72rem" }}>({product._sold} vendus)</span>
        </div>
        <p style={{ margin: "0 0 0.7rem", fontSize: "1rem", fontWeight: "800", color: NAVY }}>
          {formatPrice(product.price)}
        </p>
        <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
          {product._free && (
            <span style={{ fontSize: "0.68rem", background: "rgba(27,58,107,0.07)",
              color: NAVY, padding: "2px 7px", borderRadius: "4px", fontWeight: "600" }}>
              Livraison gratuite
            </span>
          )}
          {product._prime && (
            <span style={{ fontSize: "0.68rem", background: "rgba(201,160,48,0.12)",
              color: "#7a5e00", padding: "2px 7px", borderRadius: "4px", fontWeight: "600",
              border: "1px solid " + GOLD }}>
              Prime
            </span>
          )}
        </div>
        <Link to={"/product/" + product.id} style={{
          display: "block", textAlign: "center", padding: "0.55rem",
          background: NAVY, color: WHITE, borderRadius: "6px",
          fontSize: "0.82rem", fontWeight: "700", textDecoration: "none",
          transition: "background 0.2s", border: "2px solid " + NAVY
        }}
          onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.borderColor = GOLD; }}
          onMouseLeave={e => { e.currentTarget.style.background = NAVY; e.currentTarget.style.borderColor = NAVY; }}
        >
          Voir le produit
        </Link>
      </div>
    </div>
  );
}

export default function HomeSimple() {
  // Tous les produits dans un ref — jamais de re-render lors du chargement
  const rawRef    = useRef([]);
  const scanIdRef = useRef(0);

  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [displayed,  setDisplayed]  = useState([]); // max MAX_DISPLAY items
  const [totalFound, setTotalFound] = useState(0);  // total des correspondances
  const [scanning,   setScanning]   = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const w = useWindowWidth();
  const isMobile = w < 768;

  const { searchTerm } = useContext(SearchContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice,    setSelectedPrice]    = useState("");
  const [freeShipping,     setFreeShipping]     = useState(false);
  const [primeShipping,    setPrimeShipping]    = useState(false);
  const [selectedRating,   setSelectedRating]   = useState("");

  // Chargement unique dans rawRef (pas de state = pas de re-render par item)
  useEffect(() => {
    fetch("/products.json")
      .then(res => { if (!res.ok) throw new Error("HTTP " + res.status); return res.json(); })
      .then(data => {
        rawRef.current = (Array.isArray(data) ? data : []).map((p, i) => ({
          id:           p.id || ("json_" + i),
          displayTitle: p.title || p.name || "Produit sans titre",
          titleQ:       (p.title || p.name || "").toLowerCase(),
          descQ:        (p.description || "").toLowerCase(),
          price:        p.price || 0,
          images:       p.images || [],
          _cat:         detectCategory(p.title, p.description),
          _rating:      parseFloat((Math.random() * 1.4 + 3.6).toFixed(1)),
          _sold:        Math.floor(Math.random() * 450) + 50,
          _free:        Math.random() > 0.5,
          _prime:       Math.random() > 0.3,
        }));
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Scan progressif par batches — annulable par ID
  const runScan = useCallback(() => {
    const myId = ++scanIdRef.current;
    const raw  = rawRef.current;
    if (!raw.length) return;

    const searchQ     = searchTerm.trim().toLowerCase();
    const catFilter   = selectedCategory;
    const priceFilter = selectedPrice;
    const freeF       = freeShipping;
    const primeF      = primeShipping;
    const ratingF     = selectedRating ? parseInt(selectedRating) : 0;

    setScanning(true);
    setDisplayed([]);
    setTotalFound(0);

    let idx   = 0;
    let found = [];
    let count = 0;

    const step = () => {
      if (scanIdRef.current !== myId) return; // scan annulé par un nouveau filtre
      const end = Math.min(idx + BATCH_SIZE, raw.length);
      let changed = false;

      for (; idx < end; idx++) {
        if (matchesFilters(raw[idx], searchQ, catFilter, priceFilter, freeF, primeF, ratingF)) {
          count++;
          if (found.length < MAX_DISPLAY) {
            found = found.concat(raw[idx]);
            changed = true;
          }
        }
      }

      // Un seul setState par batch (pas par produit trouvé)
      if (changed) setDisplayed(found.slice());
      setTotalFound(count);

      if (idx < raw.length) {
        setTimeout(step, 0); // libère le thread, reprend au prochain tick
      } else {
        setScanning(false);
      }
    };

    setTimeout(step, 0);
  }, [searchTerm, selectedCategory, selectedPrice, freeShipping, primeShipping, selectedRating]);

  // Relance le scan dès que le chargement est fini ou qu'un filtre change
  useEffect(() => {
    if (!loading && !error) runScan();
  }, [loading, error, runScan]);

  const clearAll = () => {
    setSelectedCategory(""); setSelectedPrice("");
    setFreeShipping(false); setPrimeShipping(false); setSelectedRating("");
    setSidebarOpen(false);
  };

  const activeFilters = [
    selectedCategory,
    selectedPrice,
    freeShipping  ? "Livraison gratuite" : "",
    primeShipping ? "Prime" : "",
    selectedRating ? (selectedRating + "+ étoiles") : "",
  ].filter(Boolean);

  if (loading) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh", flexDirection: "column", gap: "1rem" }}>
      <div className="spinner-green" style={{ borderTopColor: NAVY }} />
      <span style={{ color: NAVY, fontWeight: "600" }}>Chargement des produits…</span>
    </div>
  );

  if (error) return (
    <div style={{ padding: "3rem", textAlign: "center", color: "#c0392b" }}>Erreur : {error}</div>
  );

  return (
    <div style={{ background: "#f4f6fb", minHeight: "100vh" }}>

      {/* ── Mobile sidebar overlay ── */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
            zIndex: 150, backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)"
          }}
        />
      )}

      {/* ── Mobile filter toggle bar ── */}
      {isMobile && (
        <div style={{ padding: "0.6rem 1rem", background: "white", borderBottom: "1px solid #eee",
          display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            onClick={() => setSidebarOpen(o => !o)}
            style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              padding: "0.45rem 1rem",
              background: sidebarOpen ? NAVY : WHITE,
              color: sidebarOpen ? WHITE : NAVY,
              border: `2px solid ${NAVY}`,
              borderRadius: "6px", fontWeight: "700", fontSize: "0.85rem",
              cursor: "pointer", transition: "all 0.2s"
            }}
          >
            Filtres{activeFilters.length > 0 ? ` (${activeFilters.length})` : ""}
          </button>
          <span style={{ fontSize: "0.82rem", color: "#888" }}>
            {scanning
              ? "Recherche en cours…"
              : `${Math.min(totalFound, MAX_DISPLAY)} produit${totalFound !== 1 ? "s" : ""} affiché${totalFound !== 1 ? "s" : ""}`}
          </span>
        </div>
      )}

      <div style={{
        maxWidth: "1400px", margin: "0 auto",
        padding: isMobile ? "1rem" : "1.5rem",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "240px 1fr",
        gap: "1.5rem", alignItems: "start"
      }}>

        {/* ── SIDEBAR ── */}
        <aside style={{
          background: WHITE, borderRadius: isMobile ? "0 12px 12px 0" : "10px",
          padding: "1.5rem",
          boxShadow: "0 2px 12px rgba(27,58,107,0.08)",
          position: isMobile ? "fixed" : "sticky",
          top: isMobile ? "0" : "80px",
          left: isMobile ? "0" : "auto",
          bottom: isMobile ? "0" : "auto",
          width: isMobile ? "min(280px, 85vw)" : "auto",
          height: isMobile ? "100vh" : "auto",
          overflowY: isMobile ? "auto" : "visible",
          zIndex: isMobile ? 160 : 1,
          transform: isMobile ? (sidebarOpen ? "translateX(0)" : "translateX(-110%)") : "none",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <span style={{ fontWeight: "700", fontSize: "0.95rem", color: NAVY }}>Filtres</span>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              {activeFilters.length > 0 && (
                <button onClick={clearAll} style={{ background: "none", border: "none", color: GOLD,
                  fontSize: "0.78rem", fontWeight: "600", cursor: "pointer", padding: 0 }}>
                  Réinitialiser
                </button>
              )}
              {isMobile && (
                <button onClick={() => setSidebarOpen(false)} style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: "1.2rem", color: "#888", padding: "0 2px", lineHeight: 1
                }}>✕</button>
              )}
            </div>
          </div>

          {activeFilters.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.2rem" }}>
              {activeFilters.map(f => (
                <span key={f} style={{ background: "rgba(201,160,48,0.12)",
                  color: "#7a5e00", fontSize: "0.72rem", fontWeight: "600",
                  padding: "3px 8px", borderRadius: "20px", border: "1px solid " + GOLD }}>
                  {f}
                </span>
              ))}
            </div>
          )}

          <FilterSection title="Catégories">
            <RadioItem name="cat" value="" label="Toutes" checked={selectedCategory === ""}
              onChange={() => setSelectedCategory("")} />
            {CATEGORIES.map(cat => (
              <RadioItem key={cat} name="cat" value={cat} label={cat} checked={selectedCategory === cat}
                onChange={() => setSelectedCategory(cat)} />
            ))}
          </FilterSection>

          <FilterSection title="Fourchette de prix">
            <RadioItem name="price" value="" label="Tous les prix" checked={selectedPrice === ""}
              onChange={() => setSelectedPrice("")} />
            {PRICE_RANGES.map(r => (
              <RadioItem key={r.value} name="price" value={r.value} label={r.label}
                checked={selectedPrice === r.value} onChange={() => setSelectedPrice(r.value)} />
            ))}
          </FilterSection>

          <FilterSection title="Livraison">
            {[
              { label: "Livraison gratuite", state: freeShipping,  set: setFreeShipping  },
              { label: "Livraison rapide",   state: primeShipping, set: setPrimeShipping },
            ].map(({ label, state, set }) => (
              <label key={label} style={{ display: "flex", alignItems: "center", gap: "8px",
                marginBottom: "0.5rem", cursor: "pointer", fontSize: "0.85rem",
                color: state ? NAVY : "#444", fontWeight: state ? "600" : "400" }}>
                <span style={{
                  width: "15px", height: "15px", borderRadius: "3px",
                  border: "2px solid " + (state ? GOLD : "#ccc"),
                  background: state ? GOLD : WHITE,
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, transition: "all 0.15s"
                }}>
                  {state && <span style={{ color: WHITE, fontSize: "10px", lineHeight: 1, fontWeight: "900" }}>✓</span>}
                </span>
                <input type="checkbox" checked={state} onChange={e => set(e.target.checked)} style={{ display: "none" }} />
                {label}
              </label>
            ))}
          </FilterSection>

          <div>
            <h4 style={{ fontSize: "0.82rem", fontWeight: "700", textTransform: "uppercase",
              letterSpacing: "0.07em", color: NAVY, marginBottom: "0.85rem" }}>Évaluation</h4>
            <RadioItem name="rating" value="" label="Toutes" checked={selectedRating === ""}
              onChange={() => setSelectedRating("")} />
            {[5, 4, 3].map(s => (
              <RadioItem key={s} name="rating" value={String(s)}
                label={<span style={{ color: GOLD }}>{renderStars(s)} <span style={{ color: "#666", fontWeight: "400" }}>({s}+)</span></span>}
                checked={selectedRating === String(s)}
                onChange={() => setSelectedRating(String(s))} />
            ))}
          </div>
        </aside>

        {/* ── PRODUCT GRID ── */}
        <main>
          {/* Barre de statut du scan — desktop uniquement */}
          {!isMobile && (
            <div style={{ marginBottom: "1rem", fontSize: "0.83rem", color: "#666", minHeight: "1.4rem" }}>
              {scanning ? (
                <span style={{ color: NAVY }}>
                  Recherche en cours{totalFound > 0
                    ? " — " + Math.min(totalFound, MAX_DISPLAY) + " affiché" + (totalFound > 1 ? "s" : "")
                    : ""}…
                </span>
              ) : (
                <span>
                  <strong style={{ color: NAVY }}>{Math.min(totalFound, MAX_DISPLAY)}</strong>
                  {" produit" + (totalFound !== 1 ? "s" : "") + " affiché" + (totalFound !== 1 ? "s" : "")}
                  {totalFound > MAX_DISPLAY && (
                    <span style={{ color: "#999" }}>{" (sur " + totalFound + " trouvés)"}</span>
                  )}
                </span>
              )}
            </div>
          )}

          {!scanning && displayed.length === 0 ? (
            <div style={{ background: WHITE, borderRadius: "10px", padding: "3rem", textAlign: "center",
              boxShadow: "0 2px 12px rgba(27,58,107,0.08)" }}>
              <p style={{ fontSize: "1.1rem", color: NAVY, fontWeight: "600", marginBottom: "0.5rem" }}>
                Aucun produit trouvé
              </p>
              <p style={{ color: "#888", fontSize: "0.9rem" }}>Essayez d&apos;autres filtres ou termes de recherche</p>
              <button onClick={clearAll} style={{ marginTop: "1rem", background: NAVY, color: WHITE,
                border: "none", borderRadius: "6px", padding: "0.6rem 1.5rem",
                fontWeight: "600", cursor: "pointer", fontSize: "0.9rem" }}>
                Effacer les filtres
              </button>
            </div>
          ) : (
            <div style={{ display: "grid",
              gridTemplateColumns: isMobile ? "repeat(auto-fill, minmax(155px, 1fr))" : "repeat(auto-fill, minmax(210px, 1fr))",
              gap: isMobile ? "0.75rem" : "1.2rem" }}>
              {displayed.map((product, idx) => (
                <ProductCard key={product.id} product={product} idx={idx} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
