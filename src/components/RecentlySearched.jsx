import { Clock, Globe, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function RecentlySearched({ searches, onSearch, onClear }) {
  const [visibleSearches, setVisibleSearches] = useState([]);
  
  useEffect(() => {
    if (searches.length > 0) {
      const timer = setTimeout(() => {
        setVisibleSearches(searches);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setVisibleSearches([]);
    }
  }, [searches]);

  if (searches.length === 0) return null;

  return (
    <div className="w-full bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#005F5A]" />
          Recent Locations
        </h3>
        <button 
          onClick={onClear}
          className="text-xs text-gray-600 hover:text-red-600 font-medium transition-colors flex items-center gap-1 group"
        >
          Clear
          <X className="w-3 h-3 group-hover:scale-110 transition-transform" />
        </button>
      </div>
      
      <ul className="space-y-2">
        {visibleSearches.map((search, index) => (
          <li key={index}>
            <button
              onClick={() => onSearch(search)}
              className="w-full bg-gradient-to-r from-[#005F5A]/80 to-[#004D4A]/80 hover:from-[#007F77] hover:to-[#006663] 
                        border border-[#005F5A]/50 rounded-lg px-4 py-3 text-sm text-white 
                        transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md 
                        hover:-translate-y-0.5 text-left"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Globe className="w-4 h-4 text-[#005F5A] flex-shrink-0" />
              <span className="truncate">{search.name}</span>
              <span className="text-gray-200 text-xs ml-auto">({search.country})</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}