require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const exercisesRoutes = require('./routes/workoutform')

//EXPRESS APP
const app = express();

//middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path,req.method)
    next()
})

app.use('/api/forms', exercisesRoutes)
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)


//connect to db
const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");
        // Start the Express server only after successful DB connection
        if (require.main === module) { //Checking if server is running already...if not connect to server
            app.listen(process.env.PORT, () => {
                console.log(`Server is running on port localhost:${process.env.PORT}`);
            });
        }

    } catch (error) {
        console.error("Error connecting to DB:", error);
        process.exit(1);
    }
};

connectToDb();
 