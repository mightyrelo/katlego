const mongoose = require('mongoose');
const M = mongoose.model('M');

const sendJSONResponse = (res, code, content) => {
    res
      .status(code)
      .json(content);
};


//submodel list operations
const doCreateSM = (req, res, m) => {
    const formSM = {
        b1: req.body.b1,
        b2: parseInt(req.body.b2),
        user: req.body.user
    };
    m.sms.push(formSM);
    m.save((err, savedM) => {
        if(err) {sendJSONResponse(res, 400, err);return}
        if(!savedM) {sendJSONResponse(res, 404, {"message":"m could not be updated"}); return}
        const thisSM = savedM.sms.slice(-1).pop();
        sendJSONResponse(res, 201, thisSM);
    });
}

const smCreateOne = (req, res) => {
    if(!req.body.b1 || !req.body.b2) {sendJSONResponse(res, 400, {"message":"all fields required"}); return}
    if(!req.params.mId) {sendJSONResponse(res, 400, {"message":"m id required"});return}
    console.log('creating sm...', req.payload);
    M
     .findById(req.params.mId)
     .exec((err, m) => {
        if(err) {sendJSONResponse(res, 400, err);return}
        if(!m) {sendJSONResponse(res, 404, {"message":"m not found"}); return}
        doCreateSM(req, res, m);
     });
};

const smReadAll = (req, res) => {
    if(!req.params.mId) {sendJSONResponse(res, 404, {"message":"m id parameter required"})}
    M
     .findById(req.params.mId)
     .select('a1 sms')
     .exec((err, m)=> {
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!m) {sendJSONResponse(res, 404, {"message":"m not found"}); return}
        const smS = m.sms;
        const response = {
            m: {
                a1: m.a1,
                id: req.params.mId
            },
            sms: smS
        };
        sendJSONResponse(res, 200, response);
     });

};



//submodel instance operations
const smReadOne = (req, res) => {
    M
    .findById(req.params.mId)
    .select('a1 sms')
    .exec((err, m)=>{
      if(!m) {
          sendJSONResponse(res, 404, {"message":"m id incorrect"});
          return;
      } else if(err) {
          sendJSONResponse(res, 404, err);
          return;
      }
      
      if(m.sms && m.sms.length > 0) {
          const thisSM = m.sms.id(req.params.smId);
          if(!thisSM) {
              sendJSONResponse(res, 404, {"message":"sm id incorrect"});
              return;
          }
          const response = {
              m: {
                  a1: m.a1,
                  id: req.params.mId
              },
              sm: thisSM
          };
          sendJSONResponse(res, 200, response);
      } else {
          sendJSONResponse(res, 400, {"message":"no sm found"});
      }
    });
};

const doUpdateSM = (req, res, m, sm) => {
    sm.b1 = req.body.b1;
    sm.b2 = parseInt(req.body.b2);
    m.save((err, savedM)=>{
        if(err) {sendJSONResponse(res, 400, err);}
        if(!savedM) {sendJSONResponse(res, 404, {"message":"m could not be updated"});}
        sendJSONResponse(res, 200, savedM);            
    })
}

const smUpdateOne = (req, res) => {
    if(!req.params.mId || !req.params.smId) {sendJSONResponse(res, 400, {"message":"both url params required"});return;}
    M
    .findById(req.params.mId)
    .select('a1 sms')
    .exec((err, m)=>{
      if(!m) {sendJSONResponse(res, 404, {"message":"m id incorrect"});return;}
      if(err) {sendJSONResponse(res, 404, err);return;}
      if(!m.sms || m.sms.length == 0) {sendJSONResponse(res, 404, {"message":"no sms to update"}); return}
      const thisSM = m.sms.id(req.params.smId)
      doUpdateSM(req, res, m, thisSM);
    });
};
const smDeleteOne = (req, res) => {
    console.log(req.params.mId, 'yyy', req.params.smId);
    if(!req.params.mId || !req.params.smId) {sendJSONResponse(res, 400, {"message":"both url params required"});return;}
    M
    .findById(req.params.mId)
    .select('sms')
    .exec((err, m)=>{
      if(!m) {sendJSONResponse(res, 404, {"message":"m id incorrect"});return;}
      if(err) {sendJSONResponse(res, 404, err);return;}
      if(!m.sms || m.sms.length == 0) {sendJSONResponse(res, 404, {"message":"no sms to delete"}); return}
      m.sms.id(req.params.smId).remove();
      m.save(err => {
        if(err) {sendJSONResponse(res, 404, err);return;}
        sendJSONResponse(res, 204, null);
      })
    });
};

module.exports = {
    smCreateOne,
    smReadAll,
    smReadOne,
    smUpdateOne,
    smDeleteOne,
};
