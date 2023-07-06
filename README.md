# Personalized User based Habit Tracking App


# Config
  The config folder contains all the files related to the database connection and the passport js authentication  
# Controllers
  - HabitControllers contain all the actions for the habitRoutes assosiated with the particular user
  - HomeControllers contain action for the Home routes to show the view of the Home page
  - UserCOntrollers contains the action for the UserRoutes for the user Authentaction done throuh Passport Js library
# Models
  The folder contains UserSchema for registering user and Habits Schema linked with the user , for the User Habits.
# Routes
  - HabitsRoutes for adding Habits of the user , deleting , updating User Habits
  - HomeRoutes for Home View
  - User Routes for user sign-up , sign-in and authentiatin user.
 # Views
    Contains all the views for the routes , as useer get loggen in , the user will be redirected to the profile.ejs , where he can create     his habits . Along with that a Weekly view is provided so that user can track the seven days Status of his Habits.
