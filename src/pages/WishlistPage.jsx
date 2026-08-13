import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Trash2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto flex h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="mb-4 rounded-full bg-red-50 p-6 text-red-500">
          <Heart className="h-12 w-12" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Wishlist ထဲတွင် ပစ္စည်းမရှိပါ</h2>
        <p className="mt-2 text-gray-500">မိမိ ကြိုက်နှစ်သက်သော ပစ္စည်းများကို အသည်းပုံလေး နှိပ်၍ သိမ်းဆည်းနိုင်ပါသည်</p>
        <Link
          to="/"
          className="mt-6 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-all"
        >
          စျေးဝယ်ထွက်ရန် ပြန်သွားမည်
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800 flex items-center gap-2">
        <Heart className="h-7 w-7 text-red-500 fill-red-500" />
        My Wishlist ({wishlist.length})
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div>
              <div className="relative mb-4 flex h-48 w-full items-center justify-center overflow-hidden rounded-xl bg-gray-50">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className="line-clamp-1 text-base font-bold text-gray-800">
                {product.title}
              </h3>
              <p className="mt-1 text-lg font-bold text-gray-900">${product.price}</p>
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-gray-50 pt-3">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className="rounded-xl border border-gray-200 p-2 text-gray-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
                title="Wishlist မှ ဖျက်မည်"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}