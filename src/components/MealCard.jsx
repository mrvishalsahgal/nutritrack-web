export default function MealCard({ image, name, details, calories }) {
  return (
    <div className="bg-surface-container-lowest rounded-3xl p-6 flex items-center gap-4 hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-pointer group">
      <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0">
        <img 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          src={image} 
          alt={name} 
        />
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-lg">{name}</h4>
        <p className="text-slate-400 text-sm">{details}</p>
      </div>
      <div className="text-right">
        <span className="block font-bold text-lg">{calories}</span>
        <span className="text-[10px] text-slate-400 uppercase font-bold">kcal</span>
      </div>
    </div>
  );
}
