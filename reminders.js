const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const remindersSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const reminders = mongoose.model('reminders', remindersSchema);

module.exports = reminders;
