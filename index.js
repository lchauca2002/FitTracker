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
//work in progress
// app.post('/exerciselog', async(req,res)=>{
//     const newLog = await new addExercise(req.body)
//     res.redirect('/exerciselog');
// })






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
