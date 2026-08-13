import { ShoppingCart, Star, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext'; // Import လုပ်ပါ

export default function ProductCard({ product, onSelectProduct }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFav = isInWishlist(product.id);

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      
      {/* Heart / Wishlist Toggle Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}
        className="absolute top-6 right-6 z-10 rounded-full bg-white/80 p-2 text-gray-600 backdrop-blur-sm transition-transform hover:scale-110 hover:bg-white active:scale-95 shadow-sm"
        title={isFav ? "Wishlist မှ ဖယ်ထုတ်မည်" : "Wishlist ထဲ ထည့်မည်"}
      >
        <Heart
          className={`h-5 w-5 ${
            isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'
          }`}
        />
      </button>

      {/* Product Image & Info Click to Modal */}
      <div
        onClick={() => onSelectProduct(product)}
        className="cursor-pointer"
      >
        <div className="relative mb-4 flex h-48 w-full items-center justify-center overflow-hidden rounded-xl bg-gray-50">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="mb-2 flex items-center justify-between">
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-600 uppercase tracking-wider">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-4 w-4 fill-amber-500" />
            <span className="text-xs font-bold">{product.rating}</span>
          </div>
        </div>

        <h3 className="line-clamp-1 text-base font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs text-gray-500">
          {product.description}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-3">
        <div>
          <span className="text-xs text-gray-400 block">Price</span>
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-blue-700 active:scale-95 shadow-sm shadow-blue-200"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}