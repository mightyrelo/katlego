const mongoose = require('mongoose');

const WorkSchema = mongoose.Schema({
    company: String,
    industry: String,
    position: String,
    responsibilities: [String],
    contactPerson: String,
    userId: String,
    startDate: String,
    endDate: String

});

mongoose.model('Work', WorkSchema);