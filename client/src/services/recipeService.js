import axios from 'axios';
const API_URL = import.meta.env.VITE_RECIPE_API_URL;

const recipeApi = axios.create({
    baseURL: API_URL,
});

// /**
//  * Searches for recipes based on a query string.
//  * @param {string} query - The search term (e.g., 'chicken', 'beef').
//  * @returns {Promise<Array>} A promise that resolves to an array of meal objects.
//  *                           Returns an empty array if no meals are found or if an error occurs.
//  */

export const searchRecipes = async(query)=>{
    try{
            const response = await recipeApi.get(`/search.php?s=${query}`);
            return response.data.meals || [];
    }catch(error){
            console.error('Error fetching recipes:', error);
            return [];
    }
};
/**
 * Fetches the full details of a single recipe by its ID.
 * @param {string} id - The ID of the recipe to fetch (e.g., '52772').
 * @returns {Promise<Object|null>} A promise that resolves to a single meal object,
 *                                  or null if not found or an error occurs.
 */

export const getRecipeById = async(id) =>{
    try{
        const response = await recipeApi.get(`/lookup.php?i=${id}`);
            return response.data.meals ? response.data.meals[0] : null;

    }catch(error){
        console.error(`Error fetching recipe by ID ${id}:`, error);
    return null;
}
};


