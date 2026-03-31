import React, { useState, useRef } from 'react';

const MyReviews_new = () => {
  const fileInputRef = useRef(null);

  // Données initiales (Simulation MCD)
  const [reviews, setReviews] = useState([
    { 
      IdAvis: 1, 
      NomProduit: "Masque de Danse Dogon", 
      ImageProduit: "https://m.media-amazon.com/images/I/71IsS6u06sL._AC_SL1500_.jpg", 
      NoteAvis: 5, 
      TitreAvis: "Qualité Musée",
      CommentaireAvis: "Sculpture impressionnante, les détails sont fidèles aux photos. Une pièce maîtresse.",
      DateEtHeurePosteAvis: new Date().toISOString()
    }
  ]);

  // États du formulaire
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({ NomProduit: '', NoteAvis: 5, TitreAvis: '', CommentaireAvis: '', ImageProduit: '' });
  const [showForm, setShowForm] = useState(false);
  const [hoverStar, setHoverStar] = useState(0); // Pour l'effet chic au survol

  // Gestion de l'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, ImageProduit: imageUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Modification de l'avis existant
      setReviews(reviews.map(r => r.IdAvis === currentId ? { ...formData, IdAvis: currentId, DateEtHeurePosteAvis: r.DateEtHeurePosteAvis } : r));
    } else {
      // Création d'un nouvel avis
      const newEntry = { ...formData, IdAvis: Date.now(), DateEtHeurePosteAvis: new Date().toISOString() };
      setReviews([newEntry, ...reviews]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ NomProduit: '', NoteAvis: 5, TitreAvis: '', CommentaireAvis: '', ImageProduit: '' });
    setShowForm(false);
    setIsEditing(false);
    setCurrentId(null);
    setHoverStar(0);
  };

  const startEdit = (review) => {
    setFormData({ 
      NomProduit: review.NomProduit, 
      NoteAvis: review.NoteAvis, 
      TitreAvis: review.TitreAvis, 
      CommentaireAvis: review.CommentaireAvis, 
      ImageProduit: review.ImageProduit 
    });
    setCurrentId(review.IdAvis);
    setIsEditing(true);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet avis ?")) {
      setReviews(reviews.filter(r => r.IdAvis !== id));
    }
  };

  // Composant interne pour les étoiles interactives
  const StarRating = ({ currentRating, isInteractive }) => (
    <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span 
          key={star}
          onClick={() => isInteractive && setFormData({...formData, NoteAvis: star})}
          onMouseEnter={() => isInteractive && setHoverStar(star)}
          onMouseLeave={() => isInteractive && setHoverStar(0)}
          style={{
            cursor: isInteractive ? 'pointer' : 'default',
            fontSize: isInteractive ? '32px' : '18px',
            color: star <= (isInteractive ? (hoverStar || formData.NoteAvis) : currentRating) ? '#bfa071' : '#e0e0e0',
            transition: 'transform 0.1s, color 0.1s'
          }}
        >
          ★
        </span>
      ))}
    </div>
  );

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        
        {/* HEADER */}
        <div style={headerStyle}>
          <h1 style={titleStyle}>Vos Avis Safinpay</h1>
          {!showForm && (
            <button onClick={() => setShowForm(true)} style={addBtnStyle}>
              + Écrire un avis
            </button>
          )}
        </div>

        {/* FORMULAIRE D'ÉDITION / AJOUT */}
        {showForm && (
          <div style={formCardStyle}>
            <h2 style={{marginTop: 0, color: '#003366', fontSize: '20px'}}>
              {isEditing ? "Modifier mon avis" : "Créer un nouvel avis"}
            </h2>
            <form onSubmit={handleSubmit}>
              
              <label style={labelStyle}>Quel produit avez-vous acheté ?</label>
              <input style={inputStyle} value={formData.NomProduit} onChange={(e) => setFormData({...formData, NomProduit: e.target.value})} placeholder="Ex: Tissu Kenté..." required />

              <label style={labelStyle}>Note globale</label>
              <StarRating currentRating={formData.NoteAvis} isInteractive={true} />

              <div style={{marginTop: '20px'}}>
                <label style={labelStyle}>Photo du produit</label>
                <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px'}}>
                  <button type="button" onClick={() => fileInputRef.current.click()} style={imageBtnStyle}>📷 Charger une photo</button>
                  <input type="file" ref={fileInputRef} onChange={handleImageChange} style={{display: 'none'}} accept="image/*" />
                  {formData.ImageProduit && (
                    <img src={formData.ImageProduit} alt="preview" style={{width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #ddd'}} />
                  )}
                </div>
              </div>

              <label style={labelStyle}>Titre de votre avis</label>
              <input style={inputStyle} value={formData.TitreAvis} onChange={(e) => setFormData({...formData, TitreAvis: e.target.value})} placeholder="Le résumé en un clin d'œil" required />

              <label style={labelStyle}>Votre commentaire détaillé</label>
              <textarea style={{...inputStyle, height: '120px', resize: 'vertical'}} value={formData.CommentaireAvis} onChange={(e) => setFormData({...formData, CommentaireAvis: e.target.value})} placeholder="Qu'avez-vous aimé ou moins aimé ?" required />

              <div style={{display: 'flex', gap: '15px'}}>
                <button type="submit" style={submitBtnStyle}>{isEditing ? "Enregistrer les modifications" : "Publier l'avis"}</button>
                <button type="button" onClick={resetForm} style={cancelBtnStyle}>Annuler</button>
              </div>
            </form>
          </div>
        )}

        {/* LISTE DES AVIS (STYLE AMAZON) */}
        <div style={{marginTop: '30px'}}>
          {reviews.length === 0 ? (
             <div style={emptyStateStyle}>Vous n'avez pas encore partagé d'avis sur vos achats.</div>
          ) : (
            reviews.map((rev) => (
              <div key={rev.IdAvis} style={reviewCardStyle}>
                {/* Colonne Produit (Image à gauche comme Amazon) */}
                <div style={productCol}>
                  <img src={rev.ImageProduit || "https://via.placeholder.com/100"} alt="produit" style={productImg} />
                  <p style={productName}>{rev.NomProduit}</p>
                </div>

                {/* Colonne Contenu */}
                <div style={contentCol}>
                  <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                    <StarRating currentRating={rev.NoteAvis} isInteractive={false} />
                    <strong style={{fontSize: '16px', color: '#111', marginTop: '5px'}}>{rev.TitreAvis}</strong>
                  </div>
                  <p style={dateText}>Avis vérifié • {new Date(rev.DateEtHeurePosteAvis).toLocaleDateString()}</p>
                  <p style={commentText}>{rev.CommentaireAvis}</p>
                  
                  {/* ACTIONS */}
                  <div style={actionRow}>
                    <button onClick={() => startEdit(rev)} style={editBtn}>Modifier</button>
                    <span style={{color: '#ddd'}}>|</span>
                    <button onClick={() => handleDelete(rev.IdAvis)} style={deleteBtn}>Supprimer</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// --- STYLES SAFINPAY STUDIO ---

const pageStyle = { backgroundColor: '#f9fafb', minHeight: '100vh', padding: '40px 20px', fontFamily: "'Inter', sans-serif" };
const containerStyle = { maxWidth: '900px', margin: '0 auto' };
const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #e5e7eb', paddingBottom: '20px' };
const titleStyle = { color: '#003366', margin: 0, fontWeight: '800', fontSize: '28px', letterSpacing: '-0.5px' };
const addBtnStyle = { backgroundColor: '#003366', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: '0.2s' };

const formCardStyle = { backgroundColor: 'white', padding: '35px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', marginBottom: '40px', border: '1px solid #f0f0f0' };
const labelStyle = { display: 'block', fontWeight: '700', marginBottom: '8px', fontSize: '14px', color: '#374151' };
const inputStyle = { width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #d1d5db', boxSizing: 'border-box', marginBottom: '18px', fontSize: '15px', outlineColor: '#bfa071' };
const imageBtnStyle = { backgroundColor: '#f3f4f6', border: '1px solid #d1d5db', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' };

const submitBtnStyle = { backgroundColor: '#003366', color: 'white', border: 'none', padding: '15px 30px', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', flex: 1, fontSize: '16px' };
const cancelBtnStyle = { backgroundColor: '#f3f4f6', color: '#4b5563', border: 'none', padding: '15px 30px', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', flex: 1 };

const reviewCardStyle = { display: 'flex', backgroundColor: 'white', padding: '25px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #e5e7eb', gap: '30px', transition: 'transform 0.2s' };
const productCol = { flex: '0 0 120px', textAlign: 'center' };
const productImg = { width: '110px', height: '110px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' };
const productName = { fontSize: '12px', color: '#6b7280', marginTop: '12px', fontWeight: '600', lineHeight: '1.4' };

const contentCol = { flex: 1 };
const dateText = { fontSize: '12px', color: '#9ca3af', margin: '4px 0 15px 0' };
const commentText = { fontSize: '15px', color: '#374151', lineHeight: '1.7', margin: 0 };
const actionRow = { marginTop: '20px', display: 'flex', gap: '15px', alignItems: 'center' };
const editBtn = { background: 'none', border: 'none', color: '#003366', cursor: 'pointer', fontSize: '13px', fontWeight: '700' };
const deleteBtn = { background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '13px', fontWeight: '700' };
const emptyStateStyle = { textAlign: 'center', padding: '60px', backgroundColor: 'white', borderRadius: '15px', color: '#9ca3af', fontStyle: 'italic', border: '2px dashed #e5e7eb' };

export default MyReviews_new;