const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Joi = require('joi');
const elSchema = require('./schemaJoi.js');
const catchAsync = require('./utils/catchAsync');
const exerciselogRoutes = require('./routes/exerciselog');
const usersRoutes = require('./routes/users');
const viewFullReportRoute = require('./routes/view_full_report');
const findnearyouRoute = require('./routes/findnearyou');
const ejsmate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const { isLoggedIn } = require('./middleware.js');
const reminders = require('./models/reminders');

mongoose.set('strictQuery', true);
const cardioExercise = require('./models/cardioExercise');
const strengthExercise = require('./models/strengthExercise');
const exerciseLogger = require('./models/exerciseLogger');
const ExpressError = require("./utils/ExpressError");
const { get } = require("http");

mongoose.connect('mongodb://127.0.0.1:27017/FitTracker')
    .then(() => {
        console.log('Mongo Connection Open!');
    })
    .catch(err => {
        console.log('Oh No! Mongo connection error');
        console.log(err);
    })


app.engine('ejs', ejsmate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


const sessionConfig = {
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user; //currentUser is used for our conditionals in ejs while req.user._id can be used for like routes
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/exerciselog', exerciselogRoutes);
app.use('/view_full_report', viewFullReportRoute);
app.use('/findnearyou', findnearyouRoute);
app.use('/', usersRoutes);


//allows us to see home page
app.get('/', (req,res) => {
    res.render('home.ejs');
})

//This allows us to have the database pass on all the exercises when the person will add a exercise to their log
app.get('/add_to_log', catchAsync(async(req,res)=>{
    const addExercise = await cardioExercise.find({});
    console.log(addExercise);
    res.render('add_to_log.ejs',{ addExercise });
}))

app.get('/add_to_strength', catchAsync(async (req,res) => {
    const addSExercise = await strengthExercise.find({});
    res.render('add_to_strength.ejs', { addSExercise});
}))

app.get('/add_new_workout', catchAsync(async (req, res) => {
    res.render('add_new_workout');
}))

app.get('/add_new_sworkout', catchAsync(async (req,res) => {
    res.render('add_new_sworkout');
}))


const getStartOfWeek = new Date();
getStartOfWeek.setUTCDate(getStartOfWeek.getDate() - getStartOfWeek.getDay());
getStartOfWeek.setUTCHours(0, 0, 0, 0); // Set hours in UTC
const getEndOfWeek = new Date(getStartOfWeek);
getEndOfWeek.setUTCDate(getStartOfWeek.getUTCDate() + 7);
console.log(getStartOfWeek.toUTCString());


app.get('/progress', isLoggedIn, async (req, res) => {
    const exerciseLog = await exerciseLogger.find({ exercisetype: 'cardio', date: { $gte: getStartOfWeek, $lte: getEndOfWeek }, author: req.user }).sort({ date: 1 });
    res.render('progress', { exerciseLog });
});






app.get('/calendar',isLoggedIn, async (req, res) => {
    res.render('calendar');
});

app.get('/reminders', isLoggedIn, async (req, res) => {
    const remindersData = await reminders.find({ author: req.user._id });
    res.json(remindersData);
});

app.post('/calendar', isLoggedIn, async (req, res) => {
    const eventData = req.body;
    eventData.author = req.user._id;
    const newEvent = await reminders.create(eventData);
    res.status(200).json(newEvent);
});

app.put('/calendar', isLoggedIn, async (req, res) => {
    const eventId = req.body.eventId;
    const eventData = req.body;
    const updatedEvent = await reminders.findOneAndUpdate({ _id: eventId, author: req.user._id }, eventData, { new: true });
    res.status(200).json(updatedEvent);
});

app.delete('/calendar', isLoggedIn, async (req, res) => {
    const eventId = req.body.eventId;
    const deletedEvent = await reminders.findOneAndDelete({ _id: eventId, author: req.user._id });
});

//allows us to see caloricbalance
app.get('/caloricbalance',(req,res)=>{
    res.render('caloricbalance.ejs');
})

app.all('*', (req,res,next)=>{
    next(new ExpressError('Page Not Found',404));
})

app.use((err,req,res,next)=>{
    const{statusCode = 500} = err;
    if(!err.message) err.message = 'Something Went Wrong';
    res.status(statusCode).render('error',{ err });
})

app.listen(3000,()=>{
    console.log("Working");
})
