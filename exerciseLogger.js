const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseLogSchema = new Schema({
    // user_id:{
    //     type: String,
    //     required: true
    // },
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
            return this.exerciseType === 'cardio';
        }
    },
    calories: {
        type: Number,
        required: function () {
            return this.exerciseType === 'cardio'; // Require only for cardio
        }
    },
    strengthname: {
        type: String,
        required: function () {
            return this.exerciseType === 'strength'; // Require only for strength
        }
    },
    numofsets: {
        type: Number,
        required: function () {
            return this.exerciseType === 'strength'; // Require only for strength
        }
    },
    repetitions: {
        type: Number,
        required: function () {
            return this.exerciseType === 'strength'; // Require only for strength
        }
    },
    weight: {
        type: Number,
        required: function () {
            return this.exerciseType === 'strength'; // Require only for strength
        }
    }
});

const exerciseLog = mongoose.model('exerciseLog', exerciseLogSchema);

module.exports = exerciseLog;
