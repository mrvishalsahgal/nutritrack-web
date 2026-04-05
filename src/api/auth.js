import { mockUsers } from '../mock/users';

// Simulate a network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authApi = {
  /**
   * Logs a user in
   * @param {Object} credentials { email, password }
   * @returns {Promise<Object>} The authenticated user object and a mock token
   */
  async login(credentials) {
    await delay(800); // Simulate network latency

    const { email, password } = credentials;
    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (user) {
      // Exclude password from the response
      const { password: _, ...userWithoutPassword } = user;
      return {
        user: userWithoutPassword,
        token: 'mock-jwt-token-123456789'
      };
    }

    throw new Error('Invalid email or password');
  },

  /**
   * Signs a user up
   * @param {Object} userData { email, password, goal }
   * @returns {Promise<Object>} The authenticated user object and a mock token
   */
  async signup(userData) {
    await delay(1000); // Simulate network latency

    const { email, password, goal } = userData;
    const existingUser = mockUsers.find(u => u.email === email);

    if (existingUser) {
      throw new Error('Email is already in use');
    }

    const newUser = {
      id: `u${mockUsers.length + 1}`,
      name: email.split('@')[0],
      email,
      password,
      goal,
      avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    };

    // In a real app we would not mutate a static mock array like this,
    // but it serves the purpose for client-side state mocking within one session
    mockUsers.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;
    return {
      user: userWithoutPassword,
      token: 'mock-jwt-token-123456789'
    };
  }
};
