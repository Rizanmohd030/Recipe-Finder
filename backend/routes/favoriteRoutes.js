const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

const router = express.Router();

/**
 * @desc    Add a recipe to favorites
 * @route   POST /api/favorites
 * @access  Private
 */
router.post(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    const { recipeId } = req.body;

    if (!recipeId) {
      return res.status(400).json({ message: 'Recipe ID is required' });
    }

    const user = await User.findById(req.user._id).select('+favorites');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const exists = user.favorites.some((fav) => fav.recipeId === recipeId);
    if (exists) {
      return res.status(400).json({ message: 'Recipe already in favorites' });
    }

    user.favorites.push({ recipeId });
    await user.save();

    return res.status(201).json({
      message: 'Recipe added to favorites',
      favorites: user.favorites,
    });
  })
);

router.put('/:recipeId',protect,async(req,res)=>{
  try{
    const {recipeId} = req.params;
    const {notes} = req.body;

    if (notes === undefined) {
      return res.status(400).json({ message: 'Notes field is required' });
    }
      const updatedUser = await User.findOneAndUpdate(
              { _id: req.user._id, 'favorites.recipeId': recipeId },
                    { $set: { 'favorites.$.notes': notes } },
                          { new: true }
            );
             if (!updatedUser) {
      return res.status(404).json({ message: 'Favorite recipe not found for this user.' });
    }
     res.status(200).json({
      message: 'Notes updated successfully',
      favorites: updatedUser.favorites,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

/**
 * @desc    Get logged-in user's favorite recipes
 * @route   GET /api/favorites
 * @access  Private
 */
router.get(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('+favorites');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user.favorites);
  })
);

/**
 * @desc    Remove a recipe from favorites
 * @route   DELETE /api/favorites/:recipeId
 * @access  Private
 */
router.delete(
  '/:recipeId',
  protect,
  asyncHandler(async (req, res) => {
    const { recipeId } = req.params;

    const user = await User.findById(req.user._id).select('+favorites');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newFavorites = user.favorites.filter(
      (fav) => fav.recipeId !== recipeId
    );

    user.favorites = newFavorites;
    await user.save();

    return res.status(200).json({
      message: 'Recipe removed successfully',
      favorites: user.favorites,
    });
  })
);




module.exports = router;
