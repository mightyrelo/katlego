const mongoose = require('mongoose');
require('../models/Personals');
const Personal = mongoose.model('Personal');


const sendJSONResponse = (res, code, content) => {
    res
      .status(code)
      .json(content);
};

//collection endpoint
const personalsCreateOne = (req, res) => {
    if(!req.body.name || !req.body.gender || !req.body.idNo  || !req.body.languages || !req.body.passions || !req.body.maritalStatus || !req.body.nationality || !req.body.race)
      {sendJSONResponse(res, 400, {"message":"all fields required"}); return}
    const formPersonal = {
        name: req.body.name,
        gender: req.body.gender,
        idNo: parseInt(req.body.idNo),
        languages: req.body.languages.split(','),
        passions: req.body.passions.split(','),
        userId: req.body.userId,
        nationality: req.body.nationality,
        race: req.body.race,
        maritalStatus: req.body.maritalStatus,
        passport: req.body.passport,
        license: req.body.licence
    };
    Personal
     .create(formPersonal, (err, dbPersonal) => {
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!dbPersonal) {sendJSONResponse(res, 404, {"message":"personal could not be saved"}); return}
        sendJSONResponse(res, 201, dbPersonal);
     })
};

const personalsReadAll = (req, res) => {
    Personal
     .find()
     .exec((err, personals)=>{
        console.log('greet');
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!personals) {sendJSONResponse(res, 404, {"message":"personals not found"}); return}
        sendJSONResponse(res, 200, personals);
     });
};


//document end point
const personalsReadOne = (req, res) => {
    const personalId = req.params.personalId;
    if(!personalId) {sendJSONResponse(res, 400, {"message":"personal id required"}); return}
    Personal
     .findById(personalId)
     .exec((err, personal)=>{
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!personal) {sendJSONResponse(res, 404, {"message":"personal not found"}); return}
        sendJSONResponse(res, 200, personal);
     });
};

const doUpdatePersonals = (req, res, personal) => {
    if(req.body.name) {
        personal.name = req.body.name;
    }
    if(req.body.gender) {
        personal.gender = req.body.gender;
    }
    if(req.body.nationality) {
        personal.nationality = req.body.nationality;
    }
    if(req.body.race) {
        personal.race = req.body.race;
    }
    if(req.body.maritalStatus) {
        personal.maritalStatus = req.body.maritalStatus;
    }
    if(req.body.idNo) {
        personal.idNo = parseInt(req.body.idNo);
    }
    if(req.body.languages) {
      //personal.languages = req.body.languages;
      personal.languages = req.body.languages.split(',');
    }
    if(req.body.passions){
        personal.passions = req.body.passions;
    }
    personal.save((err, savedPersonal)=>{
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!savedPersonal) {sendJSONResponse(res, 404, {"message":"personal could not be updated"}); return}
        sendJSONResponse(res, 200, savedPersonal);            
    })
}

const personalsUpdateOne = (req, res) => {
    if(!req.params.personalId) {sendJSONResponse(res, 400, {"message":"personal id required"}); return}
    Personal
     .findById(req.params.personalId)
     .exec((err, personal)=> {
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!personal) {sendJSONResponse(res, 404, {"message":"personal not found"}); return}
        doUpdatePersonals(req, res, personal);
     });
};

const personalsDeleteOne = (req, res) => {
    if(!req.params.personalId) {sendJSONResponse(res, 400, {"message":"personal id required"}); return;}
    Personal
     .findByIdAndRemove(req.params.personalId)
     .exec((err, personal) => {
        if(err) {sendJSONResponse(res, 404, err); return;}
        sendJSONResponse(res, 204, null);
     });
};


module.exports = {
    personalsCreateOne,
    personalsReadAll,
    personalsReadOne,
    personalsUpdateOne,
    personalsDeleteOne,
};