import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Page Refresh လုပ်ရင် Cart မပျောက်သွားစေရန် LocalStorage မှ ပြန်ယူခြင်း
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Cart ပြောင်းလဲတိုင်း LocalStorage တွင် အလိုအလျောက် သိမ်းဆည်းပေးခြင်း
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // ၁။ Cart ထဲ ပစ္စည်းထည့်ခြင်း
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        // ရှိပြီးသားဆိုလျှင် quantity ကို 1 တိုးမည်
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // မရှိသေးပါက ပစ္စည်းအသစ်အဖြစ် quantity 1 ဖြင့် ထည့်မည်
      return [...prevCart, { ...product, quantity: 1 }];
    });
    // Toast Notification ပြသခြင်း
    toast.success(`${product.title.slice(0, 20)}... ကို Cart ထဲ ထည့်လိုက်ပါပြီ!`, {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });  
  };

  // ၂။ Cart ထဲမှ ပစ္စည်းထုတ်ပစ်ခြင်း
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // ၃။ အရေအတွက် တိုး/လျော့ ပြုလုပ်ခြင်း
  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + amount;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) // 0 ဖြစ်သွားလျှင် Cart ထဲမှ အလိုအလျောက် ထွက်သွားမည်
    );
  };

  // ၄။ Cart ကို အကုန်ရှင်းထုတ်ခြင်း (Checkout ပြီးပါက သုံးရန်)
  const clearCart = () => {
    setCart([]);
  };

  // စုစုပေါင်း ပစ္စည်းအရေအတွက်
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // စုစုပေါင်း ကျသင့်ငွေ
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom Hook ပြုလုပ်ထားခြင်း (အခြား Component များမှ လွယ်ကူစွာ လှမ်းသုံးနိုင်ရန်)
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart ကို CartProvider အတွင်း၌သာ အသုံးပြုရပါမည်');
  }
  return context;
};