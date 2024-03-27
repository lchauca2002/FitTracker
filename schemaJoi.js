const Joi = require('joi');

const elSchema = Joi.object({
    date: Joi.date().required(),
    exercisetype: Joi.string().valid('cardio', 'strength').required(),
    exercisename: Joi.string().required(),
    duration: Joi.when('exercisetype', {
        is: 'cardio',
        then: Joi.number().required(),
        otherwise: Joi.number().optional()
    }),
    calories: Joi.when('exercisetype', {
        is: 'cardio',
        then: Joi.number().required(),
        otherwise: Joi.number().optional()
    }),
    numofsets: Joi.when('exercisetype', {
        is: 'strength',
        then: Joi.number().required(),
        otherwise: Joi.number().optional()
    }),
    repetitions: Joi.when('exercisetype', {
        is: 'strength',
        then: Joi.number().required(),
        otherwise: Joi.number().optional()
    }),
    weight: Joi.when('exercisetype', {
        is: 'strength',
        then: Joi.number().required(),
        otherwise: Joi.number().optional()
    })
});



const updateSchema = Joi.object({
    date: Joi.date().optional(),
    exercisetype: Joi.string().valid('cardio', 'strength').required(),
    exercisename: Joi.string().required(),
    duration: Joi.when('exercisetype', {
        is: 'cardio',
        then: Joi.number().required(),
        otherwise: Joi.number().optional()
    }),
    calories: Joi.when('exercisetype', {
        is: 'cardio',
        then: Joi.number().required(),
        otherwise: Joi.number().optional()
    }),
    numofsets: Joi.when('exercisetype', {
        is: 'strength',
        then: Joi.number().required(),
        otherwise: Joi.number().optional()
    }),
    repetitions: Joi.when('exercisetype', {
        is: 'strength',
        then: Joi.number().required(),
        otherwise: Joi.number().optional()
    }),
    weight: Joi.when('exercisetype', {
        is: 'strength',
        then: Joi.number().required(),
        otherwise: Joi.number().optional()
    })
});

module.exports = {elSchema, updateSchema };

