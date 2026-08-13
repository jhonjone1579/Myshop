import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom'; // Import Link
export default function CartModal({ isOpen, onClose }) {
  const { cart, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm transition-opacity">
      {/* Background Overlay click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Slide-over Drawer */}
      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div className="flex items-center gap-2 text-lg font-bold text-gray-800">
            <ShoppingBag className="h-5 w-5 text-blue-600" />
            <span>Your Cart</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-gray-500">
              <ShoppingBag className="h-16 w-16 stroke-1 text-gray-300 mb-2" />
              <p className="text-lg font-medium">Cart ထဲမှာ ပစ္စည်းမရှိသေးပါ</p>
              <p className="text-sm text-gray-400">ပစ္စည်းများကို ရွေးချယ် ထည့်သွင်းပေးပါ</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-xl border border-gray-100 p-3 shadow-sm"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-16 w-16 rounded-lg object-contain bg-gray-50 p-1"
                />
                <div className="flex-1">
                  <h4 className="line-clamp-1 font-semibold text-gray-800 text-sm">{item.title}</h4>
                  <p className="text-sm font-bold text-blue-600 mt-0.5">${item.price}</p>
                  
                  {/* Quantity Controls */}
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="rounded border p-1 text-gray-600 hover:bg-gray-100"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-xs font-semibold px-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="rounded border p-1 text-gray-600 hover:bg-gray-100"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-red-500 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer / Total Price & Checkout */}
        {cart.length > 0 && (
          <div className="border-t p-6 space-y-4 bg-gray-50">
            <div className="flex justify-between text-base font-bold text-gray-900">
              <span>Total Price:</span>
              <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={clearCart}
                className="w-1/3 rounded-lg border border-gray-300 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100"
              >
                Clear Cart
              </button>
              <Link
  to="/checkout"
  onClick={onClose}
  className="w-2/3 rounded-lg bg-blue-600 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-700"
>
  Checkout
</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}