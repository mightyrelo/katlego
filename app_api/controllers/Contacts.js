const mongoose = require('mongoose');
require('../models/Contacts');
const Contact = mongoose.model('Contact');

const sendJSONResponse = (res, code, content) => {
    res
      .status(code)
      .json(content);
};

//collection endpoint
const contactsCreateOne = (req, res) => {
    if(!req.body.address || !req.body.facebook || !req.body.twitter  || !req.body.instagram || !req.body.cellphones || !req.body.emails)
      {sendJSONResponse(res, 400, {"message":"all fields required"}); return}
    const formContact = {
        address: req.body.address,
        facebook: req.body.facebook,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
        cellphones: req.body.cellphones.split(','),
        emails: req.body.emails.split(','),
        userId: req.body.userId,
    };
    Contact
     .create(formContact, (err, dbContact) => {
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!dbContact) {sendJSONResponse(res, 404, {"message":"contact could not be saved"}); return}
        sendJSONResponse(res, 201, dbContact);
     })
};

const contactsReadAll = (req, res) => {
    Contact
     .find()
     .exec((err, contacts)=>{
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!contacts) {sendJSONResponse(res, 404, {"message":"contacts not found"}); return}
        sendJSONResponse(res, 200, contacts);
     });
};


//document end point
const contactsReadOne = (req, res) => {
    const contactId = req.params.contactId;
    if(!contactId) {sendJSONResponse(res, 400, {"message":"contact id required"}); return}
    Contact
     .findById(contactId)
     .exec((err, contact)=>{
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!contact) {sendJSONResponse(res, 404, {"message":"contact not found"}); return}
        sendJSONResponse(res, 200, contact);
     });
};

const doUpdateContacts = (req, res, contact) => {
    if(req.body.address) {
        contact.address = req.body.address;
    }
    if(req.body.facebook) {
        contact.facebook = req.body.facebook;
    }
    if(req.body.twitter) {
        contact.twitter = req.body.twitter;
    }
    if(req.body.instagram) {
        contact.instagram = req.body.instagram;
    }
    if(req.body.cellphones) {
      contact.cellphones = req.body.cellphone;
    }
    if(req.body.emails) {
        contact.emails = req.body.emails;
    }

    contact.save((err, savedContact)=>{
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!savedContact) {sendJSONResponse(res, 404, {"message":"contact could not be updated"}); return}
        sendJSONResponse(res, 200, savedContact);            
    })
}

const contactsUpdateOne = (req, res) => {
    if(!req.params.contactId) {sendJSONResponse(res, 400, {"message":"contact id required"}); return}
    Contact
     .findById(req.params.contactId)
     .exec((err, contact)=> {
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!contact) {sendJSONResponse(res, 404, {"message":"contact not found"}); return}
        doUpdateContacts(req, res, contact);
     });
};

const contactsDeleteOne = (req, res) => {
    if(!req.params.contactId) {sendJSONResponse(res, 400, {"message":"contact id required"}); return;}
    Contact
     .findByIdAndRemove(req.params.contactId)
     .exec((err, edu) => {
        if(err) {sendJSONResponse(res, 404, err); return;}
        sendJSONResponse(res, 204, null);
     });
};


module.exports = {
    contactsCreateOne,
    contactsReadAll,
    contactsReadOne,
    contactsUpdateOne,
    contactsDeleteOne,
};

