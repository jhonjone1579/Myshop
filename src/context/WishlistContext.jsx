import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('my_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('my_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Wishlist ထဲ ပစ္စည်းထည့်/ထုတ် ပြုလုပ်ပေးမည့် Function (ပြင်ဆင်ပြီး)
  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);

    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      toast.success('Wishlist မှ ဖယ်ရှားလိုက်ပါပြီ');
    } else {
      setWishlist((prev) => [...prev, product]);
      toast.success('Wishlist ထဲသို့ ထည့်သွင်းပြီးပါပြီ');
    }
  };

  // ပစ္စည်းတစ်ခု Wishlist ထဲ ရောက်မရောက် စစ်ဆေးပေးသည့် Function
  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);