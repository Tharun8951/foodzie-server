const mongodb = require('mongodb');
const mongoose = require('mongoose');
const User = require('./Models/User');

const mongoURI = process.env.mongo_uri 
const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });

    console.log('Database connected');

    const fetchedData_Items = await mongoose.connection.db.collection('food_items');
    const fetchedData_Cat = await mongoose.connection.db.collection('food_catogaries');

    const data_items = await fetchedData_Items.find({}).toArray();
    const data_cat = await fetchedData_Cat.find({}).toArray();

    global.food_items = data_items
    global.food_cat = data_cat

    // mongoose.connection.close(); // Close the connection after retrieving data
  } catch (err) {
    console.error(err);
  }
};

module.exports = mongoDB;

