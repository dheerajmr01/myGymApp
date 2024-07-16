const WorkoutList = require("../models/workoutslist");
const mongoose = require("mongoose");


// GET all workout lists for the form
const getWorkoutsform = async (req, res) => {
    try {
      const workoutLists = await WorkoutList.find();
      res.status(200).json(workoutLists);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // POST a new workouts for the form
  const addWorkoutForm = async (req, res) => {
    try {
      const { title, description } = req.body;
      const savedWorkout = await WorkoutList.create({ title, description });
      res.status(200).json(savedWorkout);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};
  

module.exports = {
    getWorkoutsform,
    addWorkoutForm,
  };