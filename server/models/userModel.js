// const { default: mongoose } = require("mongoose")

// const userSchema = new mongoose.Schema({
//     name:{
//         type: String,
//         require:[true,"Please Enter Email"]
//     },
//     email:{
//         type: String,
//         unique : true,
//         require:[true,"Please Enter Email"]
//     },
//     phone:{
//         type: String,
//         unique : true,
//         require:[true,"Please Enter Email"]
//     },
//     password:{
//         type: String,
//         require:[true,"Please Enter Email"]
//     },
//     isAdmin:{
//         type: Boolean,
//         require:true,
//         default : false
//     }
// },{
//     timestamps: true
// })

// module.exports = mongoose.model('User', userSchema)

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter name"]
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Please enter email"]
        },
        phone: {
            type: String,
            unique: true,
            required: [true, "Please enter phone number"]
        },
        password: {
            type: String,
            required: [true, "Please enter password"]
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true // ✅ Automatically adds createdAt and updatedAt
    }
);

module.exports = mongoose.model('User', userSchema);
