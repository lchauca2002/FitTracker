const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const exerciseLogger = require('../models/exerciseLogger');
const { isLoggedIn } = require('../middleware.js');

router.get('/', isLoggedIn, catchAsync(async (req, res) => {
        let userExerciseLogs = await exerciseLogger.find({ author: req.user._id }).populate('author');

        if (req.query.fromDate && req.query.toDate) {
            const { fromDate, toDate, cardio, strength } = req.query;
            let filter = { author: req.user._id }; 

            if (fromDate && toDate) {
                filter.date = { $gte: new Date(fromDate), $lte: new Date(toDate) };
            }
            //Both
            if (cardio && strength) {
                filter.$or = [{ exercisetype: 'cardio' }, { exercisetype: 'strength' }];
            } else {
                //Only For Cardio
                if (cardio) {
                    filter.exercisetype = 'cardio';
                }
                //Only For Strength
                if (strength) {
                    filter.exercisetype = 'strength';
                }
            }
            userExerciseLogs = await exerciseLogger.find(filter).populate('author');
        }
        res.render('view_full_report', { userExerciseLogs });
}));

module.exports = router;
