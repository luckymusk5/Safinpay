import { Link } from "react-router-dom";
import AsyncProductImage from "./AsyncProductImage";

const BACKEND_ORIGIN = import.meta.env.VITE_BACKEND_ORIGIN || "https://safinpaybackend-production.up.railway.app";

export default function ProductCard({ product }) {
  let imageUrl = product.image;
  
  // Gérer les images du backend - ajouter la base URL si ce n'est pas une URL complète
  if (!imageUrl && product.images && Array.isArray(product.images) && product.images.length > 0) {
    imageUrl = product.images[0];
  }
  
  if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('data:')) {
    imageUrl = `${BACKEND_ORIGIN}${imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl}`;
  }

  return (
    <div className="product-card">
      {/* Image du produit */}
      <AsyncProductImage
        src={imageUrl}
        productId={product.id}
        alt={product.name || "Produit"}
        baseUrl={BACKEND_ORIGIN}
        className="product-image"
        style={{ objectFit: "cover" }}
        wrapperStyle={{ width: "100%", height: "200px" }}
      />

      {/* Contenu */}
      <div className="p-4">
        <h2 className="product-title">
          {product.name}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>
        <p className="product-price">{product.price} FCFA</p>

        {/* Boutons */}
        <div className="flex justify-between items-center mt-4 gap-2">
          <Link
            to={`/product/${product.id}`}
            className="btn btn-primary btn-small flex-1 justify-center"
          >
            Voir détails
          </Link>
          <button className="btn btn-secondary btn-small flex-1">
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
