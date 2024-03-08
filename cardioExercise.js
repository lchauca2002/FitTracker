const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardioSchema = new Schema({
    name: {
        type: 'string' , 
        required: true
    }
})

const cardioExercise = mongoose.model('cardioExercise', cardioSchema);

module.exports = cardioExercise;
