const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        isVeg: {
            type: Boolean,
            required: true
        },
        price: {
            type: Number,
            default: 10,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        isActive :{
            type : Boolean,
            required : true,
            default : true
        }
    },
    {
        timestamps: true // ✅ Adds createdAt and updatedAt automatically
    }
);

module.exports = mongoose.model('Meal', mealSchema);
