const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const {elSchema , updateSchema} = require('../schemaJoi.js');

const catchAsync = require('../utils/catchAsync');
const cardioExercise = require('../models/cardioExercise');
const strengthExercise = require('../models/strengthExercise');
const exerciseLogger = require('../models/exerciseLogger');
const ExpressError = require("../utils/ExpressError");
const {isLoggedIn} = require('../middleware.js');

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

const updateExercsieLogSchema = (req,res,next) =>{
    //we are trying to ignore the validation of id since we want to validate the other fields.
    const { _id, ...bodywithoutId } = req.body;
    const {error} = updateSchema.validate(bodywithoutId);
    if(error){
        const msg = error.details.map(el => updateSchema.message).join(',')
        throw new ExpressError(msg,400)
    }else{
        next();
    }
}

//allows us to see the exerciselog //works
router.get('/', isLoggedIn, catchAsync(async (req, res) => {
    const exerciseLog = await exerciseLogger.find({}).populate('author');
    //console.log(exerciseLog);
    //const exerciseLog = await cardioLog.find({});
    res.render('exerciselog', { exerciseLog });
}))

const date = new Date().toLocaleDateString();
const nextday = new Date();
nextday.setDate(nextday.getDate() + 1);
const nextdaystring = nextday.toLocaleDateString();


router.get('/', isLoggedIn, catchAsync(async (req, res) => {
    const exerciseLog = await exerciseLogger.find({date:{ $gte: new Date(date), $lt: new Date(nextdaystring)}, author:req.user}).populate('author');
    res.render('exerciselog', { exerciseLog });
}))


//this post functions as the top 2 post i had previously
router.post('/', isLoggedIn, validateExercsieLogSchema , catchAsync(async (req, res) => {
    const exercisetype = req.body.exercisetype;
    // Ensure workoutType is 'cardio' and cardioname is provided
    if (exercisetype === 'cardio') {
        const cardioExists = await cardioExercise.exists({ name: req.body.exercisename });

        // Check if cardio name already exists
        if (cardioExists) {
            // Cardio name already exists, don't add a new cardio name
            const newLog = new exerciseLogger(req.body);
            newLog.author = req.user._id;
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
            newLog.author = req.user._id;
            await newLog.save();
            console.log('Cardio exercise logged:', newLog);
        }
    }else if(exercisetype === 'strength'){
        const strengthExists = await strengthExercise.exists({ name: req.body.exercisename });
        
        //Checking if Strength name exists
        if(strengthExists){
            //Strength exists add to log only
            const newLog = new exerciseLogger(req.body);
            newLog.author = req.user._id;
            await newLog.save();
            console.log('Strength Exercise Logged:', newLog);
        }else {
            const newExercise = new strengthExercise({name: req.body.exercisename});
            await newExercise.save();
            console.log('New Strength Exercise added:', newExercise);

            //Log
            const newLog = new exerciseLogger(req.body);
            newLog.author = req.user._id;
            await newLog.save();
            console.log('Strength Exercise Logged:', newLog);
        }
    }
    else{
        req.flash('error', 'Uknown Exercise Type');
        res.redirect('/exerciselog');
    }
    req.flash('success', 'Successfully Added a Exercise to the Log');
    res.redirect('/exerciselog');
}))



//Allows us to update our exerciseLogger wether it is a cardio or a strength workout
router.put('/', isLoggedIn, updateExercsieLogSchema , catchAsync(async (req, res) => {
    console.log(req.body);
    let updateData = {};
    // Find the exercise by ID
    const exercise = await exerciseLogger.findById(req.body._id);// We are using _id because that is how we are getting the data
    // Check if the current user is the author of the exercise
    if (!exercise.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that');
        return res.redirect('/exerciselog');
    }

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
    }else{
        req.flash('error', 'Unable to edit');
        res.redirect('/exerciselog');
    }
    const updatedExercise = await exerciseLogger.findByIdAndUpdate(req.body._id, updateData, { runValidators: true, new: true });
    // const updatedExercise = await exerciseLogger.findByIdAndUpdate(id, updateData, { runValidators: true, new: true });
    req.flash('success', 'Successfully Updated your values');
    res.redirect('/exerciselog');
}))


//Deletes workouts from the log   *already works for both since we are using id*
router.delete('/', isLoggedIn, catchAsync(async (req, res) => {
   const id = req.body.id;
   // console.log(req.body);
    const objectId = mongoose.Types.ObjectId.createFromHexString(id);
    const deleteverify = await exerciseLogger.findById(id);
    if(!deleteverify.author.equals(req.user._id)){
        req.flash('error', 'You do not have permission to do that');
        return res.redirect('/exerciselog');
    }
    const deleteExercise = await exerciseLogger.findByIdAndDelete(objectId);
    if(!deleteExercise){
        req.flash('error', 'Exercise not found or already deleted');
        res.redirect('/exerciselog');
    }else{
    req.flash('success', 'Successfuly Deleted the Exercise');
    res.redirect('/exerciselog');
    }
}))

module.exports = router;
