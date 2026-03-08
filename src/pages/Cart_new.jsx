import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext) || {
    cartItems: [],
    removeFromCart: () => {},
    updateQuantity: () => {},
    clearCart: () => {}
  };

  const [forceUpdate, setForceUpdate] = useState(0);
  const authContext = useContext(AuthContext);
  const { user } = authContext || { user: null };

  // Actualiser les calculs toutes les secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setForceUpdate(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculs du total
  const subtotal = Math.round(
    (cartItems || []).reduce((sum, item) => {
      const price = parseFloat(item?.price) || 0;
      const qty = parseInt(item?.quantity) || 1;
      return sum + (price * qty);
    }, 0)
  );
  
  const shipping = subtotal > 500000 ? 0 : 5000;
  const tax = Math.round(subtotal * 0.18);
  const total = Math.round(subtotal + shipping + tax);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>Panier</div>
        <h2>Votre panier est vide</h2>
        <p style={{ color: "#666", marginBottom: "2rem" }}>Ajoutez des articles pour commencer vos achats</p>
        <Link to="/" className="btn btn-primary">Continuer vos achats</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Panier d'achat</h1>
      
      <div className="cart-layout">
        {/* Items */}
        <div className="cart-items">
          <div style={{ marginBottom: "1rem", color: "#666" }}>
            {cartItems.length} article{cartItems.length > 1 ? "s" : ""} dans votre panier
          </div>

          {cartItems.map((item) => {
            const itemId = item?.id;
            const itemPrice = parseFloat(item?.price) || 0;
            const itemQuantity = Math.max(1, parseInt(item?.quantity) || 1);
            const itemSubtotal = Math.round(itemPrice * itemQuantity);
            
            if (!itemId) return null;
            
            return (
              <div key={`item-${itemId}`} className="cart-item" style={{ transition: "all 0.3s ease" }}>
                <img
                  src={item?.image || "/placeholder.png"}
                  alt={item?.name || "Produit"}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{item?.name || "Sans nom"}</h3>
                  <p className="cart-item-seller">Vendu par : {item?.seller_name || "SafinPay"}</p>
                  <div style={{ color: "#00a699", fontWeight: "600", marginTop: "0.5rem" }}>
                    Livraison gratuite
                  </div>
                  <p style={{ marginTop: "0.75rem", fontWeight: "600", color: "#007bff", fontSize: "1.1rem" }}>
                    Prix unitaire : {itemPrice.toLocaleString()} FCFA
                  </p>
                  <div style={{ marginTop: "0.75rem", display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                    <span style={{ color: "#666" }}>Quantité : <strong style={{ fontSize: "1.1rem", color: "#007bff" }}>{itemQuantity}</strong></span>
                    <span style={{ color: "#28a745", fontWeight: "600", fontSize: "1.1rem" }}>
                      = <strong>{itemSubtotal.toLocaleString()}</strong> FCFA
                    </span>
                  </div>
                </div>
                <div className="cart-item-controls">
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(itemId, Math.max(1, itemQuantity - 1))}>-</button>
                    <input
                      type="number"
                      value={itemQuantity}
                      onChange={(e) => updateQuantity(itemId, Math.max(1, parseInt(e.target.value) || 1))}
                      className="quantity-input"
                      min="1"
                    />
                    <button onClick={() => updateQuantity(itemId, itemQuantity + 1)}>+</button>
                  </div>
                  <button className="btn-remove" onClick={() => removeFromCart(itemId)}>
                    Supprimer
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Résumé */}
        <div className="cart-summary" style={{ transition: "all 0.3s ease" }}>
          <div className="cart-summary-title">Résumé de la commande</div>

          <div className="summary-line">
            <span>Sous-total ({cartItems?.length || 0} article{(cartItems?.length || 0) > 1 ? "s" : ""}) :</span>
            <span style={{ fontWeight: "600" }}>{(subtotal || 0).toLocaleString()} FCFA</span>
          </div>

          <div className="summary-line">
            <span>Frais de port :</span>
            <span style={{ fontWeight: "600" }}>
              {shipping === 0 ? "🎉 GRATUIT" : (shipping || 0).toLocaleString() + " FCFA"}
            </span>
          </div>

          <div className="summary-line">
            <span>Taxes estimées :</span>
            <span style={{ fontWeight: "600" }}>{(tax || 0).toLocaleString()} FCFA</span>
          </div>

          <div className="summary-line total">
            <span style={{ fontSize: "1.1rem" }}>Total :</span>
            <span style={{ fontWeight: "600", fontSize: "1.3rem", color: "#d9534f" }}>
              {(total || 0).toLocaleString()} FCFA
            </span>
          </div>

          <button 
            className="btn-checkout" 
            disabled={!user}
            onClick={() => user && navigate("/payment")}
            style={{ cursor: user ? "pointer" : "not-allowed" }}
          >
            {user ? "Procéder au paiement" : "Se connecter pour payer"}
          </button>
          <button className="btn btn-secondary btn-block" style={{ marginTop: "0.75rem" }} onClick={clearCart}>
            Vider le panier
          </button>

          <div style={{ marginTop: "1.5rem", fontSize: "0.85rem", color: "#666" }}>
            <p style={{ marginBottom: "0.5rem" }}>✓ Livraison gratuite pour les commandes supérieures à 500,000 FCFA</p>
            <p>✓ Retours gratuits pendant 30 jours</p>
          </div>
        </div>
      </div>
    </div>
  );
}
