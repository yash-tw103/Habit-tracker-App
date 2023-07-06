const express = require('express');
const router = express.Router();
const Habit = require('../models/habitsSchema');
const habitsControllers = require('../controllers/habitsControllers');

// router.get('/', async (req, res) => {
//   try {
//     const habits = await Habit.find();
//     res.render('index', { habits });
//   } catch (err) {
//     console.error('Error retrieving habits', err);
//     res.render('index', { habits: [] });
//   }
// });

//getting weekly view
router.get('/weekly' , habitsControllers.getWeeklyUserHabits );


//creatin user habbits
router.post('/create', habitsControllers.createHabits);


//updatig user habit to done not done
router.post('/updated/habits/:id' , habitsControllers.updateStatus);


//update habits
router.post('/update', habitsControllers.updateHabits);


//edit habits
router.get("/edit/:id" ,habitsControllers.editHabits);

 


  //deleting habits
  router.get("/delete/:_id" , habitsControllers.deleteHabits);

module.exports = router;

