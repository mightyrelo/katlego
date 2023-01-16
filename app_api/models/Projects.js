const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    name: String,
    description: String,
    descriptionFull: String,
    term: String,
    language: String,
    tools: [String],
    concepts: [String],
    userId: String,
    link: String,
    github: String 
});

mongoose.model('Project', ProjectSchema);