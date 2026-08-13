const BASE_URL = 'https://dummyjson.com';

// ၁။ ပစ္စည်းများအားလုံး ထုတ်ယူရန် (Pagination ပါဝင်သည်)
export const fetchProducts = async (limit = 20, skip = 0) => {
  const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
  if (!response.ok) throw new Error('Products ယူ၍ မရပါ');
  return await response.json();
};

// ၂။ Category စာရင်းများ ထုတ်ယူရန်
export const fetchCategories = async () => {
  const response = await fetch(`${BASE_URL}/products/categories`);
  if (!response.ok) throw new Error('Categories ယူ၍ မရပါ');
  return await response.json();
};

// ၃။ Category အလိုက် ပစ္စည်းများ သီးသန့်ယူရန်
export const fetchProductsByCategory = async (category) => {
  const response = await fetch(`${BASE_URL}/products/category/${category}`);
  if (!response.ok) throw new Error('Category အလိုက် ဒေတာယူ၍ မရပါ');
  return await response.json();
};

// ၄။ Search ရိုက်ရှာရန်
export const searchProducts = async (query) => {
  const response = await fetch(`${BASE_URL}/products/search?q=${query}`);
  if (!response.ok) throw new Error('Search အဆင်မပြေပါ');
  return await response.json();
};

// ၅။ ပစ္စည်းတစ်ခုတည်း၏ Detail ဒေတာယူရန်
export const fetchProductById = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error('Product detail ယူ၍ မရပါ');
  return await response.json();
};