export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {/* All Products Button */}
      <button
        onClick={() => onSelectCategory('')}
        className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
          selectedCategory === ''
            ? 'bg-blue-600 text-white shadow-sm'
            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
        }`}
      >
        All
      </button>

      {/* Category List */}
      {categories.map((cat) => {
        // DummyJSON ၏ category သည် object ဖြစ်နိုင်သဖြင့် name သို့မဟုတ် string စစ်ပေးထားပါသည်
        const catName = typeof cat === 'object' ? cat.name || cat.slug : cat;
        const catSlug = typeof cat === 'object' ? cat.slug : cat;

        return (
          <button
            key={catSlug}
            onClick={() => onSelectCategory(catSlug)}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition-all ${
              selectedCategory === catSlug
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {catName}
          </button>
        );
      })}
    </div>
  );
}