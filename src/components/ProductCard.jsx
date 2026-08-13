import { Star, ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onSelectProduct }) {
  const { title, price, thumbnail, category, rating } = product;
  const { addToCart } = useCart();

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:shadow-md">
      {/* Card Body - နှိပ်လိုက်သော Product ကို Detail Modal ဆီ ပို့ပေးမည် */}
      <div
        className="cursor-pointer"
        onClick={() => onSelectProduct && onSelectProduct(product)}
      >
        <div className="relative h-48 w-full overflow-hidden bg-gray-50">
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm">
              <Eye className="h-3.5 w-3.5" /> Quick View
            </span>
          </div>
        </div>

        <div className="p-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            {category}
          </span>
          <h3 className="mt-1 line-clamp-1 text-base font-bold text-gray-800" title={title}>
            {title}
          </h3>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-extrabold text-gray-900">${price}</span>
            <div className="flex items-center gap-1 text-sm font-medium text-amber-500">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span>{rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="p-4 pt-0">
        <button
          onClick={(e) => {
            e.stopPropagation(); // Modal ပွင့်မသွားစေရန် Event တားဆီးခြင်း
            addToCart(product);
          }}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 active:scale-[0.98]"
        >
          <ShoppingBag className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}