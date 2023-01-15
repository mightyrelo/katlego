const mongoose = require('mongoose');
require('../models/Educations');
const Education = mongoose.model('Education');

const sendJSONResponse = (res, code, content) => {
    res
      .status(code)
      .json(content);
};

//collection endpoint
const educationsCreateOne = (req, res) => {
    if(!req.body.institution || !req.body.qualification || !req.body.startDate  || !req.body.endDate || !req.body.interests)
      {sendJSONResponse(res, 400, {"message":"all fields required"}); return}
    const formEducation = {
        institution: req.body.institution,
        qualification: req.body.qualification,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        interests: req.body.interests.split(','),
        userId: req.body.userId,
    };
    Education
     .create(formEducation, (err, dbEducation) => {
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!dbEducation) {sendJSONResponse(res, 404, {"message":"education could not be saved"}); return}
        sendJSONResponse(res, 201, dbEducation);
     })
};

const educationsReadAll = (req, res) => {
    Education
     .find()
     .exec((err, educations)=>{
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!educations) {sendJSONResponse(res, 404, {"message":"educations not found"}); return}
        sendJSONResponse(res, 200, educations);
     });
};


//document end point
const educationsReadOne = (req, res) => {
    const educationId = req.params.educationId;
    if(!educationId) {sendJSONResponse(res, 400, {"message":"education id required"}); return}
    Education
     .findById(educationId)
     .exec((err, education)=>{
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!education) {sendJSONResponse(res, 404, {"message":"education not found"}); return}
        sendJSONResponse(res, 200, education);
     });
};

const doUpdateEducations = (req, res, education) => {
    if(req.body.institution) {
        education.institution = req.body.institution;
    }
    if(req.body.qualification) {
        education.qualification = req.body.qualification;
    }
    if(req.body.startDate) {
        education.startDate = req.body.startDate;
    }
    if(req.body.endDate) {
        education.endDate = req.body.endDate;
    }
    if(req.body.interests) {
      education.interests = req.body.interests;
    }

    education.save((err, savedEducation)=>{
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!savedEducation) {sendJSONResponse(res, 404, {"message":"education could not be updated"}); return}
        sendJSONResponse(res, 200, savedEducation);            
    })
}

const educationsUpdateOne = (req, res) => {
    if(!req.params.educationId) {sendJSONResponse(res, 400, {"message":"education id required"}); return}
    Education
     .findById(req.params.educationId)
     .exec((err, education)=> {
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!education) {sendJSONResponse(res, 404, {"message":"education not found"}); return}
        doUpdateEducations(req, res, education);
     });
};

const educationsDeleteOne = (req, res) => {
    if(!req.params.educationId) {sendJSONResponse(res, 400, {"message":"education id required"}); return;}
    Education
     .findByIdAndRemove(req.params.educationId)
     .exec((err, edu) => {
        if(err) {sendJSONResponse(res, 404, err); return;}
        sendJSONResponse(res, 204, null);
     });
};


module.exports = {
    educationsCreateOne,
    educationsReadAll,
    educationsReadOne,
    educationsUpdateOne,
    educationsDeleteOne,
};