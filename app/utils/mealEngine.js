import { conditions } from '../data/nutritionData';


// Normalize helper (makes matching safer)
const normalize = (text) =>
  text.toLowerCase().trim();



// MAIN ENGINE
export const generateSafeFoods = (userProfile) => {

  const {
    conditions: userConditions = [],
    allergies = []
  } = userProfile;



  // STEP 1: collect all forbidden keywords
  let forbidden = [];



  // 1. Add condition-based restrictions
  userConditions.forEach((cond) => {

    const rule = conditions[cond];

    if (rule) {
      forbidden = [
        ...forbidden,
        ...rule.avoid
      ];
    }

  });



  // 2. Add allergy-based restrictions
  allergies.forEach((allergy) => {

    forbidden.push(allergy);

  });



  // STEP 2: FILTER FOODS
  const safeFoods = foods.filter((food) => {

    const foodName = normalize(food.name);

    // check if food is forbidden
    const isBlocked = forbidden.some((badItem) =>
      foodName.includes(normalize(badItem))
    );

    return !isBlocked;

  });



  return safeFoods;

};




export const generateMealPlan = (safeFoods) => {

  // Helper: get foods by meal type
  const getByMeal = (mealType) => {
    return safeFoods.filter(food =>
      food.meals.includes(mealType)
    );
  };



  const breakfastFoods = getByMeal("breakfast");
  const lunchFoods = getByMeal("lunch");
  const dinnerFoods = getByMeal("dinner");
  const snackFoods = getByMeal("snack");



  // Helper: pick 1–2 items randomly
  const pick = (arr, count = 2) => {

    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, count).map(f => f.name);

  };



  return {

    breakfast: pick(breakfastFoods),

    lunch: pick(lunchFoods),

    dinner: pick(dinnerFoods),

    snack: pick(snackFoods)

  };

};