const mongoose = require('mongoose');
//super model
const WorkerSchema = mongoose.Schema({
    userId: String
});

mongoose.model('Worker', WorkerSchema);