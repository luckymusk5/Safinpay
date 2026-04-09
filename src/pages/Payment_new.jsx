import { useContext, useState, useEffect, useMemo } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const BACKEND_ORIGIN = import.meta.env.VITE_BACKEND_ORIGIN || "https://safinpaybackend-production.up.railway.app";
const WORLD_MAP_URL = "https://www.openstreetmap.org/export/embed.html?bbox=-180%2C-60%2C180%2C85&layer=mapnik";

function formatMoney(amount, currency) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "XOF" ? 0 : 2,
  }).format(Number(amount) || 0);
}

function buildReceiptUrl(orderId, payload) {
  const params = new URLSearchParams();
  params.set("buyer", payload.buyer || "");
  params.set("email", payload.email || "");
  params.set("payment_method", payload.paymentMethod || "");
  params.set("currency", payload.currency || "XOF");
  params.set("fx_rate", String(payload.fxRate || 1));
  params.set("amount_fcfa", String(payload.amountFcfa || 0));
  params.set("amount_local", String(payload.amountLocal || 0));
  params.set("shipping_country", payload.shippingCountry || "");
  params.set("paid_at", payload.paidAt || "");
  params.set("items", JSON.stringify(payload.items || []));
  return `${BACKEND_ORIGIN}/api/receipts/${orderId}.pdf?${params.toString()}`;
}

