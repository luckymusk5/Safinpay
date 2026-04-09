// Fichier d'intégration pour le frontend React/Vue
// À utiliser dans vos composants pour communiquer avec l'API Flask

import axios from 'axios';

// Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Créer une instance axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Intercepteur pour les erreurs
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('Erreur API:', error);
    return Promise.reject(error);
  }
);

// ==================== PRODUITS ====================
export const productAPI = {
  // Récupère tous les produits
  getAllProducts: async () => {
    try {
      const response = await apiClient.get('/produits');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Récupère un produit spécifique
  getProductById: async (idproduit) => {
    try {
      const response = await apiClient.get(`/produit/${idproduit}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Recherche de produits
  searchProducts: async (query) => {
    try {
      const response = await apiClient.get('/produits/recherche', {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Produits par catégorie
  getProductsByCategory: async (idcategorie) => {
    try {
      const response = await apiClient.get(`/produits/categorie/${idcategorie}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// ==================== CATÉGORIES ====================
export const categoryAPI = {
  // Toutes les catégories
  getAllCategories: async () => {
    try {
      const response = await apiClient.get('/categories');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Une catégorie spécifique
  getCategoryById: async (idcategorie) => {
    try {
      const response = await apiClient.get(`/categorie/${idcategorie}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// ==================== BOUTIQUES ====================
export const shopAPI = {
  // Toutes les boutiques
  getAllShops: async () => {
    try {
      const response = await apiClient.get('/boutiques');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Une boutique spécifique
  getShopById: async (idboutique) => {
    try {
      const response = await apiClient.get(`/boutique/${idboutique}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Boutiques d'un vendeur
  getShopsByVendor: async (idvendeur) => {
    try {
      const response = await apiClient.get(`/boutiques/vendeur/${idvendeur}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// ==================== CLIENTS ====================
export const clientAPI = {
  // Infos client
  getClientInfo: async (idclient) => {
    try {
      const response = await apiClient.get(`/client/${idclient}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Adresses du client
  getClientAddresses: async (idclient) => {
    try {
      const response = await apiClient.get(`/client/${idclient}/adresses`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// ==================== PANIER ====================
export const cartAPI = {
  // Récupère le panier
  getCart: async (idpanier) => {
    try {
      const response = await apiClient.get(`/panier/${idpanier}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Ajoute au panier
  addToCart: async (idpanier, idproduit, quantite) => {
    try {
      const response = await apiClient.post('/panier', {
        idpanier,
        idproduit,
        quantite
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// ==================== COMMANDES ====================
export const orderAPI = {
  // Commandes du client
  getClientOrders: async (idclient) => {
    try {
      const response = await apiClient.get(`/commandes/client/${idclient}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Détail d'une commande
  getOrderDetails: async (codecommande) => {
    try {
      const response = await apiClient.get(`/commande/${codecommande}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// ==================== AVIS ====================
export const reviewAPI = {
  // Avis d'un produit
  getProductReviews: async (idproduit) => {
    try {
      const response = await apiClient.get(`/produit/${idproduit}/avis`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Créer un avis
  createReview: async (avisData) => {
    try {
      const response = await apiClient.post('/avis', avisData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// ==================== VENDEURS ====================
export const vendorAPI = {
  // Infos vendeur
  getVendorInfo: async (idvendeur) => {
    try {
      const response = await apiClient.get(`/vendeur/${idvendeur}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// ==================== LIVREURS ====================
export const deliveryAPI = {
  // Infos livreur
  getDeliveryPersonInfo: async (idlivreur) => {
    try {
      const response = await apiClient.get(`/livreur/${idlivreur}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// ==================== PAIEMENT ====================
export const paymentAPI = {
  // Paiements du client
  getClientPayments: async (idclient) => {
    try {
      const response = await apiClient.get(`/payements/client/${idclient}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// ==================== SANTÉ ====================
export const healthAPI = {
  // Vérifier la connexion
  checkHealth: async () => {
    try {
      const response = await apiClient.get('/../health');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Export de l'instance axios
export default apiClient;

// ==================== EXEMPLES D'UTILISATION ====================
//
// Dans un composant React:
//
// import { productAPI, cartAPI } from './api-client';
//
// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//
//   useEffect(() => {
//     productAPI.getAllProducts()
//       .then(setProducts)
//       .catch(error => console.error(error));
//   }, []);
//
//   return (
//     <div>
//       {products.map(product => (
//         <ProductCard key={product.IDPRODUIT} product={product} />
//       ))}
//     </div>
//   );
// };
//
// Recherche:
//
// const SearchResults = ({ query }) => {
//   const [results, setResults] = useState([]);
//
//   useEffect(() => {
//     productAPI.searchProducts(query)
//       .then(setResults)
//       .catch(error => console.error(error));
//   }, [query]);
//
//   return <div>{results.map(r => <div>{r.NOMPRODUIT}</div>)}</div>;
// };
//
// Ajouter au panier:
//
// const handleAddToCart = async (idproduit, quantity) => {
//   try {
//     await cartAPI.addToCart('USER_CART_ID', idproduit, quantity);
//     alert('Produit ajouté au panier!');
//   } catch (error) {
//     console.error('Erreur:', error);
//   }
// };
//
// =============================================================================
