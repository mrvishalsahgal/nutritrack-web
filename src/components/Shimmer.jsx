import React from 'react';

export const Shimmer = ({ className, width, height, rounded = "rounded-xl" }) => {
  return (
    <div 
      className={`bg-slate-200 animate-shimmer ${rounded} ${className}`}
      style={{ width, height }}
    />
  );
};

export const DashboardShimmer = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Header Shimmer */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <Shimmer width="150px" height="16px" />
          <Shimmer width="300px" height="48px" />
        </div>
        <Shimmer width="200px" height="40px" rounded="rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Hero Card Shimmer */}
        <div className="md:col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-[2rem] p-8 flex flex-col md:flex-row items-center gap-12">
          <div className="relative w-64 h-64 bg-slate-100 rounded-full flex items-center justify-center animate-shimmer overflow-hidden">
            <div className="w-48 h-48 bg-white rounded-full"></div>
          </div>
          <div className="flex-1 space-y-8 w-full">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Shimmer width="120px" height="24px" />
                <Shimmer width="40px" height="24px" />
              </div>
              <Shimmer width="100%" height="60px" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Shimmer width="100%" height="80px" rounded="rounded-2xl" />
              <Shimmer width="100%" height="80px" rounded="rounded-2xl" />
              <Shimmer width="100%" height="80px" rounded="rounded-2xl" />
            </div>
          </div>
        </div>

        {/* Macros Shimmer */}
        <div className="md:col-span-12 lg:col-span-4 bg-surface-container-low rounded-[2rem] p-8 space-y-8">
          <Shimmer width="150px" height="28px" />
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between">
                  <Shimmer width="100px" height="16px" />
                  <Shimmer width="80px" height="16px" />
                </div>
                <Shimmer width="100%" height="12px" rounded="rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Meals Grid Shimmer */}
        <div className="md:col-span-12 mt-4 space-y-6">
          <div className="flex justify-between">
            <Shimmer width="180px" height="32px" />
            <Shimmer width="80px" height="20px" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-outline-variant/10">
                <Shimmer width="100%" height="200px" rounded="rounded-none" />
                <div className="p-6 space-y-3">
                  <Shimmer width="70%" height="24px" />
                  <Shimmer width="40%" height="16px" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const MealCardShimmer = () => (
  <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-outline-variant/10 h-full animate-in fade-in">
    <Shimmer width="100%" height="200px" rounded="rounded-none" />
    <div className="p-8 space-y-4">
      <Shimmer width="80%" height="28px" />
      <Shimmer width="40%" height="16px" />
      <div className="pt-4 flex justify-between items-center">
        <Shimmer width="60px" height="32px" />
        <Shimmer width="100px" height="40px" rounded="rounded-full" />
      </div>
    </div>
  </div>
);

export const ProfileShimmer = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4 flex-1">
          <Shimmer width="150px" height="16px" />
          <Shimmer width="70%" height="60px" />
          <Shimmer width="50%" height="24px" />
        </div>
        <Shimmer width="128px" height="128px" rounded="rounded-[2rem]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 bg-surface-container-lowest rounded-[1.5rem] p-8 space-y-6">
          <div className="flex justify-between">
            <div className="space-y-2">
              <Shimmer width="200px" height="24px" />
              <Shimmer width="150px" height="16px" />
            </div>
            <Shimmer width="80px" height="24px" rounded="rounded-full" />
          </div>
          <Shimmer width="250px" height="80px" />
          <Shimmer width="100%" height="12px" rounded="rounded-full" />
          <div className="flex gap-4">
            <Shimmer width="120px" height="40px" rounded="rounded-full" />
            <Shimmer width="100px" height="40px" rounded="rounded-full" />
          </div>
        </div>

        <div className="md:col-span-4 bg-surface-container-low rounded-[1.5rem] p-8 space-y-6">
          <Shimmer width="48px" height="48px" rounded="rounded-2xl" />
          <div className="space-y-2">
            <Shimmer width="80%" height="24px" />
            <Shimmer width="60%" height="16px" />
          </div>
          <Shimmer width="100%" height="56px" rounded="rounded-2xl" />
        </div>

        <div className="md:col-span-12 mt-8 space-y-4">
          <Shimmer width="200px" height="32px" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white p-6 rounded-[1.5rem] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Shimmer width="40px" height="40px" rounded="rounded-xl" />
                  <div className="space-y-2">
                    <Shimmer width="120px" height="18px" />
                    <Shimmer width="180px" height="14px" />
                  </div>
                </div>
                <Shimmer width="40px" height="24px" rounded="rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
