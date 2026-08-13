import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    toast.success('အော်ဒါ မှာယူခြင်း အောင်မြင်ပါသည်။ ကျေးဇူးတင်ပါသည်!');
    clearCart();
    navigate('/'); // Order တင်ပြီးပါက Home Page သို့ ပြန်ပို့မည်
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto flex h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Cart ထဲတွင် ပစ္စည်းမရှိပါ</h2>
        <p className="mt-2 text-gray-500">ဝယ်ယူလိုသော ပစ္စည်းများကို မမှာယူမီ ထည့်သွင်းပေးပါ</p>
        <Link
          to="/"
          className="mt-6 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          စျေးဝယ်ထွက်ရန် ပြန်သွားမည်
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Checkout (ငွေချေစနစ်)</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Shipping Form */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-bold text-gray-800">ပို့ဆောင်ပေးရမည့် လိပ်စာ</h3>
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600">အမည်</label>
              <input
                required
                type="text"
                placeholder="မောင်မောင်"
                className="mt-1 w-full rounded-lg border border-gray-200 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600">ဖုန်းနံပါတ်</label>
              <input
                required
                type="tel"
                placeholder="0912345678"
                className="mt-1 w-full rounded-lg border border-gray-200 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600">လိပ်စာအပြည့်အစုံ</label>
              <textarea
                required
                rows="3"
                placeholder="မြို့နယ်/ လမ်းအမည်..."
                className="mt-1 w-full rounded-lg border border-gray-200 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700"
            >
              Order တင်မည် (${totalPrice.toFixed(2)})
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm h-fit">
          <h3 className="mb-4 text-lg font-bold text-gray-800">မှာယူထားသော စာရင်း</h3>
          <div className="space-y-3 divide-y divide-gray-100">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between pt-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-800">{item.title}</h4>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-bold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t pt-4 flex justify-between text-base font-bold text-gray-900">
            <span>စုစုပေါင်း ကျသင့်ငွေ:</span>
            <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}