import React from 'react';
import { Link } from 'react-router-dom';

const PageErreur = () => {
  return (
    <div style={{ 
      padding: "100px 20px", 
      textAlign: "center", 
      minHeight: "400px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <h1 style={{ fontSize: "64px", color: "#333" }}>404</h1>
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Oups ! Page introuvable</h2>
      <p style={{ marginBottom: "30px", color: "#666" }}>
        Désolé, la page que vous recherchez sur Safinpay n'existe pas ou a été déplacée.
      </p>
      <Link to="/" style={{ 
        padding: "10px 25px", 
        backgroundColor: "#003366", // Couleur bleu Safinpay
        color: "white", 
        textDecoration: "none",
        borderRadius: "5px",
        fontWeight: "bold"
      }}>
        Retourner à l'accueil
      </Link>
    </div>
  );
};

export default PageErreur;