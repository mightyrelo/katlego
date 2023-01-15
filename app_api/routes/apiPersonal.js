/*There are three levels of endpoints; collection, document and subdocument. At each level of endpoint we define crud operations that are appropriate
for the level. For the collection level we define read and create, for document we define read,update and delete. This pattern repeats itself for a subdoc */
const express = require('express');
const router = express.Router();
const {expressjwt: jwt} = require('express-jwt');
const auth = jwt({
  secret: 'thisIsSecret',
  algorithms:  ["RS256", "HS256"],
  userProperty: 'payload'
});


const personalCtrl = require('../controllers/Personals');
const authCtrl = require('../controllers/authentication');


//model/collection routes
//list
router
  .route('/')
  .get(personalCtrl.personalReadAll)
  .post(auth, personalCtrl.personalCreateOne);
//instances/document routes
router
  .route('/:personalId')
  .get(personalCtrl.personalReadOne)
  .put(personalCtrl.personalUpdateOne)
  .delete(auth, personalCtrl.personalDeleteOne);



module.exports = router;
