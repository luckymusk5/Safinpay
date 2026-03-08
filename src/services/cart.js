// Service de gestion du panier

const CART_KEY = 'africa_market_cart';

class CartService {
  /**
   * Récupérer le panier complet
   */
  static getCart() {
    try {
      const cart = localStorage.getItem(CART_KEY);
      return cart ? JSON.parse(cart) : [];
    } catch (err) {
      console.error("Erreur lors de la lecture du panier:", err);
      return [];
    }
  }

  /**
   * Ajouter un produit au panier
   */
  static addToCart(product, quantity = 1) {
    try {
      const cart = this.getCart();
      
      // Vérifier si le produit existe déjà
      const existingItem = cart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Augmenter la quantité
        existingItem.quantity += quantity;
      } else {
        // Ajouter le nouveau produit
        cart.push({
          id: product.id,
          name: product.name || product.nom,
          price: product.price || product.prix,
          image: product.image,
          seller_id: product.seller_id,
          seller_name: product.seller_name || product.seller_shop_name,
          quantity: quantity,
          addedAt: new Date().toISOString()
        });
      }
      
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      return true;
    } catch (err) {
      console.error("Erreur lors de l'ajout au panier:", err);
      return false;
    }
  }

  /**
   * Supprimer un produit du panier
   */
  static removeFromCart(productId) {
    try {
      const cart = this.getCart();
      const filtered = cart.filter(item => item.id !== productId);
      localStorage.setItem(CART_KEY, JSON.stringify(filtered));
      return true;
    } catch (err) {
      console.error("Erreur lors de la suppression du panier:", err);
      return false;
    }
  }

  /**
   * Mettre à jour la quantité d'un produit
   */
  static updateQuantity(productId, quantity) {
    try {
      const cart = this.getCart();
      const item = cart.find(item => item.id === productId);
      
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(productId);
        } else {
          item.quantity = quantity;
          localStorage.setItem(CART_KEY, JSON.stringify(cart));
        }
      }
      return true;
    } catch (err) {
      console.error("Erreur lors de la mise à jour:", err);
      return false;
    }
  }

  /**
   * Vider le panier
   */
  static clearCart() {
    try {
      localStorage.removeItem(CART_KEY);
      return true;
    } catch (err) {
      console.error("Erreur lors du vidage du panier:", err);
      return false;
    }
  }

  /**
   * Compter les articles du panier
   */
  static getCartCount() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  /**
   * Calculer le total du panier
   */
  static getCartTotal() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  /**
   * Obtenir les statistiques du panier
   */
  static getCartStats() {
    const cart = this.getCart();
    return {
      itemCount: cart.length,
      totalQuantity: this.getCartCount(),
      totalPrice: this.getCartTotal()
    };
  }
}

export default CartService;
