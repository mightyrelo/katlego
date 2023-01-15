const mongoose = require('mongoose');
require('../models/Works');
const Work = mongoose.model('Work');

const sendJSONResponse = (res, code, content) => {
    res
      .status(code)
      .json(content);
};

//collection endpoint
const worksCreateOne = (req, res) => {
    if(!req.body.company || !req.body.industry || !req.body.position  || !req.body.contactPerson || !req.body.responsibilities || !req.body.startDate || !req.body.endDate)
      {sendJSONResponse(res, 400, {"message":"all fields required"}); return}
    const formWork = {
        company: req.body.company,
        industry: req.body.industry,
        position: req.body.position,
        contactPerson: req.body.contactPerson,
        responsibilities: req.body.responsibilities.split(','),
        userId: req.body.userId,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    };
    Work
     .create(formWork, (err, dbWork) => {
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!dbWork) {sendJSONResponse(res, 404, {"message":"work could not be saved"}); return}
        sendJSONResponse(res, 201, dbWork);
     })
};

const worksReadAll = (req, res) => {
    Work
     .find()
     .exec((err, works)=>{
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!works) {sendJSONResponse(res, 404, {"message":"works not found"}); return}
        sendJSONResponse(res, 200, works);
     });
};


//document end point
const worksReadOne = (req, res) => {
    const workId = req.params.workId;
    if(!workId) {sendJSONResponse(res, 400, {"message":"work id required"}); return}
    Work
     .findById(workId)
     .exec((err, work)=>{
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!work) {sendJSONResponse(res, 404, {"message":"work not found"}); return}
        sendJSONResponse(res, 200, work);
     });
};

const doUpdateWorks = (req, res, work) => {
    if(req.body.company) {
        work.company = req.body.company;
    }
    if(req.body.industry) {
        work.industry = req.body.industry;
    }
    if(req.body.position) {
        work.position = req.body.position;
    }
    if(req.body.contactPerson) {
        work.contactPerson = req.body.contactPerson;
    }
    if(req.body.responsibilities) {
      work.responsibilities = req.body.responsibilities;
    }
    if(req.body.startDate) {
      work.startDate = req.body.startDate;
    }
    if(req.body.endDate) {
      work.endDate = req.body.endDate;
    }

    work.save((err, savedWork)=>{
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!savedWork) {sendJSONResponse(res, 404, {"message":"work could not be updated"}); return}
        sendJSONResponse(res, 200, savedWork);            
    })
}

const worksUpdateOne = (req, res) => {
    if(!req.params.workId) {sendJSONResponse(res, 400, {"message":"work id required"}); return}
    Work
     .findById(req.params.workId)
     .exec((err, work)=> {
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!work) {sendJSONResponse(res, 404, {"message":"work not found"}); return}
        doUpdateWorks(req, res, work);
     });
};

const worksDeleteOne = (req, res) => {
    if(!req.params.workId) {sendJSONResponse(res, 400, {"message":"work id required"}); return;}
    Work
     .findByIdAndRemove(req.params.workId)
     .exec((err, edu) => {
        if(err) {sendJSONResponse(res, 404, err); return;}
        sendJSONResponse(res, 204, null);
     });
};


module.exports = {
    worksCreateOne,
    worksReadAll,
    worksReadOne,
    worksUpdateOne,
    worksDeleteOne,
};