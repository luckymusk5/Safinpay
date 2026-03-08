import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CART_KEY = 'africa_market_cart';
const API_URL = 'http://127.0.0.1:8000/api';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Récupérer le token d'authentification
  const getAuthToken = () => {
    try {
      const token = localStorage.getItem('access_token');
      return token;
    } catch {
      return null;
    }
  };

  // Charger le panier depuis l'API backend (utilisateur connecté = panier protégé)
  useEffect(() => {
    const loadCart = async () => {
      const token = getAuthToken();
      
      if (token) {
        // Utilisateur connecté - charger depuis le backend
        try {
          const response = await fetch(`${API_URL}/cart/my_cart/`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            // Transformer la réponse API en format interne
            const items = (data.items || []).map(item => ({
              id: item.product.id,
              name: item.product.name,
              price: parseFloat(item.product.price),
              quantity: item.quantity,
              image: item.product.image,
              seller_id: item.product.seller,
              seller_name: item.product.seller_name
            }));
            setCartItems(items);
          }
        } catch (err) {
          console.error("Erreur lors du chargement du panier backend:", err);
        }
      } else {
        // Utilisateur non connecté - pas de panier (route protégée)
        setCartItems([]);
      }
      
      setIsLoading(false);
    };

    loadCart();

    // Écouter les changements du token (connexion/déconnexion)
    const handleStorageChange = (e) => {
      if (e.key === 'access_token') {
        loadCart();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Sauvegarder SEULEMENT en API backend (panier privé par utilisateur)
  useEffect(() => {
    // Les données sont déjà sauvegardées par les appels API
    // Aucune sauvegarde locale nécessaire pour les utilisateurs connectés
  }, [cartItems, isLoading]);

  // Ajouter un produit au panier
  const addToCart = async (product, quantity = 1) => {
    const token = getAuthToken();

    if (token) {
      // Ajouter via l'API backend (utilisateur connecté)
      try {
        const response = await fetch(`${API_URL}/cart/add_item/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            product_id: product.id,
            quantity: quantity
          })
        });

        if (response.ok) {
          const data = await response.json();
          // Mettre à jour l'état avec la réponse du serveur
          const items = (data.items || []).map(item => ({
            id: item.product.id,
            name: item.product.name,
            price: parseFloat(item.product.price),
            quantity: item.quantity,
            image: item.product.image,
            seller_id: item.product.seller,
            seller_name: item.product.seller_name
          }));
          setCartItems(items);
        } else {
          console.error("Erreur API:", response.status);
        }
      } catch (err) {
        console.error("Erreur lors de l'ajout au panier:", err);
      }
    }
  };

  // Supprimer un produit du panier
  const removeFromCart = async (id) => {
    const token = getAuthToken();

    if (token) {
      // Supprimer via l'API backend
      try {
        const response = await fetch(`${API_URL}/cart/remove_item/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ product_id: id })
        });

        if (response.ok) {
          const data = await response.json();
          const items = (data.items || []).map(item => ({
            id: item.product.id,
            name: item.product.name,
            price: parseFloat(item.product.price),
            quantity: item.quantity,
            image: item.product.image,
            seller_id: item.product.seller,
            seller_name: item.product.seller_name
          }));
          setCartItems(items);
        }
      } catch (err) {
        console.error("Erreur lors de la suppression:", err);
      }
    }
  };

  // Mettre à jour la quantité
  const updateQuantity = async (id, quantity) => {
    const token = getAuthToken();

    if (token) {
      // Mettre à jour via l'API backend
      try {
        if (quantity <= 0) {
          // Supprimer si quantité <= 0
          await removeFromCart(id);
        } else {
          const response = await fetch(`${API_URL}/cart/update_item/`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              product_id: id,
              quantity: quantity
            })
          });

          if (response.ok) {
            const data = await response.json();
            const items = (data.items || []).map(item => ({
              id: item.product.id,
              name: item.product.name,
              price: parseFloat(item.product.price),
              quantity: item.quantity,
              image: item.product.image,
              seller_id: item.product.seller,
              seller_name: item.product.seller_name
            }));
            setCartItems(items);
          }
        }
      } catch (err) {
        console.error("Erreur lors de la mise à jour:", err);
      }
    }
  };

  // Vider le panier
  const clearCart = async () => {
    const token = getAuthToken();

    if (token) {
      // Vider via l'API backend
      try {
        const response = await fetch(`${API_URL}/cart/clear/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          setCartItems([]);
        }
      } catch (err) {
        console.error("Erreur lors du vidage:", err);
      }
    } else {
      setCartItems([]);
    }
  };

  // Calculer le total
  const getTotal = () => {
    return Math.round(cartItems.reduce((sum, item) => {
      const price = parseFloat(item?.price) || 0;
      const quantity = parseInt(item?.quantity) || 1;
      return sum + (price * quantity);
    }, 0));
  };

  // Obtenir le nombre d'articles
  const getCartCount = () => {
    return cartItems.reduce((sum, item) => sum + (parseInt(item?.quantity) || 1), 0);
  };

  return (
    <CartContext.Provider
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart,
        updateQuantity,
        clearCart, 
        getTotal,
        getCartCount,
        isLoading
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
