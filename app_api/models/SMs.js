const mongoose = require('mongoose');

const DurationSchema = mongoose.Schema({
    start: String,
    end: String
});

const SMSchema = mongoose.Schema({
    b1: String,
    b2: Number,
    b3: {
        type: Date,
        'default': Date.now
    },
    user: String

});
