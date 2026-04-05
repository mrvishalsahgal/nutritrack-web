export default function SavedMealCard({ image, label, name, calories, protein, carbs, fat, labelColor = 'text-primary' }) {
  return (
    <div className="group bg-surface-container-lowest rounded-[2rem] overflow-hidden transition-all duration-300 hover:translate-y-[-8px]">
      <div className="relative h-48 overflow-hidden">
        <img 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          src={image} 
        />
        <div className={`absolute top-4 right-4 px-3 py-1 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-bold uppercase ${labelColor}`}>
          {label}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold font-headline mb-4 group-hover:text-primary transition-colors">{name}</h3>
        <div className="flex items-center justify-between mb-6">
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
        <button className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-on-primary-fixed-variant transition-all active:scale-95">
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'wght' 700" }}>add</span>
          Add to Log
        </button>
      </div>
    </div>
  );
}
