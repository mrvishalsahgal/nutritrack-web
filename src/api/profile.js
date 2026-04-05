const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Simulated persistent profile data
let mockProfileData = {
  name: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  description: 'Manage your nutritional architecture, goal thresholds, and platform preferences from a single biome.',
  dailyGoal: 2450,
  goalProgress: 72,
  preferences: {
    emailNotifications: true,
    appleHealthSync: true,
    language: 'English (US)',
    darkMode: true
  }
};

export const profileApi = {
  /** Retrieves the user's profile information */
  async getProfile() {
    await delay(600); // Simulate network latency
    return { ...mockProfileData };
  },

  /** Updates specific fields on the profile */
  async updateProfile(updates) {
    await delay(500);
    mockProfileData = { ...mockProfileData, ...updates };
    return { ...mockProfileData };
  },

  /** Toggles a boolean preference setting */
  async togglePreference(key) {
    await delay(300);
    mockProfileData.preferences[key] = !mockProfileData.preferences[key];
    return { ...mockProfileData };
  }
};
