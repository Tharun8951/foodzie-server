const express = require('express')
const { food_catogaries, food_items } = require('../Models/FoodData')
const router = express.Router()

router.get('/foodData', async (req,res)=>{
    try {
        const foodItems = await food_items.find({})
        const foodCat = await food_catogaries.find({})
        res.json({
            food_items : foodItems,
            food_cat: foodCat
        })
    } catch (err) {
        console.log(err)
    }
})
module.exports = router