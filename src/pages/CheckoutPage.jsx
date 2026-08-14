import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // 1. AuthContext ထည့်သွင်းပါ
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CreditCard, Wallet, Truck, CheckCircle2 } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const { currentUser } = useAuth(); // 2. currentUser ကို ယူသုံးပါ
  const navigate = useNavigate();

  // Payment ရွေးချယ်မှု State (Default: kpay)
  const [paymentMethod, setPaymentMethod] = useState('kpay');
  
  // Shipping Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    // ဒီနေရာမှာ လိုအပ်ပါက Firestore Database သို့ Order details များ သိမ်းဆည်းနိုင်ပါသည်
    toast.success('အော်ဒါ မှာယူခြင်း အောင်မြင်ပါသည်။ ကျေးဇူးတင်ပါသည်! 🎉');
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
          className="mt-6 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          စျေးဝယ်ထွက်ရန် ပြန်သွားမည်
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Checkout (ငွေချေစနစ်)</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        {/* လက်ဝဲဘက်: လိပ်စာဖြည့်ရန် နှင့် ငွေပေးချေမှု ရွေးချယ်ရန် (7 Columns) */}
        <div className="md:col-span-7 space-y-6">
          
          {/* အကောင့်ဝင်ထားသော Email ပြသခြင်း */}
          {currentUser && (
            <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4 text-xs font-semibold text-blue-700 flex items-center justify-between">
              <span>ဝယ်ယူသူ အကောင့်:</span>
              <span className="font-bold">{currentUser.email}</span>
            </div>
          )}

          {/* Shipping Address Form */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-gray-800 flex items-center gap-2">
              <Truck className="h-5 w-5 text-blue-600" />
              ပို့ဆောင်ပေးရမည့် လိပ်စာ
            </h3>
            
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600">အမည်</label>
                <input
                  required
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="မောင်မောင်"
                  className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600">ဖုန်းနံပါတ်</label>
                <input
                  required
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="0912345678"
                  className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600">လိပ်စာအပြည့်အစုံ</label>
                <textarea
                  required
                  name="address"
                  rows="3"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="မြို့နယ်/ လမ်းအမည်..."
                  className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
                ></textarea>
              </div>
            </form>
          </div>

          {/* Payment Method Selection */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-gray-800 flex items-center gap-2">
              <Wallet className="h-5 w-5 text-blue-600" />
              ငွေပေးချေမှု နည်းလမ်း ရွေးချယ်ပါ
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {/* KPay */}
              <label className={`flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition-all ${paymentMethod === 'kpay' ? 'border-blue-600 bg-blue-50/30 ring-1 ring-blue-600' : 'border-gray-200 hover:bg-gray-50'}`}>
                <div className="flex items-center gap-2.5">
                  <input type="radio" name="payment" value="kpay" checked={paymentMethod === 'kpay'} onChange={() => setPaymentMethod('kpay')} className="hidden" />
                  <span className="text-sm font-bold text-gray-800">KBZ Pay</span>
                </div>
                {paymentMethod === 'kpay' && <CheckCircle2 className="h-4 w-4 text-blue-600" />}
              </label>

              {/* WavePay */}
              <label className={`flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition-all ${paymentMethod === 'wave' ? 'border-blue-600 bg-blue-50/30 ring-1 ring-blue-600' : 'border-gray-200 hover:bg-gray-50'}`}>
                <div className="flex items-center gap-2.5">
                  <input type="radio" name="payment" value="wave" checked={paymentMethod === 'wave'} onChange={() => setPaymentMethod('wave')} className="hidden" />
                  <span className="text-sm font-bold text-gray-800">WavePay</span>
                </div>
                {paymentMethod === 'wave' && <CheckCircle2 className="h-4 w-4 text-blue-600" />}
              </label>

              {/* Credit Card */}
              <label className={`flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition-all ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50/30 ring-1 ring-blue-600' : 'border-gray-200 hover:bg-gray-50'}`}>
                <div className="flex items-center gap-2.5">
                  <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="hidden" />
                  <span className="text-sm font-bold text-gray-800">Card</span>
                </div>
                {paymentMethod === 'card' && <CheckCircle2 className="h-4 w-4 text-blue-600" />}
              </label>

              {/* Cash on Delivery */}
              <label className={`flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition-all ${paymentMethod === 'cod' ? 'border-blue-600 bg-blue-50/30 ring-1 ring-blue-600' : 'border-gray-200 hover:bg-gray-50'}`}>
                <div className="flex items-center gap-2.5">
                  <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="hidden" />
                  <span className="text-sm font-bold text-gray-800">Cash on Delivery</span>
                </div>
                {paymentMethod === 'cod' && <CheckCircle2 className="h-4 w-4 text-blue-600" />}
              </label>
            </div>
          </div>
        </div>

        {/* လက်ယာဘက်: Order စာရင်း အကျဉ်းချုပ် (5 Columns) */}
        <div className="md:col-span-5">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sticky top-20">
            <h3 className="mb-4 text-lg font-bold text-gray-800">မှာယူထားသော စာရင်း</h3>

            <div className="space-y-3 divide-y divide-gray-100 max-h-80 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 pt-3">
                  <img src={item.thumbnail} alt={item.title} className="h-12 w-12 rounded-lg object-contain bg-gray-50 p-1 border border-gray-100" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-800 truncate">{item.title}</h4>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-xs font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-gray-100 pt-4 space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>ပစ္စည်းကျသင့်ငွေ</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>ပို့ဆောင်ခ (Delivery)</span>
                <span className="text-green-600 font-semibold">Free</span>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100">
                <span>စုစုပေါင်း ကျသင့်ငွေ:</span>
                <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button
              form="checkout-form"
              type="submit"
              className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white transition-all hover:bg-blue-700 active:scale-95 shadow-md shadow-blue-200"
            >
              Order အတည်ပြုမည် (${totalPrice.toFixed(2)})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}