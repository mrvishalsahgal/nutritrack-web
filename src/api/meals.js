import { mockMeals } from '../mock/mealsData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mealsApi = {
  /**
   * Retrieves a list of saved meals
   */
  async getSavedMeals() {
    await delay(800); // Simulate network latency
    return [...mockMeals]; // Return copy
  },

  /**
   * Search through meals by name or label
   * @param {string} query Search term 
   */
  async searchMeals(query) {
    await delay(400); // faster latency for typing search
    const lowerQuery = query.toLowerCase();
    
    return mockMeals.filter(meal => 
      meal.name.toLowerCase().includes(lowerQuery) || 
      meal.label.toLowerCase().includes(lowerQuery)
    );
  }
};
