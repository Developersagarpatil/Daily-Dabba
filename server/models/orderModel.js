// const {mongoose} = require ("mongoose")

// const orderSchema = new mongoose.Schema({

//     user: {
//         type : mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required : true
//     },
//     meal : {
//         type : mongoose.Schema.Types.ObjectId,
//         ref: 'Meal',
//         required : true
//     },
//     status:{
//         type : String,
//         enum : ['pending', 'delivered', 'cancelled'],
//         default : 'pending',
//         required : true        
//     }
// },{
//     Timestamp: true
// })

// module.exports = mongoose.model('Order', orderSchema)

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        meal: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Meal',
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'delivered', 'cancelled'],
            default: 'pending',
            required: true
        }
    },
    {
        timestamps: true // ✅ Enables createdAt and updatedAt
    }
);

module.exports = mongoose.model('Order', orderSchema);
