const express = require('express')
const router = express.Router()

router.post('/foodData', (req,res)=>{
    try {
        res.json({
            food_items : global.food_items,
            food_cat: global.food_cat
        })
    } catch (err) {
        console.log(err)
    }
})
module.exports = router