
const Habit = require('../models/habitsSchema');

const getWeeklyUserHabits = async(req,res)=>{
    try {
        const habits = await Habit.find({user : req.user._id});
        res.render('weekly', { habits });
      } catch (err) {
        console.error('Error retrieving habits', err);
        res.render('profile', { habits: [] });
      }
};

const createHabits =  async (req, res) => {
    try {
      const { name } = req.body;
      const habit = new Habit({
        name,
        user : req.user._id,
        done: new Array(7).fill(false),
      });
      await habit.save();
      res.redirect('/user/profile');
    } catch (err) {
      console.error('Error creating habit', err);
      res.redirect('/');
    }
  };

const updateStatus =  async(req,res)=>{
    const data = await Habit.findByIdAndUpdate(req.params.id , req.body);
    console.log("data updated successfully" , data)
    res.redirect('/user/profile');
  }


const updateHabits =  async (req, res) => {
    try {
      const { habitId, dayIndex, status } = req.body;
      const habit = await Habit.findById(habitId);
      if (!habit) {
        throw new Error('Habit not found');
      }
      habit.done.set(dayIndex, status === 'done');
      await habit.save();
      res.redirect('/weekly');
    } catch (err) {
      console.error('Error updating habit', err);
      res.redirect('/');
    }
  }

const editHabits =  async(req,res)=>{
    const data = await Habit.findById(req.params.id);
  
    res.render("edit" , {data});
  }



const deleteHabits =  (req, res) => {
    const { _id } = req.params;
    Habit.deleteOne({ _id })
      .then(() => {
        console.log("Deleted Todo Successfully!");
        res.redirect("/user/profile");
      })
      .catch((err) => console.log(err));
  }


module.exports = {getWeeklyUserHabits , createHabits , updateStatus , updateHabits , editHabits , deleteHabits};