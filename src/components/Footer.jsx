import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-extrabold text-black tracking-wide">
              SafinPay
            </Link>
          </div>

          {/* Barre de recherche */}
          <div className="flex-1 px-4">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Liens de navigation */}
          <div className="flex space-x-6 text-white font-medium">
            <Link to="/account" className="hover:text-black transition">Compte</Link>
            <Link to="/orders" className="hover:text-black transition">Commandes</Link>
            <Link to="/cart" className="hover:text-black transition">Panier</Link>
            <Link to="/seller/dashboard" className="hover:text-black transition">Dashboard Vendeur</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
