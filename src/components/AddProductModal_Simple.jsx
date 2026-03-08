import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

export default function AddProductModal_Simple({ isOpen, onClose, onProductAdded }) {
  const authContext = useContext(AuthContext);
  const { user } = authContext || { user: null };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "electronics",
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validation
    if (!file.type.startsWith('image/')) {
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      return;
    }

    // Preview
    const reader = new FileReader();
    reader.onload = (evt) => {
      setImagePreview(evt.target.result);
    };
    reader.readAsDataURL(file);

    setFormData(prev => ({ ...prev, image: file }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nom requis";
    if (!formData.description.trim()) newErrors.description = "Description requise";
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = "Prix invalide";
    if (!formData.stock || parseInt(formData.stock) < 0) newErrors.stock = "Stock invalide";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    // Préparer FormData
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("price", formData.price);
    payload.append("stock", formData.stock);
    payload.append("category", formData.category);
    
    // IMPORTANT: Le backend exige le seller ID
    if (user?.seller_id) {
      payload.append("seller", user.seller_id);
    } else {
      setLoading(false);
      return;
    }

    // Ajouter l'image si sélectionnée
    if (formData.image) {
      payload.append("image", formData.image);
    }

    try {
      // Log pour déboguer
      console.log("Envoi du produit:");
      console.log("- Nom:", formData.name);
      console.log("- Seller ID:", user.seller_id);
      console.log("- Image:", formData.image ? formData.image.name : "Aucune");

      const response = await api.post("/products/", payload);
      if (onProductAdded) onProductAdded(response.data);

      // Reset
      setFormData({ name: "", description: "", price: "", stock: "", category: "electronics", image: null });
      setImagePreview(null);
      onClose();
    } catch (error) {
      console.error("❌ Erreur complète:", error.response?.data || error.message);
      console.error("Status:", error.response?.status);
      
      // Afficher TOUS les erreurs du backend
      let errorMsg = "Erreur lors de l'ajout du produit";
      if (error.response?.data) {
        const data = error.response.data;
        
        // Si c'est un tableau d'erreurs
        if (Array.isArray(data)) {
          errorMsg = data.map(e => e.detail || e).join(" | ");
        } else {
          // Si c'est un objet avec champs
          const errors = [];
          Object.entries(data).forEach(([key, value]) => {
            const msg = Array.isArray(value) ? value.join(", ") : value;
            errors.push(`${key}: ${msg}`);
          });
          if (errors.length > 0) errorMsg = errors.join(" | ");
        }
      }
      
      console.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "2rem",
        maxWidth: "600px",
        width: "90%",
        maxHeight: "90vh",
        overflowY: "auto"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ margin: 0 }}>Ajouter un produit</h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "#999"
            }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Image Upload */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem" }}>
              Photo du produit
            </label>
            
            {/* Preview */}
            {imagePreview && (
              <div style={{
                width: "100%",
                height: "200px",
                backgroundColor: "#f0f0f0",
                borderRadius: "4px",
                marginBottom: "0.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden"
              }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                />
              </div>
            )}

            {/* File Input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px dashed #0066c0",
                borderRadius: "4px",
                cursor: "pointer",
                boxSizing: "border-box"
              }}
            />
            <small style={{ color: "#666", display: "block", marginTop: "0.25rem" }}>
              Max 5MB. Formats: JPG, PNG, WebP, etc.
            </small>
          </div>

          {/* Nom */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem" }}>Nom *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ex: Poule fermière"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: errors.name ? "2px solid #c00" : "1px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box"
              }}
            />
            {errors.name && <p style={{ color: "#c00", margin: "0.25rem 0 0 0", fontSize: "0.85rem" }}>{errors.name}</p>}
          </div>

          {/* Description */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem" }}>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Décrivez votre produit..."
              style={{
                width: "100%",
                padding: "0.75rem",
                border: errors.description ? "2px solid #c00" : "1px solid #ddd",
                borderRadius: "4px",
                minHeight: "100px",
                boxSizing: "border-box",
                fontFamily: "inherit"
              }}
            />
            {errors.description && <p style={{ color: "#c00", margin: "0.25rem 0 0 0", fontSize: "0.85rem" }}>{errors.description}</p>}
          </div>

          {/* Prix et Stock */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
            <div>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem" }}>Prix (FCFA) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                step="100"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: errors.price ? "2px solid #c00" : "1px solid #ddd",
                  borderRadius: "4px",
                  boxSizing: "border-box"
                }}
              />
              {errors.price && <p style={{ color: "#c00", margin: "0.25rem 0 0 0", fontSize: "0.85rem" }}>{errors.price}</p>}
            </div>
            <div>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem" }}>Stock *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: errors.stock ? "2px solid #c00" : "1px solid #ddd",
                  borderRadius: "4px",
                  boxSizing: "border-box"
                }}
              />
              {errors.stock && <p style={{ color: "#c00", margin: "0.25rem 0 0 0", fontSize: "0.85rem" }}>{errors.stock}</p>}
            </div>
          </div>

          {/* Catégorie */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem" }}>Catégorie *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box"
              }}
            >
              <option value="electronics">Électronique</option>
              <option value="clothing">Vêtements</option>
              <option value="food">Alimentation</option>
              <option value="home">Maison</option>
              <option value="sports">Sports</option>
              <option value="books">Livres</option>
              <option value="other">Autre</option>
            </select>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: "0.75rem",
                border: "1px solid #ddd",
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "600"
              }}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: "0.75rem",
                backgroundColor: "#d9534f",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                fontWeight: "600"
              }}
            >
              {loading ? "Ajout..." : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
