const mongoose = require('mongoose');
const M = mongoose.model('M');

const sendJSONResponse = (res, code, content) => {
    res
      .status(code)
      .json(content);
};

//list operations
const mCreateOne = (req, res) => {
    if(!req.body.a1 || !req.body.a2 || !req.body.a3 || !req.body.a4 || !req.body.a5 || !req.body.facilities)
      {sendJSONResponse(res, 400, {"message":"all fields required"}); return}
    const formM = {
        a1: req.body.a1,
        a2: parseInt(req.body.a2),
        a3: parseFloat(req.body.a3),
        a4: req.body.a4,
        a5: req.body.a5,
        facilities: req.body.facilities.split(','),
        user: req.body.user
    };
    M
     .create(formM, (err, dbM) => {
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!dbM) {sendJSONResponse(res, 404, {"message":"m could not be saved"}); return}
        sendJSONResponse(res, 201, dbM);
     })
};

const mReadAll = (req, res) => {
    M
     .find()
     .exec((err, ms)=>{
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!ms) {sendJSONResponse(res, 404, {"message":"ms not found"}); return}
        sendJSONResponse(res, 200, ms);
     });
};

//instance operations
const mReadOne = (req, res) => {
    const mId = req.params.mId;
    if(!mId) {sendJSONResponse(res, 400, {"message":"m id required"}); return}
    M
     .findById(mId)
     .exec((err, m)=>{
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!m) {sendJSONResponse(res, 404, {"message":"m not found"}); return}
        sendJSONResponse(res, 200, m);
     });
};

const doUpdateM = (req, res, m) => {
    m.a1 = req.body.a1;
    m.a2 = parseInt(req.body.a2);
    m.a3 = parseFloat(req.body.a3);
    m.a4 = req.body.a4;
    m.a5 = req.body.a5;
    m.facilities = req.body.a1.split(',');
    m.save((err, savedM)=>{
        if(err) {sendJSONResponse(res, 400, err);}
        if(!savedM) {sendJSONResponse(res, 404, {"message":"m could not be updated"});}
        sendJSONResponse(res, 200, savedM);            
    })
}

const mUpdateOne = (req, res) => {
    if(!req.params.mId) {sendJSONResponse(res, 400, {"message":"m id required"}); return}
    M
     .findById(req.params.mId)
     .exec((err, m)=> {
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!m) {sendJSONResponse(res, 404, {"message":"m not found"}); return}
        doUpdateM(req, res, m);
     });
};

const mDeleteOne = (req, res) => {
    if(!req.params.mId) {sendJSONResponse(res, 400, {"message":"m id required"}); return;}
    M
     .findByIdAndRemove(req.params.mId)
     .exec((err, m) => {
        if(err) {sendJSONResponse(res, 404, err); return;}
        sendJSONResponse(res, 204, null);
     });
};


module.exports = {
    mCreateOne,
    mReadAll,
    mReadOne,
    mUpdateOne,
    mDeleteOne,
};