const mongoose = require('mongoose')
const { Schema } = mongoose

const foodCatogariesSchema = new Schema({
  CategoryName: String,
})

const foodItemsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  options: [
    {
      half: {
        type: Number,
        required: true,
      },
      full: {
        type: Number,
        required: true,
      },
    },
  ],
  description: {
    type: String,
    required: true,
  },
})

const food_catogaries = mongoose.model('food_catogaries', foodCatogariesSchema)
const food_items = mongoose.model('food_items', foodItemsSchema)

module.exports = {food_catogaries, food_items}
