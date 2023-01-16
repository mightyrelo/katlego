const mongoose = require('mongoose');

const PersonalSchema = mongoose.Schema({
    name: String,
    gender: String,
    idNo: Number,
    passportNo: String,
    licenseNo: String,
    race: String,
    languages: [String],
    passions: [String],
    maritalStatus: String,
    userId: String,
    nationality: String 

});

mongoose.model('Personal', PersonalSchema);
