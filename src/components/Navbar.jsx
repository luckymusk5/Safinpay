import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="navbar-brand text-2xl text-black">
              SafinPay
            </Link>
          </div>

          {/* Barre de recherche */}
          <div className="flex-1 px-4">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              className="form-input"
            />
          </div>

          {/* Liens de navigation */}
          <div className="flex space-x-6 text-white font-medium">
            <Link to="/account" className="navbar-link">Compte</Link>
            <Link to="/orders" className="navbar-link">Commandes</Link>
            <Link to="/cart" className="navbar-link">Panier</Link>
            <Link to="/seller/dashboard" className="navbar-link">Dashboard Vendeur</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
