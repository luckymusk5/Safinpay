import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct_new = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    stock: 1,
    condition: 'new' // État du produit
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simuler l'ajout
    console.log("Produit Premium :", formData);
    alert("Produit publié avec succès !");
    navigate('/seller/dashboard'); // Retour au dashboard
  };

  return (
    <div style={pageContainerStyle}>
      <div style={formCardStyle}>
        
        {/* En-tête de la Page */}
        <div style={headerStyle}>
          <h1 style={titleStyle}>Ajouter un Nouveau Produit</h1>
          <p style={subtitleStyle}>Remplissez les détails pour publier votre article sur Safinpay.</p>
        </div>

        <form onSubmit={handleSubmit} style={gridFormStyle}>
          
          {/* ZONE DE GAUCHE : Image & Aperçu */}
          <div style={imageSectionStyle}>
            <label style={labelStyle}>Visuel du Produit</label>
            <div style={imageUploadCardStyle}>
              {preview ? (
                <img src={preview} alt="Prévisualisation" style={imagePreviewStyle} />
              ) : (
                <div style={placeholderTextStyle}>
                  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                  <span>Format recommandé : Carré (1:1)</span>
                </div>
              )}
            </div>
            <div style={uploadButtonStyle}>
              <label htmlFor="file-upload" style={customUploadLabelStyle}>
                {preview ? "Changer l'image" : "Sélectionner une image"}
              </label>
              <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            </div>
          </div>

          {/* ZONE DE DROITE : Informations */}
          <div style={infoSectionStyle}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Nom de l'article</label>
              <input type="text" name="name" onChange={handleChange} required placeholder="Ex: Bracelet d'Ambre Authentique" style={inputStyle} />
            </div>

            <div style={flexRowStyle}>
              <div style={{ flex: 2 }}>
                <label style={labelStyle}>Prix (FCFA)</label>
                <input type="number" name="price" onChange={handleChange} required placeholder="0" style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Stock</label>
                <input type="number" name="stock" onChange={handleChange} min="1" placeholder="1" style={inputStyle} />
              </div>
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Catégorie</label>
              <select name="category" onChange={handleChange} required style={selectStyle}>
                <option value="">Sélectionner une catégorie</option>
                <option value="artisanat">Artisanat & Déco</option>
                <option value="mode">Mode & Beauté</option>
                <option value="alimentaire">Épicerie Fine</option>
              </select>
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>État du produit</label>
              <div style={radioGroupStyle}>
                <label style={radioOptionStyle}>
                  <input type="radio" name="condition" value="new" checked={formData.condition === 'new'} onChange={handleChange} />
                  Nouveau
                </label>
                <label style={radioOptionStyle}>
                  <input type="radio" name="condition" value="used" onChange={handleChange} />
                  Occasion
                </label>
              </div>
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Description de l'article</label>
              <textarea name="description" rows="4" onChange={handleChange} placeholder="Décrivez l'origine, les matériaux, ou les dimensions..." style={textareaStyle}></textarea>
            </div>

            <div style={actionSectionStyle}>
              <button type="button" onClick={() => navigate('/seller/dashboard')} style={cancelButtonStyle}>
                Annuler
              </button>
              <button type="submit" style={submitButtonStyle}>
                Publier le Produit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- STYLES EN JAVASCRIPT ---

const pageContainerStyle = {
  backgroundColor: '#f8f9fa', // Fond légèrement grisé
  minHeight: '100vh',
  padding: '60px 20px',
  fontFamily: "'Poppins', 'Helvetica Neue', sans-serif", // Police moderne (à ajouter dans ton index.html)
};

const formCardStyle = {
  maxWidth: '900px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  borderRadius: '20px',
  boxShadow: '0 15px 40px rgba(0, 0, 0, 0.05)', // Ombre très douce
  padding: '50px',
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '40px',
  borderBottom: '1px solid #f0f0f0',
  paddingBottom: '20px',
};

const titleStyle = {
  color: '#003366', // Bleu Safinpay
  fontSize: '28px',
  fontWeight: '700',
  margin: '0 0 10px 0',
};

const subtitleStyle = {
  color: '#888',
  fontSize: '16px',
  margin: '0',
};

const gridFormStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr', // Deux colonnes égales
  gap: '40px',
};

const imageSectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const infoSectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const imageUploadCardStyle = {
  width: '100%',
  height: '350px',
  border: '2px dashed #e0e0e0',
  borderRadius: '15px',
  backgroundColor: '#fbfbfb',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  transition: 'border-color 0.3s ease',
  '&:hover': {
    borderColor: '#003366',
  }
};

const imagePreviewStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover', // Remplit l'espace sans déformer
};

const placeholderTextStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '15px',
  color: '#ccc',
  fontSize: '14px',
};

const uploadButtonStyle = {
  marginTop: '20px',
  width: '100%',
};

const customUploadLabelStyle = {
  display: 'block',
  textAlign: 'center',
  padding: '12px',
  backgroundColor: '#e6f0ff', // Bleu très clair
  color: '#003366',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '14px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#d0e3ff',
  }
};

const inputGroupStyle = {
  width: '100%',
};

const flexRowStyle = {
  display: 'flex',
  gap: '15px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: '600',
  fontSize: '14px',
  color: '#444',
};

const inputStyle = {
  width: '100%',
  padding: '14px',
  borderRadius: '8px',
  border: '1px solid #e0e0e0',
  fontSize: '15px',
  boxSizing: 'border-box',
  transition: 'border-color 0.3s ease',
  '&:focus': {
    borderColor: '#003366',
    outline: 'none',
  }
};

const selectStyle = {
  ...inputStyle,
  appearance: 'none', // Cache la flèche par défaut
  backgroundColor: 'white',
};

const textareaStyle = {
  ...inputStyle,
  resize: 'vertical', // Permet de redimensionner uniquement en hauteur
};

const radioGroupStyle = {
  display: 'flex',
  gap: '20px',
  marginTop: '10px',
};

const radioOptionStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '15px',
  color: '#555',
  cursor: 'pointer',
};

const actionSectionStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '15px',
  marginTop: '30px',
  paddingTop: '20px',
  borderTop: '1px solid #f0f0f0',
};

const submitButtonStyle = {
  padding: '14px 30px',
  backgroundColor: '#003366', // Bleu Safinpay
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontWeight: '700',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 10px rgba(0, 51, 102, 0.2)',
  '&:hover': {
    backgroundColor: '#004080',
    transform: 'useTranslateY(-2px)',
  }
};

const cancelButtonStyle = {
  padding: '14px 30px',
  backgroundColor: 'white',
  color: '#888',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  fontWeight: '600',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#f4f4f4',
    color: '#444',
  }
};

export default AddProduct_new;