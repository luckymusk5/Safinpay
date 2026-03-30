import { Link } from "react-router-dom";

// --- Données des catégories ---
const categories = [
  { name: "Électronique", image: "https://via.placeholder.com/300x200/1b3a6b/ffffff?text=Électronique" },
  { name: "Mode", image: "https://via.placeholder.com/300x200/c9a030/ffffff?text=Mode" },
  { name: "Maison & Déco", image: "https://via.placeholder.com/300x200/1b3a6b/ffffff?text=Maison" },
  { name: "Beauté & Santé", image: "https://via.placeholder.com/300x200/c9a030/ffffff?text=Beauté" },
  { name: "Sport & Loisirs", image: "https://via.placeholder.com/300x200/1b3a6b/ffffff?text=Sport" },
];

export default function Categories() {
  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      
      {/* On ne met plus de Navbar ni Footer ici → ils sont déjà dans App.jsx */}

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
        
        <h1 style={{ 
          textAlign: "center", 
          fontSize: "2.8rem", 
          fontWeight: "800", 
          color: "#1b3a6b",
          marginBottom: "3rem"
        }}>
          Explorez nos <span style={{ color: "#c9a030" }}>Catégories</span>
        </h1>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", 
          gap: "2rem" 
        }}>
          {categories.map((cat, index) => (
            <div
              key={index}
              style={{
                background: "white",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                textAlign: "center"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.06)";
              }}
            >
              <div style={{ height: "200px" }}>
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  style={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "cover" 
                  }} 
                />
              </div>

              <div style={{ padding: "1.5rem" }}>
                <h3 style={{ 
                  fontSize: "1.25rem", 
                  color: "#1b3a6b", 
                  margin: "0 0 0.8rem 0",
                  fontWeight: "700"
                }}>
                  {cat.name}
                </h3>
                <p style={{ 
                  color: "#c9a030", 
                  fontWeight: "600", 
                  fontSize: "0.9rem" 
                }}>
                  VOIR TOUT →
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}