const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    cellphones: [String],
    emails: [String],
    facebook: String,
    twitter: String,
    instagram: String,
    address: String,
    userId: String
    
});

mongoose.model('Contact', ContactSchema);