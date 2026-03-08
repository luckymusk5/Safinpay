import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      {/* Image du produit */}
      <img
        src={product.image || "/placeholder.png"}
        alt={product.name}
        className="product-image"
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
