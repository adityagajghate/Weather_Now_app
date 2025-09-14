"use client";

import { useState, useEffect } from "react";
import { MapPin, Search } from "lucide-react";

export default function SearchBar({ onSearch, suggestions, onSuggestionSelect, city, setCity }) {
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (city.length >= 2) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion.name);
    onSuggestionSelect(suggestion);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-md transition-all duration-300 text-lg placeholder-gray-500"
        />
        <button
          type="submit"
          disabled={!city.trim()}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-4 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <Search className="w-5 h-5" />
          Go
        </button>
      </form>
      
      {showDropdown && suggestions?.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white rounded-2xl mt-2 shadow-lg max-h-64 overflow-y-auto z-10 border border-gray-300">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-5 py-4 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 cursor-pointer border-b border-gray-200 last:border-b-0 flex items-center gap-3 transition-all duration-200"
            >
              <MapPin className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <div>
                <span className="text-gray-900 font-medium block">{suggestion.name}</span>
                {suggestion.country && (
                  <span className="text-gray-600 text-sm">({suggestion.country})</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}