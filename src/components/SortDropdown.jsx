export default function SortDropdown({ sortBy, onSortChange }) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-xs font-semibold text-gray-600 whitespace-nowrap">
        စီစဉ်မည်:
      </label>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none"
      >
        <option value="default">ပုံမှန် (Featured)</option>
        <option value="price-asc">ဈေးနှုန်း: အနိမ့် မှ အမြင့်</option>
        <option value="price-desc">ဈေးနှုန်း: အမြင့် မှ အနိမ့်</option>
        <option value="rating-desc">Rating: အမြင့်ဆုံး</option>
      </select>
    </div>
  );
}