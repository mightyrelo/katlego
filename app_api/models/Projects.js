const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    name: String,
    description: String,
    term: String,
    language: String,
    tools: [String],
    concepts: [String],
    userId: String 
});

mongoose.model('Project', ProjectSchema);