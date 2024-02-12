const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();

const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

// middlewares
const corsOptions = {
    origin: "https://test-w6ov.onrender.com" // frontend URI (ReactJS)
}
app.use(express.json());
app.use(cors(corsOptions));

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })

// routes
app.use('https://test-backend-xt6n.onrender.com/api/workouts', workoutRoutes)
app.use('https://test-backend-xt6n.onrender.com/api/user', userRoutes)

// connect MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
    const PORT = process.env.PORT || 8000
    app.listen(PORT, () => {
        console.log(`App is Listening on PORT ${PORT}`);
    })
}).catch(err => {
    console.log(err);
});

// route
app.get("/", (req, res) => {
    res.status(201).json({message: "Connected to Backend!"});
});