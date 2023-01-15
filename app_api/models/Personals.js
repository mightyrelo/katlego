const mongoose = require('mongoose');

const PersonalSchema = mongoose.Schema({
    name: String,
    gender: String,
    idNo: Number,
    race: String,
    languages: [String],
    passions: [String],
    maritalStatus: String,
    userId: String,
    nationality: String 

});

mongoose.model('Personal', PersonalSchema);
