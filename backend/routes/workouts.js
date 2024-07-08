const express = require('express');
const Workout = require('../models/workoutModel')
const {
    createWorkout,
    oneWorkout,
    allWorkouts,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

const requireAuth = require('../middleware/requireAuth');


const router = express.Router();

//requireAuth for all workout routes
router.use(requireAuth);

//GET all workouts
router.get('/', allWorkouts)

//GET a single workout
router.get('/:id', oneWorkout)

//POST a new single workout
router.post('/', createWorkout)

//DELETE a single workout
router.delete('/:id', deleteWorkout)

//UPDATE a new single workout
router.patch('/:id', updateWorkout)



module.exports = router;
