import api from '../config/api';

export const profileApi = {
  async getProfile() {
    const response = await api.get('/profile');
    // Ensure data shape somewhat matches what frontend expects
    return {
      name: response.data.name,
      email: response.data.email,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80',
      dailyGoal: response.data.goals ? response.data.goals.calories : 2000,
      goalProgress: 0,
      preferences: {
        darkMode: true
      }
    };
  },

  async updateProfile(updates) {
    const response = await api.put('/profile', updates);
    return response.data;
  },

  async togglePreference(key) {
    console.warn('Backend preferences not fully robust yet');
    return {};
  }
};
