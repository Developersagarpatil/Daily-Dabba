const express = require('express')
const { getMeal, getMeals } = require('../controllers/mealControllers')

const router = express.Router()

router.get("/", getMeals)
router.get("/:mid", getMeal)


module.exports = router