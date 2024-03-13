const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
const cardioExercise = require('./models/cardioExercise');

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

// console.log(exerciseData);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//allows us to see home page
app.get('/', (req,res) => {
    res.render('home.ejs');
})
//allows us to see the exerciselog
app.get('/exerciselog',(req,res)=>{
    res.render('exerciselog');
})
//This allows us to have the database pass on all the exercises when the person will add a exercise to their log
app.get('/add_to_log', async(req,res)=>{
    const addExercise = await cardioExercise.find({});
    console.log(addExercise);
    res.render('add_to_log.ejs',{ addExercise });
})

// //adds workouts to log 
// app.post('/exerciselog', async (req, res) => {
//     const newLog = await new cardioLog(req.body);
//     await newLog.save();
//     res.redirect('/exerciselog');
// })

// //Will be able to send the information and save on a database
// app.post('/exerciselog', async(req,res)=>{
//     //Adds workout to your log
//     const newWorkoutLog = new cardioLog(req.body);
//     await newWorkoutLog.save();
//     //Adds this new exercise to the database for future searches
//     const newExercise = new cardioExercise({name: req.body.cardioname});
//     await newExercise.save()
//     res.redirect('/exerciselog');
// })

//this post functions as the top 2 post i had previously
app.post('/exerciselog', async (req, res) => {
    const cardioLogExists = await cardioLog.exists({ cardioname: req.body.cardioname });

    // Check if cardio name already exists
    if (cardioLogExists) {
        // Cardio name already exists, don't add a new cardio name
        const newLog = new cardioLog(req.body);
        await newLog.save();
    } else {
        // Cardio name doesn't exist, add a new cardio name
        const newWorkoutLog = new cardioLog(req.body);
        await newWorkoutLog.save();

        // Adds this new exercise to the database for future searches
        const newExercise = new cardioExercise({ name: req.body.cardioname });
        await newExercise.save();
    }
    res.redirect('/exerciselog');
});


//allows us to see caloricbalance
app.get('/caloricbalance',(req,res)=>{
    res.render('caloricbalance.ejs');
})
//allows us to see financials
app.get('/financials',(req,res)=>{
    res.render('financials');
})

app.listen(3000,()=>{
    console.log("Working");
})
