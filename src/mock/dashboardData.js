export const mockDashboardData = {
  'October 24, 2023': {
    summary: {
      caloriesLeft: 1850,
      caloriesConsumed: 1850, // Let's say goal is 3700? No, let's use the UI data:
      baseGoal: 2200,
      exercise: 340,
      food: 1850,
      goalProgress: 84, // percentage
      recommendation: "You're on track to hit your weight loss target. Keep choosing high-protein options for dinner."
    },
    macros: {
      carbs: { consumed: 142, target: 220, percentage: 65 },
      protein: { consumed: 98, target: 150, percentage: 65 },
      fats: { consumed: 45, target: 70, percentage: 64 }
    },
    meals: [
      {
        id: 1,
        name: 'Quinoa Buddha Bowl',
        details: 'Lunch • 1:24 PM',
        calories: 450,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 2,
        name: 'Salmon & Eggs',
        details: 'Breakfast • 8:15 AM',
        calories: 520,
        image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 3,
        name: 'Greek Yogurt Parfait',
        details: 'Snack • 11:00 AM',
        calories: 280,
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
      }
    ]
  },
  'October 23, 2023': {
    summary: {
      caloriesLeft: 200,
      baseGoal: 2200,
      exercise: 150,
      food: 2150,
      goalProgress: 95,
      recommendation: "Great job yesterday! You met your calorie goals and had a fantastic protein balance."
    },
    macros: {
      carbs: { consumed: 200, target: 220, percentage: 90 },
      protein: { consumed: 145, target: 150, percentage: 96 },
      fats: { consumed: 60, target: 70, percentage: 85 }
    },
    meals: [
      {
        id: 4,
        name: 'Chicken Salad',
        details: 'Dinner • 7:30 PM',
        calories: 600,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 5,
        name: 'Oatmeal & Berries',
        details: 'Breakfast • 9:00 AM',
        calories: 400,
        image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
      }
    ]
  }
};
