import { useState } from 'react';
import { mealsApi } from '../api/meals';
import { toast } from '../utils/toast';

export default function SavedMealCard({ _id, image, label, name, calories, protein, carbs, fat, labelColor = 'text-primary' }) {
  const [loading, setLoading] = useState(false);

  const handleAddToLog = async () => {
    setLoading(true);
    try {
      // Heuristic for meal type
      const hours = new Date().getHours();
      let guessedType = 'Snacks';
      if (hours >= 5 && hours < 11) guessedType = 'Breakfast';
      else if (hours >= 11 && hours < 16) guessedType = 'Lunch';
      else if (hours >= 16 && hours < 22) guessedType = 'Dinner';

      await mealsApi.logMeal({
        mealType: guessedType,
        name: name,
        image: image,
        totalNutrients: { calories, protein, carbs, fat },
        foods: [{ food: _id, quantity: 1 }]
      });
      toast(`"${name}" added to daily log!`);
    } catch (err) {
      console.error(err);
      toast("Failed to add meal to log.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group bg-surface-container-lowest rounded-[2rem] overflow-hidden transition-all duration-300 hover:translate-y-[-8px] flex flex-col h-full border border-outline-variant/5">
      <div className="relative h-56 overflow-hidden shrink-0">
        <img 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          src={image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"} 
        />
        {label && (
          <div className={`absolute top-4 right-4 px-3 py-1 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-bold uppercase ${labelColor}`}>
            {label}
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold font-headline mb-4 group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
          {name}
        </h3>
        <div className="flex items-center justify-between mb-8 mt-auto">
          <div className="text-center">
            <p className="text-2xl font-bold font-headline text-on-surface leading-none">{calories}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">kcal</p>
          </div>
          <div className="h-8 w-[1px] bg-slate-100"></div>
          <div className="text-center">
            <p className="text-sm font-bold text-on-surface">{protein}g</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Prot</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-on-surface">{carbs}g</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Carb</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-on-surface">{fat}g</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Fat</p>
          </div>
        </div>
        <button 
          onClick={handleAddToLog}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-on-primary-fixed-variant transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 shadow-lg shadow-primary/20"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'wght' 700" }}>add</span>
              Add to Log
            </>
          )}
        </button>
      </div>
    </div>
  );
}
