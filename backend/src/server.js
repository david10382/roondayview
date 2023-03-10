const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const helmet = require("helmet")
const dotenv = require("dotenv");

// All the controller router
const foodblogRouter = require("./controllers/foodblogs/foodblogRoutes")
const userRouter = require("./controllers/users/userRoutes")
const contactRouter = require("./controllers/contact/contactRoutes")

dotenv.config();

const app = express()

app.use(helmet())

app.use(express.json())

// Test if the database works
app.get("/", (request, response) => {
    response.json({
        data: "Data Send"
    })
})

// This will link the frontend
const corsOption = {
    origin: ["http://localhost:3000", "https://legendary-arithmetic-c1ee45.netlify.app"], 
    optionsSuccessStatus: 200
}

app.use(cors(corsOption))

const PORT = process.env.PORT || 5000

// Use the routers
app.use("/foodblogs", foodblogRouter)
app.use("/users", userRouter)
app.use("/contact", contactRouter)

module.exports = {
    app,
    PORT
}