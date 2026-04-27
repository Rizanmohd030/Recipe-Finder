const User =require ('../models/User');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const generateToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',

        });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public

const registerUser = async(req,res)=>{
    try{
        const {name,email,password} =req.body;

        if(!name || !email || !password){
            res.status(400);
            throw new Error('Please add all fields');
        }
        //check for already exist
        const userExists = await User.findOne({email});
        if(userExists){
            res.status(400);
            throw new Error('User already exists');
        }

        //create user
        const user = await User.create({
            name,
            email,
            password,
        });
        //user created succesfully,, send response
        if(user){
            res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id), // Generate a token for the new user
        });
        
    } else {
      res.status(400); // 400 Bad Request
      throw new Error('Invalid user data');

}
}catch(error){
        const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
        res.status(statusCode).json({ message: error.message });

}
};

// @desc    Authenticate a user & get token
// @route   POST /api/users/login
// @access  Public

const loginUser =async (req,res)=>{
    try{
        const {email,password} = req.body;

        const user = await User.findOne({ email }).select("+password");


        if(user && (await bcrypt.compare(password,user.password))){
                  res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });

        }else{
            res.status(401);
            throw new Error('Invalid credentials');
        }
    }catch(error){
        const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
        res.status(statusCode).json({ message: error.message });
}
};


module.exports = {
    registerUser,
    loginUser,
};
