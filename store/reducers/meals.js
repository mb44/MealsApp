import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE, SET_FILTERS } from "../actions/meals";


const initialState = {
    meals: MEALS, 
    filteredMeals: MEALS,
    favoriteMeals: []
}

// set state to initialState, if state is undefined (when Redux starts up)
const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILTERS: 
            const appliedFilters = action.filters;

            const updatedFilteredMeals = state.meals.filter(meal => {
                if (appliedFilters.glutenFree && !meal.isGlutenFree) {
                    return false;
                }
                if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
                    return false;
                }
                if (appliedFilters.vegetarian && !meal.isVegetarian) {
                    return false;
                }
                if (appliedFilters.vegan && !meal.isVegan) {
                    return false;
                }

                return true;
            });

            return { ...state, filteredMeals: updatedFilteredMeals };
        case TOGGLE_FAVORITE: 
            // -1 means meal not found
            const existingIndex = state.favoriteMeals.findIndex((meal => meal.id === action.mealId));
            
            if (existingIndex >= 0) {
                // Remove meal from favorites
                const updatedFavMeals = [...state.favoriteMeals];
                updatedFavMeals.splice(existingIndex, 1);
                return {...state, favoriteMeals: updatedFavMeals};

            } else {
                // Add meal to favorites

                const meal = state.meals.find(meal => meal.id === action.mealId);
                return {...state, favoriteMeals: state.favoriteMeals.concat(meal) };
            }
        default: return state;
    }

    return state;
};

export default mealsReducer;