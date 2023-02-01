const mongoose = require('mongoose');
require('../models/Articles');
const Article = mongoose.model('Article');

const sendJSONResponse = (res, code, content) => {
    res
        .status(code)
        .json(content);
};

const articlesReadAll = (req, res) => {
    Article
        .find()
        .exec((err, articles) => {
            if(err) {sendJSONResponse(res, 400, err);return;}
            if(!articles || articles.length == 0) {sendJSONResponse(res, 404, {"message":"no articles found"}); return;}
            sendJSONResponse(res, 200, articles);
        });
};

const articlesCreateOne = (req, res) => {
    if(!req.body.title || !req.body.article || !req.body.author || !req.body.abstract) {sendJSONResponse(res, 400, {"message":"missing fields required"});return;}
    let formArticle = {
        title: req.body.title,
        article: req.body.article,
        author: req.body.author,
        abstract: req.body.abstract
    };
    
    Article
      .create(formArticle, (err,dbArticle) => {
        if(err) {sendJSONResponse(res, 400, err);return;}
            if(!dbArticle) {sendJSONResponse(res, 404, {"message":"article not saved"}); return;}
            sendJSONResponse(res, 201, dbArticle);
        
      });

};

const articlesReadOne = (req, res) => {
    if(!req.params.articleId) { sendJSONResponse(res, 200, {"message":"reading one article"});return;}
    Article 
        .findById(req.params.articleId)
        .exec((err, article) => {
            if(err) {sendJSONResponse(res, 400, err);return;}
            if(!article) {sendJSONResponse(res, 404, {"message":"no article with id found"}); return;}
            sendJSONResponse(res, 200, article);
        });
};

const doUpdateArticle = (req, res, article) => {
    
    if(req.body.title){
        article.title = req.body.title;
    }
    if(req.body.article){
        article.article = req.body.article;
    }
    if(req.body.author){
        article.author = req.body.author;
    }
    if(req.body.abstract){
        article.abstract = req.body.abstract;
    }
  
    article.save((err, dbArticle) => {
        if(err) {sendJSONResponse(res, 400, err);return;}
        if(!article) {sendJSONResponse(res, 404, {"message":"no article with id found"}); return;}
        //article found
        sendJSONResponse(res, 200, dbArticle);
    });

};


const articlesUpdateOne = (req, res) => {
    if(!req.params.articleId) {sendJSONResponse(res, 400,{"message":"missing parameter"});return;}
   
    Article
        .findById(req.params.articleId)
        .exec((err, article) => {
            if(err) {sendJSONResponse(res, 400, err);return;}
            if(!article) {sendJSONResponse(res, 404, {"message":"no article with id found"}); return;}
            //article found
            doUpdateArticle(req, res, article);
        });
};

const articlesDeleteOne = (req, res) => {
    if(!req.params.articleId) {sendJSONResponse(res, 400,{"message":"missing parameter"});return;}
   
    Article
        .findByIdAndRemove(req.params.articleId)
        .exec((err, article) => {
            if(err) {sendJSONResponse(res, 400, err);return;}
            sendJSONResponse(res, 204, null);
        });
    
};

module.exports = {
    articlesReadAll,
    articlesCreateOne,
    articlesReadOne,
    articlesUpdateOne,
    articlesDeleteOne
};


