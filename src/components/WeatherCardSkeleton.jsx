import React from "react";
import { Thermometer, CloudRain, Calendar, Activity, TrendingUp, Compass, Clock } from "lucide-react";

const SkeletonLine = ({ className = "" }) => (
  <div className={`bg-gray-200 rounded-full animate-pulse ${className}`}></div>
);

export default function WeatherCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-br from-emerald-400 to-teal-600 p-6 text-white animate-pulse flex flex-col items-center">
        <SkeletonLine className="h-8 w-48 mb-1" />
        <SkeletonLine className="h-4 w-32 mb-4" />
        <div className="w-16 h-16 bg-white/20 rounded-full mb-2"></div>
        <SkeletonLine className="h-12 w-20 mb-1" />
        <SkeletonLine className="h-5 w-28 mb-2" />
        <SkeletonLine className="h-5 w-36 mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white/20 backdrop-blur-sm rounded-lg p-3 space-y-1">
              <div className="w-5 h-5 bg-white/30 rounded-full mx-auto"></div>
              <SkeletonLine className="h-3 w-16 mx-auto" />
              <SkeletonLine className="h-4 w-12 mx-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Tabs Skeleton */}
      <div className="flex overflow-x-auto gap-1 p-4 bg-gray-50">
        {[
          { icon: Activity },
          { icon: Clock },
          { icon: Calendar },
          { icon: TrendingUp },
          { icon: Compass }
        ].map((tab, i) => {
          const TabIcon = tab.icon;
          return (
            <div key={i} className="flex items-center gap-2 px-5 py-3 rounded-full bg-gray-200 animate-pulse whitespace-nowrap">
              <TabIcon className="w-4 h-4" />
              <SkeletonLine className="h-3 w-16" />
            </div>
          );
        })}
      </div>

      {/* Tab Content Skeleton */}
      <div className="p-6 space-y-6">
        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Thermometer className="w-5 h-5 bg-gray-300 rounded-full animate-pulse" />
            <SkeletonLine className="h-5 w-32" />
          </div>
          <div className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
          <SkeletonLine className="h-5 w-24" />
          <div className="flex justify-center">
            <div className="w-40 h-40 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}