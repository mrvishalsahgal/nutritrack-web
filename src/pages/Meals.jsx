import { useState, useEffect } from 'react';
import SavedMealCard from '../components/SavedMealCard';
import { mealsApi } from '../api/meals';

export default function Meals() {
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchMeals = async () => {
      setLoading(true);
      try {
        const data = await mealsApi.searchMeals(searchQuery);
        if (isMounted) setMeals(data);
      } catch (err) {
        console.error("Error fetching meals:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    // Debounce the search slightly
    const timeoutId = setTimeout(() => fetchMeals(), 300);
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  return (
    <>
      {/* Header Section: Editorial Authority */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-3 block">Personal Library</span>
            <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-on-surface">Saved Meals</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input 
                className="pl-11 pr-4 py-3 bg-surface-container-high border-none rounded-full text-sm focus:ring-2 focus:ring-primary w-full md:w-64 transition-all outline-none" 
                placeholder="Filter my recipes..." 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="p-3 bg-surface-container-high text-on-surface rounded-full hover:bg-surface-container-highest transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined">tune</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bento Grid / Cards (Asymmetrical) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {loading ? (
          <div className="col-span-full flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {meals.slice(0, 3).map((meal) => (
              <SavedMealCard key={meal.id} {...meal} />
            ))}

            {/* Card (Empty State / Add New) */}
            <div 
              onClick={() => alert("Mock Action: You are now initializing the Custom Recipe Creator.")}
              className="group border-2 border-dashed border-outline-variant/30 rounded-[2rem] flex flex-col items-center justify-center p-8 transition-all hover:bg-surface-container hover:border-primary/40 cursor-pointer min-h-[300px]"
            >
              <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-4">
                <span className="material-symbols-outlined text-3xl">add_circle</span>
              </div>
              <h3 className="font-bold text-on-surface text-lg font-headline">New Meal</h3>
              <p className="text-xs text-slate-500 text-center mt-2">Save a custom recipe to your personal library</p>
            </div>

            {meals.slice(3).map((meal) => (
              <SavedMealCard key={meal.id} {...meal} />
            ))}
            
            {meals.length === 0 && (
              <div className="col-span-full text-center py-10 text-slate-500 font-medium">
                No meals found matching "{searchQuery}". Try a different filter?
              </div>
            )}
          </>
        )}
      </div>

      {/* Pagination / Load More */}
      <div className="mt-16 flex justify-center">
        <button 
          onClick={(e) => { e.currentTarget.innerText = "No more meals found."; e.currentTarget.className = "px-8 py-4 bg-transparent text-slate-400 font-semibold rounded-full"; e.currentTarget.disabled = true; }}
          className="px-8 py-4 bg-surface-container-low text-on-surface font-semibold rounded-full hover:bg-surface-container-highest transition-all flex items-center gap-2"
        >
          <span>Load more meals</span>
          <span className="material-symbols-outlined">expand_more</span>
        </button>
      </div>
    </>
  );
}
