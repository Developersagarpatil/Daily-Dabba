const Meal = require("../models/mealModel")
const Rating = require("../models/ratingModel")

const getMeals = async(req, res)=>{

    const meals = await Meal.find()
    if(!meals){
        res.status(404)
        throw new Error("Meals not found");
        
    }
    res.status(200).json(meals)
}

const getMeal = async(req, res)=>{

    const meal = await Meal.findById(req.params.mid)
    if(!meal){
        res.status(404)
        throw new Error("Meal not found");
        
    }
    const rating = await Rating.find({meal : meal._id})
    if(!rating){
        res.status(200).json(meal)
    }
    res.status(200).json({ _id : meal._id, name : meal.name, image : meal.image, description : meal.description, price : meal.price, isVeg : meal.isVeg, isActive : meal.isActive})
}

module.exports = {getMeal, getMeals}