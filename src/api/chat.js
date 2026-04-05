const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const chatApi = {
  /**
   * Simulates sending a message to the AI and getting a response back
   */
  async sendMessage(message) {
    await delay(1200 + Math.random() * 800); // Simulate AI thinking time
    
    const msgLower = message.toLowerCase();
    
    // Simulate intent detection for visual 'Bento' card injections
    if (msgLower.includes('salad') || msgLower.includes('chicken')) {
      return {
        text: 'Got it! A classic Chicken Caesar Salad is a balanced choice. Here is the estimated nutritional breakdown for a standard serving:',
        hasBento: true,
        bentoData: {
          calories: 480,
          protein: 32,
          fat: 34,
          carbs: 12,
          name: 'Standard Caesar',
          description: 'Includes grilled breast, romaine, croutons, and dressing.',
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
        }
      };
    }
    
    if (msgLower.includes('protein')) {
      return {
        text: 'A great way to boost protein is by adding Greek yogurt, an egg, or an extra serving of lean meat to your meal! The meal you just logged had about 25g of protein. Great job!',
        hasBento: false
      };
    }
    
    if (msgLower.includes('water')) {
      return {
        text: 'Logged 500ml of water! Stay hydrated. 💧',
        hasBento: false
      };
    }
    
    // Generic fallback
    return {
      text: `I've recorded that you had "${message}". Based on standard portions, that's roughly 350 calories. Would you like to save this to today's log?`,
      hasBento: false
    };
  }
};
