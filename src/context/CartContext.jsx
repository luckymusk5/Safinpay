import { createContext, useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

const CART_KEY = 'africa_market_cart';
const API_URL = import.meta.env.VITE_API_URL || 'https://safinpaybackend-production.up.railway.app/api';

const mapCartItems = (items = []) => items.map(item => ({
  id: item.product.id,
  name: item.product.name,
  price: parseFloat(item.product.price),
  quantity: item.quantity,
  image: item.product.image,
  seller_id: item.product.seller,
  seller_name: item.product.seller_name
}));

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading: authLoading } = useContext(AuthContext) || { user: null, loading: true };

  // Récupérer le token d'authentification
  const getAuthToken = () => {
    try {
      const token = localStorage.getItem('access_token');
      return token;
    } catch {
      return null;
    }
  };

  const loadCart = useCallback(async () => {
    const token = getAuthToken();
    setIsLoading(true);
    setCartItems([]);

    if (token) {
      try {
        const response = await fetch(`${API_URL}/cart/my_cart/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setCartItems(mapCartItems(data.items || []));
        } else {
          setCartItems([]);
        }
      } catch (err) {
        console.error("Erreur lors du chargement du panier backend:", err);
        setCartItems([]);
      }
    } else {
      setCartItems([]);
    }

    setIsLoading(false);
  }, []);

  // Charger le panier depuis l'API backend (utilisateur connecté = panier protégé)
  useEffect(() => {
    if (!authLoading) {
      loadCart();
    }
  }, [authLoading, user, loadCart]);

  // Écouter les changements du token (connexion/déconnexion)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'access_token') {
        loadCart();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [loadCart]);

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
          const items = mapCartItems(data.items || []);
          setCartItems(items);
          return items;
        } else {
          console.error("Erreur API:", response.status);
          return null;
        }
      } catch (err) {
        console.error("Erreur lors de l'ajout au panier:", err);
        return null;
      }
    }

    return null;
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
          const items = mapCartItems(data.items || []);
          setCartItems(items);
          return items;
        }
      } catch (err) {
        console.error("Erreur lors de la suppression:", err);
        return null;
      }
    }

    return null;
  };

  // Mettre à jour la quantité
  const updateQuantity = async (id, quantity) => {
    const token = getAuthToken();
    const nextQuantity = Math.max(0, parseInt(quantity) || 0);

    if (token) {
      const previousItems = cartItems;

      if (nextQuantity > 0) {
        setCartItems(currentItems => currentItems.map(item => (
          item.id === id ? { ...item, quantity: nextQuantity } : item
        )));
      }

      // Mettre à jour via l'API backend
      try {
        if (nextQuantity <= 0) {
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
              quantity: nextQuantity
            })
          });

          if (response.ok) {
            const data = await response.json();
            const items = mapCartItems(data.items || []);
            setCartItems(items);
            return items;
          }

          setCartItems(previousItems);
          return previousItems;
        }
      } catch (err) {
        console.error("Erreur lors de la mise à jour:", err);
        setCartItems(previousItems);
        return previousItems;
      }
    }

    return null;
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
          return [];
        }
      } catch (err) {
        console.error("Erreur lors du vidage:", err);
        return null;
      }
    } else {
      setCartItems([]);
      return [];
    }

    return null;
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
