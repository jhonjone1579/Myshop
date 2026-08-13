import { useState, useEffect, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import SortDropdown from '../components/SortDropdown'; // SortDropdown ကို Import လုပ်ပါ
import ProductDetailModal from '../components/ProductDetailModal';
import {
  fetchProducts,
  fetchCategories,
  fetchProductsByCategory,
  searchProducts,
} from '../services/api';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default'); // Sorting State
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data.slice(0, 8)))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    setLoading(true);
    setSearchTerm('');

    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory)
        .then((data) => {
          setProducts(data.products);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      fetchProducts(20)
        .then((data) => {
          setProducts(data.products);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [selectedCategory]);

  const handleSearch = (query) => {
    if (!query.trim()) return;
    setLoading(true);
    setSelectedCategory('');

    searchProducts(query)
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  // Sorting Logic - useMemo သုံးထားသဖြင့် products သို့မဟုတ် sortBy ပြောင်းလဲမှသာ တွက်ချက်မည်
  const sortedProducts = useMemo(() => {
    const list = [...products]; // Original Array ကို Mutate မဖြစ်စေရန် Copy ကူးသည်
    if (sortBy === 'price-asc') {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return list.sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'rating-desc') {
      return list.sort((a, b) => b.rating - a.rating);
    }
    return list; // default
  }, [products, sortBy]);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Search & Category Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Sorting Control Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-800">
          {selectedCategory
            ? `Category: ${selectedCategory}`
            : searchTerm
            ? `Search Results for "${searchTerm}"`
            : 'Popular Products'}
        </h2>

        {/* Sort Dropdown */}
        <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center font-medium text-gray-500">
          Products ဒေတာများ ရယူနေပါသည်...
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="flex h-64 items-center justify-center font-medium text-gray-500">
          ရှာဖွေထားသော ပစ္စည်းမရှိပါ။
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={(prod) => setSelectedProduct(prod)}
            />
          ))}
        </div>
      )}

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}