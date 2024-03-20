const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Joi = require('joi');
const elSchema = require('./schemaJoi.js');
const catchAsync = require('./utils/catchAsync');

mongoose.set('strictQuery', true);
const cardioExercise = require('./models/cardioExercise');
const strengthExercise = require('./models/strengthExercise');
const exerciseLogger = require('./models/exerciseLogger');
const ExpressError = require("./utils/ExpressError");

mongoose.connect('mongodb://127.0.0.1:27017/FitTracker')
    .then(()=>{
        console.log('Mongo Connection Open!');
    })
    .catch(err=>{
        console.log('Oh No! Mongo connection error');
        console.log(err);
    })

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(express.json()); //parses incoming requests with json payloads
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

const validateExercsieLogSchema = (req,res,next) =>{
    //we are trying to ignore the validation of id since we want to validate the other fields.
    const { _id, ...bodywithoutId } = req.body;
    const {error} = elSchema.validate(bodywithoutId);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg,400)
    }else{
        next();
    }
}

// console.log(exerciseData);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//allows us to see home page
app.get('/', (req,res) => {
    res.render('home.ejs');
})

//allows us to see the exerciselog
app.get('/exerciselog',catchAsync((req,res)=>{
    res.render('exerciselog');
}))

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


//this post functions as the top 2 post i had previously
app.post('/exerciselog', validateExercsieLogSchema , catchAsync(async (req, res) => {
    const exercisetype = req.body.exercisetype;
    // Ensure workoutType is 'cardio' and cardioname is provided
    if (exercisetype === 'cardio') {
        const cardioExists = await cardioExercise.exists({ name: req.body.exercisename });

        // Check if cardio name already exists
        if (cardioExists) {
            // Cardio name already exists, don't add a new cardio name
            const newLog = new exerciseLogger(req.body);
            await newLog.save();
            console.log('Cardio exercise logged:', newLog);
        } else {
            // Cardio name doesn't exist, add a new cardio name
            // Adds this new exercise to the database for future searches
            const newExercise = new cardioExercise({ name: req.body.exercisename });
            await newExercise.save();
            console.log('New cardio exercise added:', newExercise);

            // Log the new cardio exercise
            const newLog = new exerciseLogger(req.body);
            await newLog.save();
            console.log('Cardio exercise logged:', newLog);
        }
    }else if(exercisetype === 'strength'){
        const strengthExists = await strengthExercise.exists({ name: req.body.exercisename });

        //Checking if Strength name exists
        if(strengthExists){
            //Strength exists add to log only
            const newLog = new exerciseLogger(req.body);
            await newLog.save();
            console.log('Strength Exercise Logged:', newLog);
        }else {
            const newExercise = new strengthExercise({name: req.body.exercisename});
            await newExercise.save();
            console.log('New Strength Exercise added:', newExercise);

            //Log
            const newLog = new exerciseLogger(req.body);
            await newLog.save();
            console.log('Strength Exercise Logged:', newLog);
        }
    }
    res.redirect('/exerciselog');
}))

//Allows us to update our exerciseLogger wether it is a cardio or a strength workout
app.put('/exerciselog', validateExercsieLogSchema , catchAsync(async (req, res) => {
    console.log(req.body);
    let updateData = {};

    if (req.body.exercisetype === 'cardio') {
        updateData = {
            exercisetype: req.body.exercisetype,
            exercisename: req.body.exercisename,
            duration: req.body.duration,
            calories: req.body.calories
        };
    } else if (req.body.exercisetype === 'strength') {
        updateData = {
            exercisename: req.body.exercisename,
            strengthname: req.body.strengthname,
            numofsets: req.body.numofsets,
            repetitions: req.body.repetitions,
            weight: req.body.weight
        };
    }
    const updatedExercise = await exerciseLogger.findByIdAndUpdate(req.body._id, updateData, { runValidators: true, new: true });
    res.redirect('/exerciselog');
}))

//Deletes workouts from the log   *already works for both since we are using id*
app.delete('/exerciselog', catchAsync(async (req, res) => {
   const id = req.body.id;
   // console.log(req.body);
    const objectId = mongoose.Types.ObjectId.createFromHexString(id);
    await exerciseLogger.findByIdAndDelete(objectId);
    res.redirect('/exerciselog');
}))



//allows us to see caloricbalance
app.get('/caloricbalance',(req,res)=>{
    res.render('caloricbalance.ejs');
})
//allows us to see financials
app.get('/financials',(req,res)=>{
    res.render('financials');
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