export default function Payment_new() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { user } = authContext || { user: null };
  const cartContext = useContext(CartContext);
  const { cartItems, clearCart } = cartContext || { cartItems: [], clearCart: () => {} };

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(true);
  const [fxRates, setFxRates] = useState({});
  const [fxLoading, setFxLoading] = useState(true);
  const [fxError, setFxError] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("XOF");

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
  const exchangeRate = selectedCurrency === "XOF" ? 1 : fxRates[selectedCurrency] || 0;
  const convertedTotal = useMemo(() => {
    if (selectedCurrency === "XOF") return total;
    if (!exchangeRate) return 0;
    return Math.round(total * exchangeRate * 100) / 100;
  }, [selectedCurrency, exchangeRate, total]);

  const availableCurrencies = useMemo(() => {
    const currencies = Object.keys(fxRates || {}).filter((code) => code !== "XOF").sort();
    return ["XOF", ...currencies];
  }, [fxRates]);

  useEffect(() => {
    let cancelled = false;

    const loadRates = async () => {
      setFxLoading(true);
      setFxError("");
      try {
        const response = await fetch("https://open.er-api.com/v6/latest/XOF");
        const data = await response.json();
        if (!response.ok || data?.result !== "success" || !data?.rates) {
          throw new Error("Impossible de charger les taux de change");
        }
        if (!cancelled) {
          setFxRates({ ...data.rates, XOF: 1 });
        }
      } catch (error) {
        console.error("Erreur taux de change:", error);
        if (!cancelled) {
          setFxError("Les taux de change en temps réel sont temporairement indisponibles.");
          setFxRates((current) => (current.XOF ? current : { XOF: 1 }));
        }
      } finally {
        if (!cancelled) {
          setFxLoading(false);
        }
      }
    };

    loadRates();
    const timer = window.setInterval(loadRates, 5 * 60 * 1000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

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
        amount_local: convertedTotal,
        currency: selectedCurrency,
        exchange_rate: exchangeRate || 1,
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

      const paidAt = new Date().toLocaleString("fr-FR");
      const receiptUrl = buildReceiptUrl(orderId, {
        buyer: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        paymentMethod,
        currency: selectedCurrency,
        fxRate: exchangeRate || 1,
        amountFcfa: total,
        amountLocal: convertedTotal,
        shippingCountry: formData.country,
        paidAt,
        items: cartItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: parseFloat(item.price) || 0,
        })),
      });

      // Marquer la commande comme payée
      await api.patch(`/orders/${orderId}/update_status/`, {
        status: "processing"
      });

      // Vider le panier
      clearCart();

      // Rediriger vers la confirmation
      navigate(`/order-confirmation/${orderId}`, {
        state: {
          orderData: orderResponse.data,
          total,
          selectedCurrency,
          exchangeRate: exchangeRate || 1,
          convertedTotal,
          receiptUrl,
          receiptPayload: {
            buyer: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            paymentMethod,
            currency: selectedCurrency,
            fxRate: exchangeRate || 1,
            amountFcfa: total,
            amountLocal: convertedTotal,
            shippingCountry: formData.country,
            paidAt,
            items: cartItems.map((item) => ({
              name: item.name,
              quantity: item.quantity,
              price: parseFloat(item.price) || 0,
            })),
          }
        }
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

                <div style={{
                  marginTop: "1.5rem",
                  padding: "1.25rem",
                  borderRadius: "12px",
                  border: "1px solid #d7e3f2",
                  background: "linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)"
                }}>
                  <h3 style={{ margin: "0 0 0.75rem", color: "#1b3a6b" }}>Taux de change en temps réel</h3>
                  <p style={{ margin: "0 0 1rem", color: "#667085", fontSize: "0.92rem", lineHeight: 1.6 }}>
                    Les paiements étrangers et locaux utilisent le taux actuel, afin d’éviter une valeur fixe qui devient vite fausse quand les monnaies évoluent.
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Devise de paiement</label>
                      <select
                        value={selectedCurrency}
                        onChange={(e) => setSelectedCurrency(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                          fontSize: "1rem"
                        }}
                      >
                        {availableCurrencies.map((currency) => (
                          <option key={currency} value={currency}>
                            {currency}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Total converti</label>
                      <div style={{
                        width: "100%",
                        padding: "0.9rem 0.85rem",
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                        background: "#f8fafc",
                        fontWeight: 700,
                        color: "#1b3a6b"
                      }}>
                        {selectedCurrency === "XOF" ? formatMoney(total, "XOF") : `${convertedTotal.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${selectedCurrency}`}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", alignItems: "start" }}>
                    <div style={{ fontSize: "0.9rem", color: "#475467", lineHeight: 1.6 }}>
                      <p style={{ margin: "0 0 0.35rem" }}>
                        <strong>Taux actuel :</strong> {fxLoading ? "chargement..." : selectedCurrency === "XOF" ? "1 XOF = 1 XOF" : `1 XOF = ${(exchangeRate || 0).toFixed(6)} ${selectedCurrency}`}
                      </p>
                      <p style={{ margin: "0 0 0.35rem" }}>
                        <strong>Total FCFA :</strong> {formatMoney(total, "XOF")}
                      </p>
                      {selectedCurrency !== "XOF" && (
                        <p style={{ margin: 0 }}>
                          <strong>Équivalent devise :</strong> {convertedTotal.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {selectedCurrency}
                        </p>
                      )}
                      {fxError && <p style={{ margin: "0.6rem 0 0", color: "#b42318" }}>{fxError}</p>}
                    </div>

                    <div style={{
                      background: "#0f172a",
                      color: "white",
                      borderRadius: "12px",
                      padding: "1rem",
                      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)"
                    }}>
                      <p style={{ margin: 0, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", opacity: 0.78 }}>
                        Paiement international
                      </p>
                      <p style={{ margin: "0.45rem 0 0", lineHeight: 1.6 }}>
                        Le système peut encaisser depuis l’étranger ou ici, et recalculera le montant selon le taux live choisi.
                      </p>
                    </div>
                  </div>
                </div>
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
                {loading ? "Traitement..." : `Payer ${selectedCurrency === "XOF" ? total.toLocaleString() + " FCFA" : `${convertedTotal.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${selectedCurrency}`}`}
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
                <span>{formatMoney(total, "XOF")}</span>
              </div>

              {selectedCurrency !== "XOF" && (
                <div style={{
                  marginTop: "0.75rem",
                  padding: "0.85rem 1rem",
                  background: "#f8fafc",
                  borderRadius: "4px",
                  border: "1px dashed #cfd8e3",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "1rem",
                  color: "#344054",
                  fontWeight: 600
                }}>
                  <span>Total converti</span>
                  <span>{convertedTotal.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {selectedCurrency}</span>
                </div>
              )}
            </div>

            <div style={{ marginTop: "1.5rem" }}>
              <h4 style={{ margin: "0 0 0.75rem", color: "#333" }}>Carte mondiale OpenStreetMap</h4>
              <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid #e0e0e0" }}>
                <iframe
                  title="Carte mondiale OpenStreetMap"
                  src={WORLD_MAP_URL}
                  style={{ width: "100%", height: "260px", border: 0 }}
                  loading="lazy"
                />
              </div>
              <p style={{ margin: "0.75rem 0 0", color: "#666", fontSize: "0.85rem", lineHeight: 1.6 }}>
                Vue mondiale pour situer le service et le paiement international. Le reçu PDF sera accessible après confirmation.
              </p>
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
