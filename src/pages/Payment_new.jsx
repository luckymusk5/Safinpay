import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Payment_new() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { user } = authContext || { user: null };
  const cartContext = useContext(CartContext);
  const { cartItems, clearCart } = cartContext || { cartItems: [], clearCart: () => {} };

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(true);

  // États du formulaire
  const [formData, setFormData] = useState({
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Côte d'Ivoire",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });

  const [errors, setErrors] = useState({});

  // Calculs
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

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    setOrderLoading(false);
  }, [user, navigate]);

  if (!user || orderLoading) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Chargement...</div>;
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>Paiement</div>
        <h2>Votre panier est vide</h2>
        <p style={{ color: "#666", marginBottom: "2rem" }}>Ajoutez des articles avant de passer commande</p>
        <button className="btn btn-primary" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          Continuer les achats
        </button>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "Prénom requis";
    if (!formData.lastName.trim()) newErrors.lastName = "Nom requis";
    if (!formData.email.trim()) newErrors.email = "Email requis";
    if (!formData.phone.trim()) newErrors.phone = "Téléphone requis";
    if (!formData.address.trim()) newErrors.address = "Adresse requise";
    if (!formData.city.trim()) newErrors.city = "Ville requise";
    if (!formData.postalCode.trim()) newErrors.postalCode = "Code postal requis";

    if (paymentMethod === "card") {
      if (!formData.cardName.trim()) newErrors.cardName = "Nom sur la carte requis";
      if (!formData.cardNumber.replace(/\s/g, "").match(/^\d{13,19}$/)) newErrors.cardNumber = "Numéro de carte invalide";
      if (!formData.expiryDate.match(/^\d{2}\/\d{2}$/)) newErrors.expiryDate = "Format invalide (MM/YY)";
      if (!formData.cvv.match(/^\d{3,4}$/)) newErrors.cvv = "CVV invalide";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s/g, "").replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{4})/g, "$1 ").trim();
    setFormData(prev => ({ ...prev, cardNumber: formattedValue }));
  };

  const handleExpiryChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      const formatted = value.slice(0, 2) + "/" + value.slice(2, 4);
      setFormData(prev => ({ ...prev, expiryDate: formatted }));
    } else {
      setFormData(prev => ({ ...prev, expiryDate: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Créer la commande via l'API
      const orderPayload = {
        items: cartItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity
        }))
      };

      const orderResponse = await api.post("/orders/create_from_cart/", orderPayload);
      const orderId = orderResponse.data.id;

      // Traiter le paiement (simulation)
      const paymentPayload = {
        order_id: orderId,
        amount: total,
        payment_method: paymentMethod,
        customer_info: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postal_code: formData.postalCode,
          country: formData.country
        }
      };

      // Simulation du paiement (en production, vous utiliseriez Stripe, PayPal, etc.)
      console.log("Traitement du paiement:", paymentPayload);

      // Marquer la commande comme payée
      await api.patch(`/orders/${orderId}/update_status/`, {
        status: "processing"
      });

      // Vider le panier
      clearCart();

      // Rediriger vers la confirmation
      navigate(`/order-confirmation/${orderId}`, {
        state: { orderData: orderResponse.data, total }
      });
    } catch (error) {
      console.error("Erreur lors du paiement:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: "#f5f5f5",
      minHeight: "100vh",
      padding: "2rem 0"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
        <h1 style={{ marginBottom: "2rem" }}>Paiement</h1>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 400px",
          gap: "2rem",
          "@media (max-width: 768px)": {
            gridTemplateColumns: "1fr"
          }
        }}>
          {/* Formulaire de paiement */}
          <div style={{ background: "white", padding: "2rem", borderRadius: "8px", border: "1px solid #e0e0e0" }}>
            <form onSubmit={handleSubmit}>
              {/* Informations personnelles */}
              <div style={{ marginBottom: "2rem" }}>
                <h3 style={{ marginBottom: "1.5rem", color: "#333" }}>Informations personnelles</h3>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Prénom</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: errors.firstName ? "2px solid #dc3545" : "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "1rem"
                      }}
                    />
                    {errors.firstName && <p style={{ color: "#dc3545", fontSize: "0.85rem", marginTop: "0.25rem" }}>{errors.firstName}</p>}
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Nom</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: errors.lastName ? "2px solid #dc3545" : "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "1rem"
                      }}
                    />
                    {errors.lastName && <p style={{ color: "#dc3545", fontSize: "0.85rem", marginTop: "0.25rem" }}>{errors.lastName}</p>}
                  </div>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: errors.email ? "2px solid #dc3545" : "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "1rem"
                    }}
                  />
                  {errors.email && <p style={{ color: "#dc3545", fontSize: "0.85rem", marginTop: "0.25rem" }}>{errors.email}</p>}
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Téléphone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+225 XX XX XX XX"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: errors.phone ? "2px solid #dc3545" : "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "1rem"
                    }}
                  />
                  {errors.phone && <p style={{ color: "#dc3545", fontSize: "0.85rem", marginTop: "0.25rem" }}>{errors.phone}</p>}
                </div>
              </div>

              {/* Adresse de livraison */}
              <div style={{ marginBottom: "2rem" }}>
                <h3 style={{ marginBottom: "1.5rem", color: "#333" }}>🏠 Adresse de livraison</h3>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Adresse</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Rue, numéro, etc."
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: errors.address ? "2px solid #dc3545" : "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "1rem"
                    }}
                  />
                  {errors.address && <p style={{ color: "#dc3545", fontSize: "0.85rem", marginTop: "0.25rem" }}>{errors.address}</p>}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Ville</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: errors.city ? "2px solid #dc3545" : "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "1rem"
                      }}
                    />
                    {errors.city && <p style={{ color: "#dc3545", fontSize: "0.85rem", marginTop: "0.25rem" }}>{errors.city}</p>}
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Code postal</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: errors.postalCode ? "2px solid #dc3545" : "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "1rem"
                      }}
                    />
                    {errors.postalCode && <p style={{ color: "#dc3545", fontSize: "0.85rem", marginTop: "0.25rem" }}>{errors.postalCode}</p>}
                  </div>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Pays</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "1rem"
                    }}
                  >
                    <option>Côte d'Ivoire</option>
                    <option>Sénégal</option>
                    <option>Burkina Faso</option>
                    <option>Mali</option>
                    <option>Cameroun</option>
                  </select>
                </div>
              </div>

              {/* Méthode de paiement */}
              <div style={{ marginBottom: "2rem" }}>
                <h3 style={{ marginBottom: "1.5rem", color: "#333" }}>Méthode de paiement</h3>

                <div style={{ display: "grid", gap: "1rem", marginBottom: "1.5rem" }}>
                  <label style={{
                    padding: "1rem",
                    border: paymentMethod === "card" ? "2px solid #007bff" : "1px solid #ddd",
                    borderRadius: "4px",
                    cursor: "pointer",
                    backgroundColor: paymentMethod === "card" ? "#f0f8ff" : "white",
                    transition: "all 0.3s"
                  }}>
                    <input
                      type="radio"
                      name="payment_method"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={{ marginRight: "0.5rem", cursor: "pointer" }}
                    />
                    <span style={{ fontWeight: "600" }}>Carte bancaire</span>
                  </label>

                  <label style={{
                    padding: "1rem",
                    border: paymentMethod === "mobile" ? "2px solid #007bff" : "1px solid #ddd",
                    borderRadius: "4px",
                    cursor: "pointer",
                    backgroundColor: paymentMethod === "mobile" ? "#f0f8ff" : "white",
                    transition: "all 0.3s"
                  }}>
                    <input
                      type="radio"
                      name="payment_method"
                      value="mobile"
                      checked={paymentMethod === "mobile"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={{ marginRight: "0.5rem", cursor: "pointer" }}
                    />
                    <span style={{ fontWeight: "600" }}>Mobile Money (Orange, MTN, Moov)</span>
                  </label>

                  <label style={{
                    padding: "1rem",
                    border: paymentMethod === "transfer" ? "2px solid #007bff" : "1px solid #ddd",
                    borderRadius: "4px",
                    cursor: "pointer",
                    backgroundColor: paymentMethod === "transfer" ? "#f0f8ff" : "white",
                    transition: "all 0.3s"
                  }}>
                    <input
                      type="radio"
                      name="payment_method"
                      value="transfer"
                      checked={paymentMethod === "transfer"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={{ marginRight: "0.5rem", cursor: "pointer" }}
                    />
                    <span style={{ fontWeight: "600" }}>Virement bancaire</span>
                  </label>
                </div>

                {/* Formulaire de carte */}
                {paymentMethod === "card" && (
                  <div style={{ backgroundColor: "#f9f9f9", padding: "1.5rem", borderRadius: "4px" }}>
                    <div style={{ marginBottom: "1rem" }}>
                      <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Nom sur la carte</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        placeholder="JEAN DUPONT"
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          border: errors.cardName ? "2px solid #dc3545" : "1px solid #ddd",
                          borderRadius: "4px",
                          fontSize: "1rem",
                          textTransform: "uppercase"
                        }}
                      />
                      {errors.cardName && <p style={{ color: "#dc3545", fontSize: "0.85rem", marginTop: "0.25rem" }}>{errors.cardName}</p>}
                    </div>

                    <div style={{ marginBottom: "1rem" }}>
                      <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Numéro de carte</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="4532 1234 5678 9010"
                        maxLength="19"
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          border: errors.cardNumber ? "2px solid #dc3545" : "1px solid #ddd",
                          borderRadius: "4px",
                          fontSize: "1rem",
                          letterSpacing: "0.1em",
                          fontFamily: "monospace"
                        }}
                      />
                      {errors.cardNumber && <p style={{ color: "#dc3545", fontSize: "0.85rem", marginTop: "0.25rem" }}>{errors.cardNumber}</p>}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div>
                        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Date d'expiration</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          maxLength="5"
                          style={{
                            width: "100%",
                            padding: "0.75rem",
                            border: errors.expiryDate ? "2px solid #dc3545" : "1px solid #ddd",
                            borderRadius: "4px",
                            fontSize: "1rem",
                            fontFamily: "monospace"
                          }}
                        />
                        {errors.expiryDate && <p style={{ color: "#dc3545", fontSize: "0.85rem", marginTop: "0.25rem" }}>{errors.expiryDate}</p>}
                      </div>

                      <div>
                        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>CVV</label>
                        <input
                          type="password"
                          name="cvv"
                          value={formData.cvv}
                          onChange={(e) => setFormData(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                          placeholder="***"
                          maxLength="4"
                          style={{
                            width: "100%",
                            padding: "0.75rem",
                            border: errors.cvv ? "2px solid #dc3545" : "1px solid #ddd",
                            borderRadius: "4px",
                            fontSize: "1rem",
                            fontFamily: "monospace",
                            letterSpacing: "0.2em"
                          }}
                        />
                        {errors.cvv && <p style={{ color: "#dc3545", fontSize: "0.85rem", marginTop: "0.25rem" }}>{errors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "mobile" && (
                  <div style={{ backgroundColor: "#e8f5e9", padding: "1rem", borderRadius: "4px", color: "#2e7d32", fontSize: "0.9rem" }}>
                    ✓ Vous recevrez un SMS pour confirmer votre paiement via Mobile Money
                  </div>
                )}

                {paymentMethod === "transfer" && (
                  <div style={{ backgroundColor: "#fff3e0", padding: "1rem", borderRadius: "4px", color: "#e65100", fontSize: "0.9rem" }}>
                    Les détails du virement vous seront envoyés par email après confirmation
                  </div>
                )}
              </div>

              {/* Bouton de validation */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "1rem",
                  background: loading ? "#ccc" : "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "background-color 0.3s"
                }}
              >
                {loading ? "Traitement..." : `Payer ${total.toLocaleString()} FCFA`}
              </button>
            </form>
          </div>

          {/* Résumé de la commande */}
          <div style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
            height: "fit-content",
            position: "sticky",
            top: "1rem"
          }}>
            <h3 style={{ marginBottom: "1.5rem", color: "#333" }}>Résumé de la commande</h3>

            {/* Articles */}
            <div style={{ marginBottom: "1rem", maxHeight: "200px", overflowY: "auto" }}>
              {cartItems.map((item, idx) => (
                <div key={idx} style={{ marginBottom: "0.75rem", paddingBottom: "0.75rem", borderBottom: "1px solid #eee" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                    <span>{item.name}</span>
                    <span style={{ fontWeight: "600" }}>x{item.quantity}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#666", fontSize: "0.85rem" }}>
                    <span>{(parseFloat(item.price) || 0).toLocaleString()} FCFA</span>
                    <span style={{ fontWeight: "600", color: "#007bff" }}>
                      {Math.round(parseFloat(item.price) * item.quantity).toLocaleString()} FCFA
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "2px solid #eee", paddingTop: "1rem" }}>
              {/* Subtotal */}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", color: "#666" }}>
                <span>Sous-total</span>
                <span>{subtotal.toLocaleString()} FCFA</span>
              </div>

              {/* TVA (18%) */}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", color: "#666" }}>
                <span>TVA (18%)</span>
                <span>{tax.toLocaleString()} FCFA</span>
              </div>

              {/* Livraison */}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", color: "#666" }}>
                <span>Livraison</span>
                <span style={{ color: shipping === 0 ? "#28a745" : "#dc3545" }}>
                  {shipping === 0 ? "Gratuite" : shipping.toLocaleString() + " FCFA"}
                </span>
              </div>

              {/* Total */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "1rem",
                background: "#f0f8ff",
                borderRadius: "4px",
                fontWeight: "700",
                fontSize: "1.2rem",
                color: "#007bff"
              }}>
                <span>TOTAL</span>
                <span>{total.toLocaleString()} FCFA</span>
              </div>
            </div>

            {/* Informations supplémentaires */}
            <div style={{
              marginTop: "1.5rem",
              padding: "1rem",
              background: "#f5f5f5",
              borderRadius: "4px",
              fontSize: "0.85rem",
              color: "#666",
              lineHeight: "1.6"
            }}>
              <p style={{ margin: "0 0 0.5rem 0" }}>✓ Livraison en 2-5 jours ouvrables</p>
              <p style={{ margin: "0 0 0.5rem 0" }}>✓ Paiement sécurisé</p>
              <p style={{ margin: "0" }}>✓ Satisfait ou remboursé</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
