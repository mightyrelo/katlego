const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    article: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    createdOn: {
        type: Date,
        'default': Date.now
    },
    abstract: {
        type: String
    }

});


mongoose.model('Article', ArticleSchema);