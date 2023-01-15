const mongoose = require('mongoose');

const EducationSchema = mongoose.Schema({
    institution: String,
    qualification: String,
    startDate: String,
    endDate: String,
    interests: [String],
    userId: String

});

mongoose.model('Education', EducationSchema);