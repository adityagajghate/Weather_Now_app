import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Tooltip, CartesianGrid } from "recharts";
import { Sun, Cloud, CloudRain, Wind, Droplets, Thermometer, Gauge, Calendar, Clock, TrendingUp, Activity } from "lucide-react";

const weatherIcons = {
  0: Sun,
  1: Sun,
  2: Cloud,
  3: Cloud,
  45: Cloud,
  48: Cloud,
  51: CloudRain,
  53: CloudRain,
  55: CloudRain,
  61: CloudRain,
  63: CloudRain,
  65: CloudRain,
  80: CloudRain,
  95: CloudRain,
};

const weatherDescriptions = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  80: "Rain showers",
  95: "Thunderstorm",
};

function getDirection(deg) {
  if (deg < 22.5) return "N";
  if (deg < 67.5) return "NE";
  if (deg < 112.5) return "E";
  if (deg < 157.5) return "SE";
  if (deg < 202.5) return "S";
  if (deg < 247.5) return "SW";
  if (deg < 292.5) return "W";
  if (deg < 337.5) return "NW";
  return "N";
}

export default function WeatherCard({ data, forecast }) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!data || !forecast) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-emerald-500 mx-auto mb-4"></div>
        <p className="text-gray-600 text-sm sm:text-base">Loading weather data...</p>
      </div>
    );
  }

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    try {
      const date = new Date(timeString);
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    } catch {
      return timeString;
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getMonthDay = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  };

  const temperatureChartData = forecast.daily.time.slice(0, 7).map((date, index) => ({
    day: getDayName(date),
    max: forecast.daily.temperature_2m_max[index],
    min: forecast.daily.temperature_2m_min[index],
  }));

  const precipitationData = forecast.daily.time.slice(0, 7).map((date, index) => ({
    day: getDayName(date),
    precipitation: forecast.daily.precipitation_probability_max[index],
  }));

  const hourlyData = forecast.hourly.time.slice(0, 24).map((time, index) => ({
    hour: new Date(time).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
    temp: forecast.hourly.temperature_2m[index],
    precip: forecast.hourly.precipitation_probability[index],
  }));

  const monthlyData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const baseMax = forecast.daily.temperature_2m_max[0] || 20;
    const baseMin = forecast.daily.temperature_2m_min[0] || 10;
    return {
      day: getMonthDay(date),
      max: baseMax + (Math.random() * 4 - 2),
      min: baseMin + (Math.random() * 4 - 2),
    };
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-full mx-auto sm:max-w-3xl md:max-w-4xl lg:max-w-6xl">
      {/* Hero Section */}
      <div className="bg-teal-800 p-4 sm:p-6 md:p-8 text-white flex flex-col items-center">
        {/* Main Weather Info (Centered) */}
        <div className="flex flex-col items-center text-center animate-fade-in mb-4 sm:mb-6" style={{ animationDelay: "0.2s" }}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Pune, India</h1>
          <p className="text-white/90 text-sm sm:text-lg md:text-xl flex items-center gap-2 mb-2 sm:mb-4">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            Sunday, September 14, 2025
          </p>
          <CloudRain className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-2 sm:mb-3" />
          <div className="text-4xl sm:text-5xl md:text-7xl font-light mb-1 sm:mb-2">24°C</div>
          <div className="text-lg sm:text-xl md:text-2xl font-medium mb-2 sm:mb-3">Feels like 28°C</div>
          <p className="text-lg sm:text-xl md:text-2xl font-semibold bg-white/30 backdrop-blur-lg rounded-full px-4 sm:px-5 md:px-6 py-1 sm:py-1.5 md:py-2 shadow-md">
            Rain showers
          </p>
        </div>

        {/* Weather Details (Responsive Grid) */}
        <div className="w-full max-w-full sm:max-w-2xl md:max-w-5xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
            {[
              { icon: Thermometer, label: "Feels Like", value: "28°C", color: "text-amber-200" },
              { icon: Gauge, label: "Pressure", value: "1007.8 hPa", color: "text-purple-200" },
              { icon: CloudRain, label: "Precipitation", value: "0.2 mm", color: "text-teal-200" },
              { icon: Wind, label: "Wind", value: "7.7 km/h W", color: "text-green-200" },
              { icon: Droplets, label: "Humidity", value: "91%", color: "text-cyan-200" },
            ].map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white/30 backdrop-blur-lg rounded-xl p-2 sm:p-3 flex flex-col items-center shadow-md animate-fade-in"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <ItemIcon className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ${item.color} mb-1 sm:mb-2`} />
                  <p className="text-xs sm:text-sm font-medium text-white/90">{item.label}</p>
                  <p className="text-sm sm:text-lg md:text-xl font-semibold text-white">{item.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation Buttons (Responsive) */}
      <div className="flex flex-wrap gap-1 sm:gap-2 p-2 sm:p-3 md:p-4 bg-gray-50 justify-center">
        {[
          { id: "overview", label: "Overview", icon: Activity },
          { id: "hourly", label: "Hourly", icon: Clock },
          { id: "forecast", label: "Daily", icon: Calendar },
          { id: "monthly", label: "Monthly", icon: Calendar },
        ].map((tab) => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 rounded-lg font-medium text-xs sm:text-sm md:text-base transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-emerald-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              <TabIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-6 max-w-full mx-auto">
        {activeTab === "overview" && (
          <div className="space-y-4 sm:space-y-6">
            {/* Temperature Trend */}
            <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2">
                <Thermometer className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                Temperature Trend
              </h3>
              <div className="h-48 sm:h-56 md:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={temperatureChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="day" textAnchor="middle" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="max" fill="#FBBF24" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="min" fill="#34D399" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === "hourly" && (
          <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
              Hourly Forecast
            </h3>
            <div className="h-48 sm:h-56 md:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="hour" textAnchor="middle" fontSize={12} />
                  <YAxis yAxisId="left" fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" fontSize={12} />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="temp" stroke="#FBBF24" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="precip" stroke="#34D399" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === "forecast" && (
          <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Daily Forecast</h3>
            <div className="space-y-2 sm:space-y-3">
              {forecast.daily.time.slice(0, 7).map((date, index) => {
                const isToday = index === 0;
                const DayWeatherIcon = weatherIcons[forecast.daily.weathercode[index]] || Cloud;
                return (
                  <div key={date} className={`rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-4 ${isToday ? 'bg-emerald-500 text-white' : 'bg-white'}`}>
                    <DayWeatherIcon className={`w-6 h-6 sm:w-8 sm:h-8 ${isToday ? 'text-white' : 'text-emerald-500'}`} />
                    <div className="flex-1">
                      <div className={`font-medium text-sm sm:text-base ${isToday ? 'text-white' : 'text-gray-700'}`}>
                        {isToday ? 'Today' : getDayName(date)}
                      </div>
                      <div className={`text-xs ${isToday ? 'text-white/80' : 'text-gray-600'}`}>
                        Precip: {forecast.daily.precipitation_sum[index]} mm • UV: {forecast.daily.uv_index_max[index]}
                      </div>
                    </div>
                    <div className={`text-base sm:text-lg md:text-xl font-bold ${isToday ? 'text-white' : 'text-gray-800'}`}>
                      {Math.round(forecast.daily.temperature_2m_max[index])}° / {Math.round(forecast.daily.temperature_2m_min[index])}°
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "monthly" && (
          <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
              Monthly Temperature Trend
            </h3>
            <div className="h-48 sm:h-56 md:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="day" textAnchor="middle" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="max" stroke="#FBBF24" strokeWidth={2} />
                  <Line type="monotone" dataKey="min" stroke="#34D399" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
