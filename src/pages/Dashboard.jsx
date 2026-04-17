import { useState, useEffect, useRef } from "react";
import MealCard from "../components/MealCard";
import { dashboardApi } from "../api/dashboard";
import CustomDatePicker from "../components/CustomDatePicker";

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDateToYYYYMMDD = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const dateStr = formatDateToYYYYMMDD(selectedDate);
        const result = await dashboardApi.getDashboardSummary(dateStr);
        setData(result);
      } catch (error) {
        console.error("Error fetching dashboard", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [selectedDate]);

  const handlePrevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setShowCalendar(false);
  };

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const { summary, macros, meals } = data;

  const circleCircumference = 2 * Math.PI * 110;
  const strokeDashoffset =
    circleCircumference - (summary.goalProgress / 100) * circleCircumference;

  const formattedDateDisplay = selectedDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const isToday = new Date().toDateString() === selectedDate.toDateString();

  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="font-label text-sm font-medium text-slate-400 uppercase tracking-[0.2em] mb-2">
            Your Daily Intake
          </h2>
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-on-surface tracking-tight">
            {isToday ? "Today's Summary" : "Daily Summary"}
          </h1>
        </div>
        <div className="relative" ref={calendarRef}>
          <div className="flex items-center bg-surface-container-low rounded-full p-1.5 self-start shadow-sm border border-outline-variant/10">
            <button
              onClick={handlePrevDay}
              className="p-2 hover:bg-surface-container-highest rounded-full transition-colors flex items-center justify-center text-on-surface-variant"
              title="Previous Day"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            
            <button 
              className="flex items-center px-3 py-1.5 cursor-pointer hover:bg-surface-container-highest rounded-full transition-all group"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <span className="font-bold text-sm text-on-surface transition-colors">
                {formattedDateDisplay}
              </span>
              <span className="material-symbols-outlined ml-2 text-primary text-[20px] transition-transform duration-300" style={{ transform: showCalendar ? 'rotate(180)deg' : 'none' }}>
                {showCalendar ? 'calendar_month' : 'event'}
              </span>
            </button>

            <button
              onClick={handleNextDay}
              className="p-2 hover:bg-surface-container-highest rounded-full transition-colors flex items-center justify-center text-on-surface-variant"
              title="Next Day"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>

          {showCalendar && (
            <CustomDatePicker 
              selectedDate={selectedDate} 
              onChange={handleDateChange}
              onClose={() => setShowCalendar(false)}
            />
          )}
        </div>
      </div>

      {/* Bento Grid Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Hero Calorie Ring Card */}
        <div className="md:col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-[2rem] p-8 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
          <div className="relative w-64 h-64 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform">
              <circle
                className="text-surface-container-highest"
                cx="128"
                cy="128"
                fill="transparent"
                r="110"
                stroke="currentColor"
                strokeWidth="24"
              ></circle>
              <circle
                className="text-primary transition-all duration-1000"
                cx="128"
                cy="128"
                fill="transparent"
                r="110"
                stroke="currentColor"
                strokeDasharray={circleCircumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                strokeWidth="24"
              ></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-5xl font-headline font-bold text-on-surface">
                {summary.caloriesLeft.toLocaleString()}
              </span>
              <span className="font-label text-sm text-slate-400 uppercase tracking-widest mt-1">
                kcal left
              </span>
            </div>
          </div>
          <div className="flex-1 space-y-8 w-full">
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="font-headline text-lg font-bold">
                  Goal Progress
                </span>
                <span className="text-primary font-bold">
                  {summary.goalProgress}%
                </span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                {summary.recommendation}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-surface-container rounded-2xl p-4 text-center">
                <span className="block text-xl font-bold">
                  {summary.baseGoal.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">
                  Base Goal
                </span>
              </div>
              <div className="bg-surface-container rounded-2xl p-4 text-center">
                <span className="block text-xl font-bold text-blue-500">
                  1,850
                  <span className="text-xs ml-1 font-medium italic">ml</span>
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">
                  Water
                </span>
              </div>
              <div className="bg-surface-container rounded-2xl p-4 text-center">
                <span className="block text-xl font-bold text-tertiary">
                  -{summary.food.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">
                  Food
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Macros Breakdown Card */}
        <div className="md:col-span-12 lg:col-span-4 bg-surface-container-low rounded-[2rem] p-8 space-y-8">
          <h3 className="text-xl font-headline font-bold">Macronutrients</h3>
          <div className="space-y-6">
            {/* Carbs */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-semibold">
                <span>Carbohydrates</span>
                <span className="text-slate-400">
                  {macros.carbs.consumed}g / {macros.carbs.target}g
                </span>
              </div>
              <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-400 rounded-full transition-all duration-1000"
                  style={{ width: `${macros.carbs.percentage}%` }}
                ></div>
              </div>
            </div>
            {/* Protein */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-semibold">
                <span>Protein</span>
                <span className="text-slate-400">
                  {macros.protein.consumed}g / {macros.protein.target}g
                </span>
              </div>
              <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-container rounded-full transition-all duration-1000"
                  style={{ width: `${macros.protein.percentage}%` }}
                ></div>
              </div>
            </div>
            {/* Fats */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-semibold">
                <span>Fats</span>
                <span className="text-slate-400">
                  {macros.fats.consumed}g / {macros.fats.target}g
                </span>
              </div>
              <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-1000"
                  style={{ width: `${macros.fats.percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-outline-variant/15">
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <span className="material-symbols-outlined text-primary">
                check_circle
              </span>
              <span>Optimal protein intake for muscle recovery.</span>
            </div>
          </div>
        </div>

        {/* Recent Meals List */}
        <div className="md:col-span-12 lg:col-span-12 mt-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-headline font-bold">Recent Meals</h3>
            <button className="text-primary font-bold text-sm hover:underline">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {meals.slice(0, 6).map((meal) => {
              const foodNames = meal.foods && meal.foods.length > 0 
                ? meal.foods.map(f => f.food?.name).filter(Boolean).join(", ") 
                : "";

              // Priority: Real name -> food names -> description -> meal type fallback
              const genericTypes = ["Breakfast", "Lunch", "Dinner", "Snacks", "Meal", "Logged Meal", "Untitled Meal"];
              const hasGenericName = !meal.name || genericTypes.includes(meal.name);
              const mealName = hasGenericName ? (foodNames || meal.description || meal.name || meal.mealType || "Healthy Meal") : meal.name;
                  
              return (
                <MealCard
                  key={meal._id || Math.random()}
                  name={mealName}
                  details={`${meal.mealType || "Meal"} • ${new Date(meal.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}
                  calories={meal.totalNutrients?.calories || 0}
                  image={
                    meal.image ||
                    (meal.foods && meal.foods[0]?.food?.image) ||
                    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
