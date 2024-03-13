const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardioLogSchema = new Schema({
    // user_id:{
    //     type: String,
    //     required: true
    // },
    cardioname: {
        type: String , 
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    calories: {
        type: Number,
        required: false
    }
})

const cardioLog = mongoose.model('cardioLog', cardioLogSchema);

module.exports = cardioLog;
