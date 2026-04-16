import api from '../config/api';

export const authApi = {
  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return {
      user: response.data,
      token: response.data.token
    };
  },

  async signup(userData) {
    // Map 'goal' from frontend UI to nested 'goals' object expected by backend, generic mapped for now
    const payload = {
      name: userData.email.split('@')[0], // Extract basic name
      email: userData.email,
      password: userData.password
    };
    
    const response = await api.post('/auth/register', payload);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return {
      user: response.data,
      token: response.data.token
    };
  },

  logout() {
    localStorage.removeItem('token');
  }
};
