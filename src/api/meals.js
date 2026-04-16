import api from '../config/api';

export const mealsApi = {
  async getSavedMeals() {
    const response = await api.get('/meals');
    return response.data;
  },

  async searchMeals(query) {
    const response = await api.get('/foods/search', { params: { query } });
    return response.data;
  },
  
  async logMeal(mealData) {
    const response = await api.post('/meals', mealData);
    return response.data;
  },
  
  async saveCustomFood(foodData) {
    const response = await api.post('/foods', foodData);
    return response.data;
  }
};
