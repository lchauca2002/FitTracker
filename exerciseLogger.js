const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseLogSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    exercisetype: {
        type: String,
        enum: ['cardio', 'strength'],
        required: true
    },
    exercisename: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: function () {
            return this.exercisetype === 'cardio';
        }
    },
    calories: {
        type: Number,
        required: function () {
            return this.exercisetype === 'cardio'; // Require only for cardio
        }
    },
    numofsets: {
        type: Number,
        required: function () {
            return this.exercisetype === 'strength'; // Require only for strength
        }
    },
    repetitions: {
        type: Number,
        required: function () {
            return this.exercisetype === 'strength'; // Require only for strength
        }
    },
    weight: {
        type: Number,
        required: function () {
            return this.exercisetype === 'strength'; // Require only for strength
        }
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const exerciseLog = mongoose.model('exerciseLog', exerciseLogSchema);

module.exports = exerciseLog;
