require('dotenv').config();
const express = require('express');
const colors = require('colors');
const cors =require('cors');
const connectDB = require('./config/db');
// const {notFound,errorhandler} = require('./middleware/errorMiddleware');

// dotenv.config();

const app = express();
app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));



app.get('/', (req, res) => {
  res.send('API is running...');
});

//routes
app.use('/api/users',require('./routes/userRoutes'));
app.use('/api/favorites', require('./routes/favoriteRoutes'));

app.use('/api/vision', require('./routes/visionRoutes'));


// app.use(notFound);
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;


const startServer = async () => {
  try {
    await connectDB(); // Wait for MongoDB connection
    console.log('✅ MongoDB Connected'.cyan.bold);

    app.listen(PORT, () => {
      console.log(`🚀 Server is UP and running on port ${PORT}`.yellow.bold);
    });

  } catch (error) {
    console.error(`❌ Failed to start server: ${error.message}`.red.bold);
    process.exit(1);
  }
};

startServer();
