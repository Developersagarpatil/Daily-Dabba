const User = require("../models/userModel");
const Meal = require("../models/mealModel");
const Rating = require("../models/ratingModel");

// ➡️ Add Rating
const addRating = async (req, res) => {
  try {
    const { text, rating } = req.body;

    if (!text || !rating) {
      return res.status(400).json({ message: "Please fill all details." });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const meal = await Meal.findById(req.params.mid);
    if (!meal) {
      return res.status(404).json({ message: "Meal not found." });
    }

    const newRating = await Rating.create({
      user: user._id,
      meal: meal._id,
      text,
      rating,
    });

    if(!newRating) {
      return res.status(400).json({ message: "Rating not created." });
    }


    const ratingData = {
      _id : newRating.id,
      rating : newRating.rating,
      text : newRating.text,
      user : user,
      meal : meal,
      createdAt : newRating.createdAt
    }

    const populatedRating = await Rating.findById(newRating._id)
      .populate("user")
      .populate("meal");

    res.status(201).json(populatedRating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// ➡️ Get All Ratings for a Meal
const getRating = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.mid);
    if (!meal) {
      return res.status(404).json({ message: "Meal not found." });
    }

    const viewAllRatings = await Rating.find({ meal: req.params.mid })
      .populate("meal")
      .populate("user");

    if (!viewAllRatings || viewAllRatings.length === 0) {
      return res.status(404).json({ message: "No ratings found." });
    }

    res.status(200).json(viewAllRatings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = { addRating, getRating };
