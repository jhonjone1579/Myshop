import { X, Star, ShoppingBag, CheckCircle, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductDetailModal({ product, onClose }) {
  const { addToCart } = useCart();

  if (!product) return null;

  const { title, price, description, thumbnail, category, rating, brand, stock } = product;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      {/* Background Overlay click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Section */}
          <div className="flex items-center justify-center bg-gray-50 p-6">
            <img
              src={thumbnail}
              alt={title}
              className="max-h-72 w-full object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col justify-between p-6">
            <div>
              {/* Category & Brand */}
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                <Tag className="h-3.5 w-3.5" />
                <span>{category}</span>
                {brand && <span>• {brand}</span>}
              </div>

              {/* Title */}
              <h2 className="mt-2 text-xl font-bold text-gray-800">{title}</h2>

              {/* Rating & Stock */}
              <div className="mt-3 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 font-semibold text-amber-500">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span>{rating}</span>
                </div>
                <div className="flex items-center gap-1 font-medium text-emerald-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>In Stock ({stock || 'Available'})</span>
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                {description}
              </p>
            </div>

            {/* Price & Add to Cart Action */}
            <div className="mt-6 border-t pt-4">
              <div className="mb-4 flex items-baseline justify-between">
                <span className="text-sm font-medium text-gray-500">Price:</span>
                <span className="text-2xl font-extrabold text-gray-900">${price}</span>
              </div>

              <button
                onClick={() => {
                  addToCart(product);
                  onClose();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700 active:scale-[0.98]"
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}