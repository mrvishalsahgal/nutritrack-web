import { mockDashboardData } from '../mock/dashboardData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const dashboardApi = {
  /**
   * Fetch dashboard daily summary
   * @param {string} date String date like 'October 24, 2023'
   */
  async getDashboardSummary(date) {
    await delay(600); // Simulate network latency

    const data = mockDashboardData[date];
    if (data) {
      return data;
    }

    // Return some default empty state if date not found
    return {
      summary: {
        caloriesLeft: 2200,
        baseGoal: 2200,
        exercise: 0,
        food: 0,
        goalProgress: 0,
        recommendation: "No data logged for today yet. Start adding meals to see your progress!"
      },
      macros: {
        carbs: { consumed: 0, target: 220, percentage: 0 },
        protein: { consumed: 0, target: 150, percentage: 0 },
        fats: { consumed: 0, target: 70, percentage: 0 }
      },
      meals: []
    };
  }
};
