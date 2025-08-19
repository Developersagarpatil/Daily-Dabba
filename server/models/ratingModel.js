const {mongoose} = require("mongoose")

const ratingSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },
    meal : {
         type : mongoose.Schema.Types.ObjectId,
        ref: 'Meal',
        required : true
    },
    text : {
         type : String,
         required : true,
    },
    rating : {
         type : Number,
        default : 5,
        required : true
    }
},{
    timestamps : true
})

module.exports = mongoose.model('Rating', ratingSchema)

// const mongoose = require("mongoose");

// const ratingSchema = new mongoose.Schema(
//     {
//         user: {
//             type: mongoose.Schema.Types.ObjectId, // ✅ fixed ObjectId typo
//             ref: 'User',
//             required: true
//         },
//         meal: {
//             type: mongoose.Schema.Types.ObjectId, // ✅ fixed ObjectId typo
//             ref: 'Meal',
//             required: true
//         },
//         text: {
//             type: String,
//             required: true
//         },
//         rating: {
//             type: Number,
//             default: 5,
//             required: true
//         }
//     },
//     {
//         timestamps: true // ✅ fixed typo
//     }
// );

// module.exports = mongoose.model('Rating', ratingSchema);
