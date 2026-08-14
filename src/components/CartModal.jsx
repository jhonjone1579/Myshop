import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // 1. AuthContext ထည့်သွင်းပါ
import { X, Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // 2. Toast ထည့်သွင်းပါ

export default function CartModal({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const { currentUser } = useAuth(); // 3. currentUser ကို ယူသုံးပါ
  const navigate = useNavigate();

  if (!isOpen) return null;

  // Checkout ခလုတ် နှိပ်လိုက်လျှင် လုပ်ဆောင်မည့် Function
  const handleCheckout = () => {
    onClose(); // ၁။ Cart Modal ကို အရင် ပိတ်မည်

    if (!currentUser) {
      // ၂။ အကောင့် မဝင်ရသေးပါက Toast ပြပြီး Login Page သို့ တိုက်ရိုက် ပို့မည်
      toast.error('ဝယ်ယူမှု ဆက်လုပ်ရန် ကျေးဇူးပြု၍ အကောင့်ဝင်ပေးပါ 🔑');
      navigate('/login');
    } else {
      // ၃။ အကောင့် ဝင်ထားပြီးပါက Checkout Page သို့ သွားမည်
      navigate('/checkout');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-bold text-gray-800">Your Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="h-12 w-12 text-gray-300 mb-2" />
              <p className="text-sm font-semibold text-gray-500">Cart ထဲတွင် ပစ္စည်းမရှိသေးပါ</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
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
                    <h4 className="line-clamp-1 text-sm font-bold text-gray-800">
                      {item.title}
                    </h4>
                    <p className="text-xs font-semibold text-blue-600 mt-0.5">
                      ${item.price}
                    </p>

                    {/* Quantity Control */}
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="rounded-md border border-gray-200 p-1 text-gray-600 hover:bg-gray-100"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="rounded-md border border-gray-200 p-1 text-gray-600 hover:bg-gray-100"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                    title="ဖျက်မည်"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Checkout Button */}
        {cart.length > 0 && (
          <div className="border-t border-gray-100 p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-600">စုစုပေါင်း ကျသင့်ငွေ</span>
              <span className="text-xl font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full rounded-xl bg-blue-600 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-blue-700 active:scale-95 shadow-md shadow-blue-200"
            >
              Checkout ပြုလုပ်မည်
            </button>
          </div>
        )}
      </div>
    </div>
  );
}