const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutListSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("WorkoutList", workoutListSchema);
