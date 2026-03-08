import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import ImageCacheService from "../services/imageCache";

export default function AddProductModal({ isOpen, onClose, onProductAdded }) {
  const authContext = useContext(AuthContext);
  const { user } = authContext || { user: null };
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    stock_status: "in_stock",
    category: "electronics"
  });

  const [cachedImages, setCachedImages] = useState({});
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [errors, setErrors] = useState({});
  const [showCacheManager, setShowCacheManager] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Charger le cache local
      const localCache = ImageCacheService.getAllCachedImages();
      
      // Charger les images des produits existants du vendeur
      if (user?.seller_id) {
        api.get("/products/", { params: { seller: user.seller_id } })
          .then(res => {
            const products = Array.isArray(res.data) ? res.data : res.data.results || [];
            const cacheUpdates = { ...localCache };
            
            products.forEach(product => {
              if (product.image) {
                const imageId = `existing_${product.id}`;
                
                // Vérifier si l'image n'existe pas déjà en cache
                if (!cacheUpdates[imageId]) {
                  cacheUpdates[imageId] = {
                    id: imageId,
                    name: `${product.name}.jpg`,
                    data: product.image,
                    size: 0,
                    type: "image/jpeg",
                    addedAt: new Date().toISOString(),
                    productId: product.id,
                    isExisting: true
                  };
                }
              }
            });
            
            setCachedImages(cacheUpdates);
          })
          .catch(err => console.error("Erreur lors du chargement des images existantes:", err));
      } else {
        setCachedImages(localCache);
      }
    } else {
      // Nettoyer quand le modal ferme
      setCachedImages({});
      setSelectedImageId(null);
      setShowCacheManager(false);
    }
  }, [isOpen, user?.seller_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    if (!files || files.length === 0) {
      console.warn("Aucun fichier sélectionné");
      return;
    }

    console.log("Fichiers sélectionnés:", files.length);
    setIsUploadingImage(true);
    
    // Validation des fichiers
    const validFiles = [];
    const validationErrors = [];
    
    for (const file of files) {
      // Vérifier le type
      if (!file.type.startsWith('image/')) {
        validationErrors.push(`${file.name} n'est pas une image`);
        continue;
      }
      
      // Vérifier la taille (max 5MB par image)
      if (file.size > 5 * 1024 * 1024) {
        validationErrors.push(`${file.name} dépasse 5MB`);
        continue;
      }
      
      validFiles.push(file);
    }
    
    if (validFiles.length === 0) {
      setIsUploadingImage(false);
      return;
    }

    if (Object.keys(cachedImages).length + validFiles.length > 100) {
      setIsUploadingImage(false);
      return;
    }

    const uploadErrors = [];
    let successCount = 0;

    for (const file of validFiles) {
      try {
        console.log(`Ajout de l'image: ${file.name} (${(file.size / 1024).toFixed(2)}KB)`);
        const imageId = await ImageCacheService.addImageToCache(file);
        
        if (imageId) {
          const cachedImage = ImageCacheService.getImageById(imageId);
          console.log("Image ajoutée au cache:", imageId);
          
          setCachedImages(prev => ({
            ...prev,
            [imageId]: cachedImage
          }));
          
          if (!selectedImageId) {
            setSelectedImageId(imageId);
          }
          
          successCount++;
        } else {
          uploadErrors.push(`${file.name}: Erreur lors de l'ajout au cache`);
        }
      } catch (err) {
        console.error("Erreur lors de l'ajout de l'image:", file.name, err);
        uploadErrors.push(`${file.name}: ${err.message}`);
      }
    }

    setIsUploadingImage(false);

    if (successCount > 0) {
      console.log(`${successCount} image(s) ajoutée(s) au cache`);
    } else {
      console.error("Erreur lors de l'ajout des images");
    }
  };

  const handleDeleteCachedImage = (imageId) => {
    const image = cachedImages[imageId];
    const isExisting = image?.isExisting;
    
    const message = isExisting 
      ? "Supprimer cette image existante du cache ?\n(Elle restera dans le produit original)"
      : "Supprimer cette image du cache ?";
    
    if (confirm(message)) {
      // Si ce n'est pas une image existante, la supprimer du localStorage
      if (!isExisting) {
        ImageCacheService.deleteImageFromCache(imageId);
      }
      
      // Supprimer du cache affichage
      setCachedImages(prev => {
        const newCache = { ...prev };
        delete newCache[imageId];
        return newCache;
      });
      
      // Si l'image supprimée était sélectionnée, la désélectionner
      if (selectedImageId === imageId) {
        setSelectedImageId(null);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Le nom est obligatoire";
    if (!formData.description.trim()) newErrors.description = "La description est obligatoire";
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = "Le prix doit être > 0";
    if (!formData.stock_quantity || parseInt(formData.stock_quantity) < 0) newErrors.stock_quantity = "Quantité invalide";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    const formPayload = new FormData();

    // Champs principaux
    formPayload.append("name", formData.name);
    formPayload.append("description", formData.description);
    formPayload.append("price", formData.price);
    formPayload.append("stock_quantity", formData.stock_quantity);
    formPayload.append("stock_status", formData.stock_status);
    formPayload.append("category", formData.category);

    // Champs requis par le backend
    if (user?.seller_id) {
      formPayload.append("seller", user.seller_id);
    } else if (user?.is_seller && !user?.seller_id) {
      console.error("ERREUR: Utilisateur marqué comme vendeur mais seller_id manquant!");
      setLoading(false);
      return;
    }
    
    // Le champ "stock" peut être identique à stock_quantity
    formPayload.append("stock", formData.stock_quantity);

    // Utiliser l'image du cache si sélectionnée
    if (selectedImageId && cachedImages[selectedImageId]) {
      const cachedImage = cachedImages[selectedImageId];
      
      try {
        // Si c'est une image existante (URL complète), la récupérer directement
        if (cachedImage.isExisting && cachedImage.data.startsWith('http')) {
          const response = await fetch(cachedImage.data);
          const blob = await response.blob();
          const file = new File([blob], cachedImage.name, { type: cachedImage.type });
          formPayload.append("image", file);
        } else if (!cachedImage.isExisting) {
          // Si c'est une image en base64
          const response = await fetch(cachedImage.data);
          const blob = await response.blob();
          const file = new File([blob], cachedImage.name, { type: cachedImage.type });
          formPayload.append("image", file);
        }
      } catch (err) {
        console.error("Erreur lors de la conversion de l'image:", err);
      }
    }

    // Log tous les champs envoyés
    console.log("=== FormData envoyé ===");
    console.log("Seller ID:", user?.seller_id || user?.id || "MANQUANT");
    console.log("Image sélectionnée:", selectedImageId || "AUCUNE");
    for (let [key, value] of formPayload) {
      if (value instanceof File) {
        console.log(`${key}: File - ${value.name}`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    try {
      console.log("Envoi du produit...");
      console.log("Images en cache:", Object.keys(cachedImages).length);
      console.log("Image sélectionnée pour le produit:", selectedImageId || "Aucune");
      
      const response = await api.post("/products/", formPayload);
      onProductAdded(response.data);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Erreur complète:", error.response?.data || error.message);
      console.error("Status:", error.response?.status);
      
      let errorMsg = "Erreur lors de l'ajout du produit";
      
      if (error.response?.data?.detail) {
        errorMsg = error.response.data.detail;
      } else if (error.response?.data?.non_field_errors) {
        errorMsg = Array.isArray(error.response.data.non_field_errors) 
          ? error.response.data.non_field_errors.join(" | ")
          : error.response.data.non_field_errors;
      } else if (typeof error.response?.data === 'object') {
        console.error("Champs avec erreurs:", Object.keys(error.response.data));
        const msgs = [];
        Object.entries(error.response.data).forEach(([key, value]) => {
          console.error(`Champ '${key}':`, value);
          if (Array.isArray(value)) {
            msgs.push(`${key}: ${value.join(", ")}`);
          } else {
            msgs.push(`${key}: ${value}`);
          }
        });
        errorMsg = msgs.length > 0 ? msgs.join(" | ") : JSON.stringify(error.response.data);
      }
      
      console.error("Message d'erreur final:", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      stock_quantity: "",
      stock_status: "in_stock",
      category: "electronics"
    });
    setSelectedImageId(null);
    setErrors({});
  };

  if (!isOpen) return null;

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
        width: "90%",
        maxWidth: "600px",
        maxHeight: "90vh",
        overflowY: "auto",
        padding: "2rem"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ margin: 0 }}>Ajouter un produit</h2>
          <button
            onClick={onClose}
            style={{
              border: "none",
              backgroundColor: "transparent",
              fontSize: "1.5rem",
              cursor: "pointer"
            }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Photos */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem" }}>
              Photos du produit (optionnel, max 5MB par image)
            </label>
            <div style={{
              border: isUploadingImage ? "2px solid #007bff" : "2px dashed #ddd",
              borderRadius: "4px",
              padding: "2rem",
              textAlign: "center",
              cursor: isUploadingImage ? "not-allowed" : "pointer",
              backgroundColor: isUploadingImage ? "#e7f3ff" : "#f9f9f9",
              transition: "all 0.2s"
            }}>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploadingImage}
                style={{ display: "none" }}
                id="image-input"
              />
              <label htmlFor="image-input" style={{ cursor: isUploadingImage ? "not-allowed" : "pointer", display: "block" }}>
                <p style={{ margin: "0 0 0.5rem 0", fontSize: "1.2rem", opacity: isUploadingImage ? 0.6 : 1 }}>
                  {isUploadingImage ? "Chargement" : "Image"}
                </p>
                <p style={{ margin: 0, color: "#666" }}>
                  {isUploadingImage ? "Ajout en cours... Veuillez patienter" : "Cliquez ou glissez des images ici"}
                </p>
                <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.85rem", color: "#999" }}>
                  Format: JPG, PNG, GIF | Max: 5MB par image
                </p>
              </label>
            </div>
            {errors.images && <p style={{ color: "#c00", marginTop: "0.5rem" }}>❌ {errors.images}</p>}

            {/* Cache d'images */}
            <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                {(() => {
                  const newImages = Object.values(cachedImages).filter(img => !img.isExisting).length;
                  const existingImages = Object.values(cachedImages).filter(img => img.isExisting).length;
                  return (
                    <p style={{ margin: 0, fontWeight: "600" }}>
                      📁 Mes images en cache ({newImages} nouveau{newImages !== 1 ? 'x' : ''} + {existingImages} existant{existingImages !== 1 ? 's' : ''})
                    </p>
                  );
                })()}
                <button
                  type="button"
                  onClick={() => setShowCacheManager(!showCacheManager)}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  {showCacheManager ? "Masquer" : "Afficher le cache"}
                </button>
              </div>

              {showCacheManager && Object.keys(cachedImages).length > 0 && (
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                  gap: "1rem",
                  marginTop: "1rem"
                }}>
                  {Object.entries(cachedImages).map(([imageId, image]) => (
                    <div
                      key={imageId}
                      onClick={() => setSelectedImageId(imageId)}
                      style={{
                        position: "relative",
                        cursor: "pointer",
                        border: selectedImageId === imageId ? "3px solid #28a745" : "2px solid #ddd",
                        borderRadius: "4px",
                        overflow: "hidden",
                        backgroundColor: "white"
                      }}
                    >
                      <img
                        src={image.data}
                        alt={image.name}
                        style={{
                          width: "100%",
                          height: "120px",
                          objectFit: "cover"
                        }}
                      />
                      {selectedImageId === imageId && (
                        <div style={{
                          position: "absolute",
                          top: "0",
                          left: "0",
                          right: "0",
                          bottom: "0",
                          backgroundColor: "rgba(40, 167, 69, 0.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          <span style={{ fontSize: "1.5rem" }}>✓</span>
                        </div>
                      )}
                      {image.isExisting && (
                        <span style={{
                          position: "absolute",
                          bottom: "2px",
                          left: "2px",
                          backgroundColor: "#17a2b8",
                          color: "white",
                          padding: "2px 6px",
                          borderRadius: "2px",
                          fontSize: "0.75rem",
                          fontWeight: "600"
                        }}>
                          Existant
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCachedImage(imageId);
                        }}
                        style={{
                          position: "absolute",
                          top: "2px",
                          right: "2px",
                          backgroundColor: "#c00",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: "24px",
                          height: "24px",
                          cursor: "pointer",
                          fontSize: "12px"
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {Object.keys(cachedImages).length === 0 && (
                <p style={{ margin: "0.5rem 0", color: "#666", fontSize: "0.9rem" }}>Aucune image en cache</p>
              )}
            </div>
          </div>

          {/* Nom */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem" }}>
              Nom du produit *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ex: Téléphone Samsung"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: errors.name ? "2px solid #c00" : "1px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box"
              }}
            />
            {errors.name && <p style={{ color: "#c00", marginTop: "0.25rem" }}>{errors.name}</p>}
          </div>

          {/* Description */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem" }}>
              Description *
            </label>
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
                boxSizing: "border-box"
              }}
            />
            {errors.description && <p style={{ color: "#c00", marginTop: "0.25rem" }}>{errors.description}</p>}
          </div>

          {/* Prix */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem" }}>
              Prix (FCFA) *
            </label>
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
            {errors.price && <p style={{ color: "#c00", marginTop: "0.25rem" }}>{errors.price}</p>}
          </div>

          {/* Quantité en stock */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem" }}>
              Quantité en stock *
            </label>
            <input
              type="number"
              name="stock_quantity"
              value={formData.stock_quantity}
              onChange={handleInputChange}
              placeholder="0"
              min="0"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: errors.stock_quantity ? "2px solid #c00" : "1px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box"
              }}
            />
            {errors.stock_quantity && <p style={{ color: "#c00", marginTop: "0.25rem" }}>{errors.stock_quantity}</p>}
          </div>

          {/* Statut du stock */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem" }}>
              Statut du stock *
            </label>
            <select
              name="stock_status"
              value={formData.stock_status}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box"
              }}
            >
              <option value="in_stock">✓ En stock</option>
              <option value="low_stock">⚠ Stock faible</option>
              <option value="out_of_stock">✕ Épuisé</option>
            </select>
          </div>

          {/* Catégorie */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem" }}>
              Catégorie *
            </label>
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
              <option value="fashion">Mode et vêtements</option>
              <option value="home">Maison et décoration</option>
              <option value="sports">Sports et loisirs</option>
              <option value="books">Livres</option>
              <option value="beauty">Beauté et soins</option>
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
                cursor: "pointer"
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
                backgroundColor: "#ff6b35",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? "Ajout en cours..." : "Ajouter le produit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
