import api from '../config/api';

export const dashboardApi = {
  async getDashboardSummary(date) {
    try {
      const response = await api.get('/analytics/trends', { params: { range: 'daily', date } });
      const logs = response.data.data || [];
      
      let calories = 0, protein = 0, carbs = 0, fats = 0;
      
      logs.forEach(log => {
        if (log.totalNutrients) {
          calories += log.totalNutrients.calories || 0;
          protein += log.totalNutrients.protein || 0;
          carbs += log.totalNutrients.carbs || 0;
          fats += log.totalNutrients.fat || 0;
        }
      });

      return {
        summary: {
          caloriesLeft: Math.max(2200 - calories, 0),
          baseGoal: 2200,
          exercise: 0,
          food: calories,
          goalProgress: Math.min(Math.floor((calories / 2200) * 100), 100),
          recommendation: "Keep logging your meals to track your progress!"
        },
        macros: {
          carbs: { consumed: carbs, target: 220, percentage: Math.min(Math.floor((carbs/220)*100), 100) },
          protein: { consumed: protein, target: 150, percentage: Math.min(Math.floor((protein/150)*100), 100) },
          fats: { consumed: fats, target: 70, percentage: Math.min(Math.floor((fats/70)*100), 100) }
        },
        meals: logs
      };
    } catch (err) {
      return {
        summary: { caloriesLeft: 2200, baseGoal: 2200, exercise: 0, food: 0, goalProgress: 0, recommendation: "Error connecting to backend" },
        macros: { carbs: { consumed: 0, target: 220, percentage: 0 }, protein: { consumed: 0, target: 150, percentage: 0 }, fats: { consumed: 0, target: 70, percentage: 0 } },
        meals: []
      };
    }
  }
};
