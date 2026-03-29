import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Categories from "./pages/Categories";
import SellerStore from "./pages/SellerStore";

const NAVY = "#1b3a6b";
const GOLD = "#c9a030";

export default function App() {
  return (
    <Router>
      <nav style={{ 
        background: NAVY, 
        padding: "1rem 2rem", 
        display: "flex", 
        gap: "2rem", 
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        position: "sticky",
        top: 0,
        zIndex: 1000
      }}>
        <Link to="/" style={{ color: "white", textDecoration: "none", fontWeight: "700", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>Catégories</Link>
        <Link to="/store" style={{ color: "white", textDecoration: "none", fontWeight: "700", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>Boutique</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/store" element={<SellerStore />} />
      </Routes>
    </Router>
  );
}