const express = require('express')
const { addRating, getRating } = require('../controllers/ratingControllers')
const protect = require('../middleware/authmiddleware')
const router = express.Router()

router.post("/:mid",protect, addRating)
router.get("/:mid",protect, getRating)

module.exports = router