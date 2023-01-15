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


const mCtrl = require('../controllers/Ms');
const smCtrl = require('../controllers/SMs');
const personalCtrl = require('../controllers/Personals');
const authCtrl = require('../controllers/authentication');
const eduCtrl = require('../controllers/Educations');
const workCtrl = require('../controllers/Works');
const projCtrl = require('../controllers/Projects');
const contactCtrl = require('../controllers/Contacts');


//model/collection routes
//list
router
  .route('/ms')
  .get(auth, mCtrl.mReadAll)
  .post(auth, mCtrl.mCreateOne);
//instances/document routes
router
  .route('/ms/:mId')
  .get(mCtrl.mReadOne)
  .put(mCtrl.mUpdateOne)
  .delete(auth, mCtrl.mDeleteOne);

//submodel routes
//list
router
  .route('/ms/:mId/sms')
  .get(smCtrl.smReadAll)
  .post(auth, smCtrl.smCreateOne);
router
  .route('/ms/:mId/sms/new')
  .get(smCtrl.smCreateOne)
//instance
router
  .route('/ms/:mId/sms/:smId')
  .get(smCtrl.smReadOne)
  .put(smCtrl.smUpdateOne)
  .delete(smCtrl.smDeleteOne);

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);


/////////
//model/collection routes
//list
router
  .route('/personals')
  .get(personalCtrl.personalsReadAll)
  .post(auth, personalCtrl.personalsCreateOne);
//instances/document routes
router
  .route('/personals/:personalId')
  .get(personalCtrl.personalsReadOne)
  .put(personalCtrl.personalsUpdateOne)
  .delete(auth, personalCtrl.personalsDeleteOne);


//model/collection routes
//list
router
  .route('/educations')
  .get(eduCtrl.educationsReadAll)
  .post(auth, eduCtrl.educationsCreateOne);
//instances/document routes
router
  .route('/educations/:educationId')
  .get(eduCtrl.educationsReadOne)
  .put(eduCtrl.educationsUpdateOne)
  .delete(auth, eduCtrl.educationsDeleteOne);


//model/collection routes
//list
router
  .route('/works')
  .get(workCtrl.worksReadAll)
  .post(auth, workCtrl.worksCreateOne);
//instances/document routes
router
  .route('/works/:workId')
  .get(workCtrl.worksReadOne)
  .put(workCtrl.worksUpdateOne)
  .delete(auth, workCtrl.worksDeleteOne);


//model/collection routes
//list
router
  .route('/projects')
  .get(projCtrl.projectsReadAll)
  .post(auth, projCtrl.projectsCreateOne);
//instances/document routes
router
  .route('/projects/:projectId')
  .get(projCtrl.projectsReadOne)
  .put(projCtrl.projectsUpdateOne)
  .delete(auth, projCtrl.projectsDeleteOne);
//model/collection routes
//list
router
  .route('/contacts')
  .get(contactCtrl.contactsReadAll)
  .post(auth, contactCtrl.contactsCreateOne);
//instances/document routes
router
  .route('/contacts/:contactId')
  .get(contactCtrl.contactsReadOne)
  .put(contactCtrl.contactsUpdateOne)
  .delete(auth, contactCtrl.contactsDeleteOne);



module.exports = router;
