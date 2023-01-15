const sendJSONResponse = require("./sharedFunctions");

const mongoose = require('mongoose');
require('../models/Customers');
const Customer = mongoose.model('Customer');

//level 1 : collection
const quotationsReadAll = (req, res) => {
    const cusId = req.params.customerId;

    if(!cusId){sendJSONResponse(res, 400, {"message":"missing url param"}); return;}
    Customer
        .findById(cusId)
        .select('name quotations')
        .exec((err, customer)=>{
            if(err){sendJSONResponse(res, 404, err); return;}
            if(!customer){sendJSONResponse(res, 404, {"message":"quotations not found"});return;}
            const response = {
                customer: {
                    name: customer.name,
                    id: customer._id    
                },
                quotes: customer.quotations
            };
            sendJSONResponse(res, 200, response);
        });
    
} 
const quotationsCreateOne = (req, res) => {
    sendJSONResponse(res, 200, {"message":"quotation created..."});
    return;
    
}

//level 2: document
const quotationsReadOne = (req, res) => {
    const cusId = req.params.customerId;
    const quoteId = req.params.quotationId;

    if(!cusId || !quoteId){sendJSONResponse(res, 400, {"message":"missing url param"}); return;}
    Customer
        .findById(cusId)
        .select('name quotations')
        .exec((err, customer)=>{
            if(err){sendJSONResponse(res, 400, err); return;}
            if(!customer){sendJSONResponse(res, 404, {"message":"quotations not found"});return;}
            if(customer.quotations && customer.quotations.length > 0) {
                let quote = customer.quotations.id(quoteId);
                if(!quote){sendJSONResponse(res, 404, {"message":"invalid quotation id"}); return}
                const response = {
                    customer: {
                        name: customer.name,
                        id: customer._id    
                    },
                    quote
                };
                sendJSONResponse(res, 200, response);
                return;
            }
            sendJSONResponse(res, 404, {"message":"no quotations found."}) 
        });
}

const quotationsUpdateOne = (req, res) => {
    sendJSONResponse(res, 200, {"message":"quotation updated..."});
    return;
} 
const quotationsDeleteOne = (req, res) => {
    sendJSONResponse(res, 200, {"message":"quotation delete..."});
    return;
} 


module.exports = {
    quotationsReadAll,
    quotationsCreateOne,
    quotationsReadOne,
    quotationsUpdateOne,
    quotationsDeleteOne
};