const mongoose = require('mongoose'); //import mongoose ,the library that connects Node.js to MongoDB

const connectDB = async () => { //function that connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGO_URI); // FIXED: Removed useless 'conn' assignment
    console.log(`MongoDB connected`); //print the host of the mongodb cluster if connected successfully 
  } catch (err) {
    console.error(err.message); // if the connection fail prints error
    process.exit(1);//stops the server
  }
};

module.exports = connectDB; // export and use it in app.js