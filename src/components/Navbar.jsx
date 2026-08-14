import { useState } from 'react';
import { ShoppingCart, Store, Heart, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext'; // Import AuthContext
import CartModal from './CartModal';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const { currentUser, logout } = useAuth(); // Auth Context မှ User နှင့် Logout ကို ယူသုံးပါသည်
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600 cursor-pointer">
            <Store className="h-7 w-7" />
            <span>MyShop</span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
              title="My Wishlist"
            >
              <Heart className="h-6 w-6" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Cart Icon */}
            <div
              onClick={() => setIsCartOpen(true)}
              className="relative cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
              title="Shopping Cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </div>

            {/* Login / User Email / Logout ခလုတ် */}
            {currentUser ? (
              <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
                <span className="hidden sm:inline text-xs font-semibold text-gray-600 max-w-30 truncate">
                  {currentUser.email}
                </span>
                <button
                  onClick={logout}
                  className="p-2 rounded-full hover:bg-red-50 text-gray-600 hover:text-red-500 transition-colors"
                  title="Logout အကောင့်ထွက်မည်"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}