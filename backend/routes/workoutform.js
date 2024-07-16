const express = require("express");
const workoutList = require("../models/workoutslist");
const {
    getWorkoutsform,
    addWorkoutForm
  } = require("../controllers/workoutlistController");


const router = express.Router();


router.get("/", getWorkoutsform);

router.post("/", addWorkoutForm);


module.exports = router;
