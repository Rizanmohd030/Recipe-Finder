const express =require('express');

const {protect} = require('../middleware/authMiddleware');

const User = require('../models/User'); 

const asyncHandler = require('express-async-handler');

const router = express.Router();

//get favoritess
const getFavorites = asyncHandler(async(req,res)=>{
  const user = await User.findById(req.user._id);

  if(user){
    res.status(200).json(user.favorites);

  }else{
    res.status(400);
    throw new Error(" User not found");
  }
});


const addFavorite = asyncHandler(async(req,res)=>{
    const {recipeId} = req.body;

     if (!recipeId) {
    res.status(400); 
    throw new Error('Recipe ID is required');
  }

    const user = await User.findById(req.user._id);

    if(user){
         if (user.favorites.includes(recipeId)) {
      res.status(400); 
      throw new Error('Recipe is already in favorites');
    }
    user.favorites.push(recipeId);

    await user.save();
    res.status(201).json({
      message: 'Recipe added to favorites successfully',
      favorites: user.favorites,
    });
  } else {
    // This is an unlikely edge case if the token is valid but the user was deleted.
    res.status(404);
    throw new Error('User not found');
  }
});
    


//remove favorite
const removeFavorite = asyncHandler(async (req, res) => {
  const { recipeId } = req.params;

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
     $pull: { favorites: recipeId },
    },
    {
     new: true,
    }
  );

  if (updatedUser) {
   
    res.status(200).json({
      message: 'Recipe removed from favorites successfully',
      favorites: updatedUser.favorites,
    });
  } else {
   
    res.status(404);
    throw new Error('User not found');
  }
});

router.route('/')
.get(protect,getFavorites)
 .post(protect,addFavorite);
 
 //delete requires dynamic parameters
 router.route('/:recipeId')
      .delete(protect, removeFavorite);


module.exports = router;      

