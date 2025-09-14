"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import ErrorMessage from "@/components/ErrorMessage";
import RecentlySearched from "@/components/RecentlySearched";
import { getCoordinates } from "@/lib/weatherService";
import WeatherCardSkeleton from "@/components/WeatherCardSkeleton";

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [cityInput, setCityInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cityInput.length >= 2) {
        fetchSuggestions(cityInput);
      } else {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [cityInput]);

  async function fetchSuggestions(city) {
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=5&language=en`
      );
      const data = await res.json();
      setSuggestions(data.results || []);
    } catch (err) {
      console.error("Suggestions fetch error:", err);
      setSuggestions([]);
    }
  }

  async function handleSearch(searchInput) {
    try {
      setLoading(true);
      setError("");
      let coordsObj;
      let name, country;

      if (typeof searchInput === "string") {
        const coords = await getCoordinates(searchInput);
        name = coords.name;
        country = coords.country;
        coordsObj = { latitude: coords.latitude, longitude: coords.longitude };
      } else if (searchInput && searchInput.coords) {
        coordsObj = searchInput.coords;
        name = searchInput.name;
        country = searchInput.country;
      } else {
        coordsObj = { latitude: searchInput.latitude, longitude: searchInput.longitude };
        name = searchInput.name || "Unknown City";
        country = searchInput.country || "Unknown";
      }

      const { latitude, longitude } = coordsObj;

      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weathercode,pressure_msl,windspeed_10m,winddirection_10m,is_day&hourly=temperature_2m,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,precipitation_sum,precipitation_probability_max,weathercode,uv_index_max,sunrise,sunset&forecast_days=7&timezone=auto`
      );

      const response = await res.json();

      if (!response.current) {
        throw new Error("Invalid weather data received");
      }

      const current = response.current;

      const hasSunrise = response.daily && Array.isArray(response.daily.sunrise) && response.daily.sunrise.length > 0;
      const hasSunset = response.daily && Array.isArray(response.daily.sunset) && response.daily.sunset.length > 0;

      const weatherData = {
        ...current,
        city: name,
        country,
        sunrise: hasSunrise ? response.daily.sunrise[0] : null,
        sunset: hasSunset ? response.daily.sunset[0] : null
      };

      setWeather(weatherData);
      setForecast(response);

      if (name !== "Unknown City") {
        const newSearch = { name, country, coords: { latitude, longitude } };
        const updatedRecent = [newSearch, ...recentSearches.filter((r) => r.name !== name)].slice(0, 5);
        setRecentSearches(updatedRecent);
        localStorage.setItem("recentSearches", JSON.stringify(updatedRecent));
      }
      setCityInput("");
    } catch (err) {
      setError(err.message || "Failed to fetch weather data");
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  }

  const handleRecentSearch = (search) => {
    handleSearch(search);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <div className="w-full space-y-8 px-4 sm:px-6 lg:px-8">
      {/* Welcome Message */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 mb-3 animate-slide-up">
          Welcome to Weather Now
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          Get instant weather updates for any city worldwide. Type a city name below to explore real-time forecasts!
        </p>
        
      </div>
      
      <SearchBar
        onSearch={handleSearch}
        suggestions={suggestions}
        onSuggestionSelect={handleSearch}
        city={cityInput}
        setCity={setCityInput}
      />
      
      {loading && <WeatherCardSkeleton />}
      
      {error && <ErrorMessage message={error} />}
      
      {weather && <WeatherCard data={weather} forecast={forecast} />}
      
      {recentSearches.length > 0 && (
        <RecentlySearched 
          searches={recentSearches} 
          onSearch={handleRecentSearch}
          onClear={clearRecentSearches}
        />
      )}
    </div>
  );
}