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
        'default': Date.now()
    },
    user: String
});

//schema defines model
const MSchema = mongoose.Schema({
    //pathname : propertiesObject
    a1: {
        type: String,
        required: true,
        unique: true
    },
    a2: {
        //data characteristics
        type: Number,
        required: true,
        'default': 0,
        min: 0,
        max: 5
    },
    a3: Number,
    a4: String,
    a5: String,
    facilities: [String],
    duration: DurationSchema,
    sms: [SMSchema],
    createdOn: {
        type: Date,
        'default': Date.now()
    },
    user: String
});

//create model by compiing schema
mongoose.model('M', MSchema);