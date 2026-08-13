import { Search, X } from 'lucide-react';

export default function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch(searchTerm)}
        placeholder="Search products..."
        className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-10 pr-10 text-sm shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
      />
      <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
      
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}