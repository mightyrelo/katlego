const mongoose = require('mongoose');
require('../models/Customers');
const Customer = mongoose.model('Customer');

const sendJSONResponse = (res, code, content) => {
    res
      .status(code)
      .json(content);
};

//collection endpoint
const customersCreateOne = (req, res) => {
    sendJSONResponse(res, 400, {"message":"all fields required"});
    /*if(!req.body.name || !req.body.address || !req.body.contact  || !req.body.gender || )
      {sendJSONResponse(res, 400, {"message":"all fields required"}); return}
    const formCustomer = {
        address: req.body.address,
        name: req.body.name,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
        cellphones: req.body.cellphones.split(','),
        emails: req.body.emails.split(','),
        userId: req.body.userId,
    };
    Customer
     .create(formCustomer, (err, dbCustomer) => {
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!dbCustomer) {sendJSONResponse(res, 404, {"message":"customer could not be saved"}); return}
        sendJSONResponse(res, 201, dbCustomer);
     })*/
};

const customersReadAll = (req, res) => {
    Customer
     .find()
     .exec((err, customers)=>{
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!customers) {sendJSONResponse(res, 404, {"message":"customers not found"}); return}
        sendJSONResponse(res, 200, customers);
     });
};


//document end point
const customersReadOne = (req, res) => {
    const customerId = req.params.customerId;
    if(!customerId) {sendJSONResponse(res, 400, {"message":"customer id required"}); return}
    Customer
     .findById(customerId)
     .exec((err, customer)=>{
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!customer) {sendJSONResponse(res, 404, {"message":"customer not found"}); return}
        sendJSONResponse(res, 200, customer);
     });
};

const doUpdateCustomers = (req, res, customer) => {
    sendJSONResponse(res, 400, {"message":"all fields required"});
  /*  if(req.body.address) {
        customer.address = req.body.address;
    }
    if(req.body.facebook) {
        customer.facebook = req.body.facebook;
    }
    if(req.body.twitter) {
        customer.twitter = req.body.twitter;
    }
    if(req.body.instagram) {
        customer.instagram = req.body.instagram;
    }
    if(req.body.cellphones) {
      customer.cellphones = req.body.cellphone;
    }
    if(req.body.emails) {
        customer.emails = req.body.emails;
    }

    customer.save((err, savedCustomer)=>{
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!savedCustomer) {sendJSONResponse(res, 404, {"message":"customer could not be updated"}); return}
        sendJSONResponse(res, 200, savedCustomer);            
    })*/
}

const customersUpdateOne = (req, res) => {
    if(!req.params.customerId) {sendJSONResponse(res, 400, {"message":"customer id required"}); return}
    Customer
     .findById(req.params.customerId)
     .exec((err, customer)=> {
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!customer) {sendJSONResponse(res, 404, {"message":"customer not found"}); return}
        doUpdateCustomers(req, res, customer);
     });
};

const customersDeleteOne = (req, res) => {
    if(!req.params.customerId) {sendJSONResponse(res, 400, {"message":"customer id required"}); return;}
    Customer
     .findByIdAndRemove(req.params.customerId)
     .exec((err, edu) => {
        if(err) {sendJSONResponse(res, 404, err); return;}
        sendJSONResponse(res, 204, null);
     });
};


module.exports = {
    customersCreateOne,
    customersReadAll,
    customersReadOne,
    customersUpdateOne,
    customersDeleteOne,
};

