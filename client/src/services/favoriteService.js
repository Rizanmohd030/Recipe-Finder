import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/favorites`;

/**
 * Sends a request to the backend to add a recipe to the user's favorites.
 *
 * @param {string} recipeId - The ID of the recipe to be added.
 * @returns {Promise<object>} A promise that resolves to the response data from the backend.
 */
export const addFavorite = async (recipeId) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('You must be logged in to add a favorite.');
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const body = { recipeId };

  try {
    const response = await axios.post(API_URL, body, config);
    return response.data;
  } catch (error) {
    throw error.response.data || new Error('An unknown error occurred.');
  }
};

export const getFavorites = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Authentication token not found.');
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    throw error.response.data || new Error('Failed to fetch favorites.');
  }
};

export const removeFavorite = async (recipeId) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Authentication token not found.');
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete(`${API_URL}/${recipeId}`, config);
    return response.data;
  } catch (error) {
    throw error.response.data || new Error('Failed to remove favorite.');
  }
};

/**
 * Sends a PUT request to the backend to update the notes for a specific favorite recipe.
 * This is a protected action and requires a JWT for authorization.
 *
 * @param {string} recipeId - The ID of the recipe whose notes are being updated.
 * @param {string} notes - The new notes content to be saved.
 * @returns {Promise<object>} A promise that resolves to the success message from the backend.
 */
export const updateFavoriteNotes = async (recipeId, notes) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Authentication token not found.');
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const body = { notes };

  try {
    const response = await axios.put(`${API_URL}/${recipeId}`, body, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to update notes.');
  }
};
