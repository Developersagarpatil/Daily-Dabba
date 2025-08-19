const express = require('express')
const path = require('path')
const connectDB = require('./config/dbconfig')
const errorHandler = require('./middleware/errorHandler')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000


// DB CONNECT
connectDB()

// Body-Parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Default Route
if(process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "/client/dist")));

    app.get("/", (req, res) =>
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
    )
}else{
    app.get("/", (req, res) =>{
        res.send("API is running... (development mode)")
    })
}

app.get("/", (req, res)=>{
    res.json({
        msg:"WELCOME TO DAILY-DABBA API"
    })
})

app.listen(PORT,()=> console.log(`SERVER IS RUNNING AT PORT :${PORT}`))

// auth route
app.use('/api/auth', require("./routes/authRoutes"))

//Admin Routes
app.use("/api/admin", require('./routes/adminRoutes'))

// Meal Routes
app.use("/api/meal" , require('./routes/mealRoute'))

// Order Routes
app.use("/api/order", require("./routes/orderRoutes"))

// Rating Routes
app.use("/api/rating", require("./routes/ratingRoutes"))

//Error Handler
app.use(errorHandler)


// // require('dotenv').config(); // ✅ Load .env
// require('dotenv').config({ path: __dirname + '/.env' });
// const express = require('express');
// const connectDB = require('./config/dbconfig');
// const errorHandler = require('./middleware/errorHandler');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 8080; // ✅ Default to 8080

// // ✅ Enable CORS so React frontend can talk to backend
// app.use(cors());

// // ✅ Connect to MongoDB
// connectDB().catch((err) => {
//     console.error("❌ MongoDB Connection Failed:", err.message);
//     process.exit(1); // Stop server if DB fails
// });



// // ✅ Body Parsers
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ✅ Test Route
// app.get("/", (req, res) => {
//     res.json({
//         msg: "WELCOME TO DAILY-DABBA API"
//     });
// });

// // ✅ Routes
// app.use('/api/auth', require("./routes/authRoutes"));
// app.use('/api/admin', require('./routes/adminRoutes'));
// app.use('/api/meal', require('./routes/mealRoute'));
// app.use('/api/order', require("./routes/orderRoutes"));
// app.use('/api/rating', require("./routes/ratingRoutes"));

// // ✅ Error Handler
// app.use(errorHandler);

// // ✅ Start Server
// app.listen(PORT, () =>
//     console.log(`🚀 SERVER IS RUNNING AT PORT: ${PORT}`)
// );
