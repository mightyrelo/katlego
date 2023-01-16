const mongoose = require('mongoose');
require('../models/Projects');
const Project = mongoose.model('Project');

const sendJSONResponse = (res, code, content) => {
    res
      .status(code)
      .json(content);
};

//collection endpoint
const projectsCreateOne = (req, res) => {
    if(!req.body.name || !req.body.description || !req.body.term  || !req.body.language || !req.body.tools || !req.body.concepts)
      {sendJSONResponse(res, 400, {"message":"all fields required"}); return}
    const formProject = {
        name: req.body.name,
        description: req.body.description,
        descriptionFull: req.body.descriptionFull,
        term: req.body.term,
        language: req.body.language,
        tools: req.body.tools.split(','),
        concepts: req.body.concepts.split(','),
        userId: req.body.userId,
        link: req.body.link,
        github: req.body.github
    };
    Project
     .create(formProject, (err, dbProject) => {
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!dbProject) {sendJSONResponse(res, 404, {"message":"project could not be saved"}); return}
        sendJSONResponse(res, 201, dbProject);
     })
};

const projectsReadAll = (req, res) => {
    Project
     .find()
     .exec((err, projects)=>{
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!projects) {sendJSONResponse(res, 404, {"message":"projects not found"}); return}
        sendJSONResponse(res, 200, projects);
     });
};


//document end point
const projectsReadOne = (req, res) => {
    const projectId = req.params.projectId;
    if(!projectId) {sendJSONResponse(res, 400, {"message":"project id required"}); return}
    Project
     .findById(projectId)
     .exec((err, project)=>{
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!project) {sendJSONResponse(res, 404, {"message":"project not found"}); return}
        sendJSONResponse(res, 200, project);
     });
};

const doUpdateProjects = (req, res, project) => {
    if(req.body.name) {
        project.name = req.body.name;
    }
    if(req.body.description) {
        project.description = req.body.description;
    }
    if(req.body.term) {
        project.term = req.body.term;
    }
    if(req.body.language) {
        project.language = req.body.language;
    }
    if(req.body.tools) {
      project.tools = req.body.tools;
    }
    if(req.body.concepts) {
      project.concepts = req.body.concepts;
    }
    

    project.save((err, savedProject)=>{
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!savedProject) {sendJSONResponse(res, 404, {"message":"project could not be updated"}); return}
        sendJSONResponse(res, 200, savedProject);            
    })
}

const projectsUpdateOne = (req, res) => {
    if(!req.params.projectId) {sendJSONResponse(res, 400, {"message":"project id required"}); return}
    Project
     .findById(req.params.projectId)
     .exec((err, project)=> {
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!project) {sendJSONResponse(res, 404, {"message":"project not found"}); return}
        doUpdateProjects(req, res, project);
     });
};

const projectsDeleteOne = (req, res) => {
    if(!req.params.projectId) {sendJSONResponse(res, 400, {"message":"project id required"}); return;}
    Project
     .findByIdAndRemove(req.params.projectId)
     .exec((err, edu) => {
        if(err) {sendJSONResponse(res, 404, err); return;}
        sendJSONResponse(res, 204, null);
     });
};


module.exports = {
    projectsCreateOne,
    projectsReadAll,
    projectsReadOne,
    projectsUpdateOne,
    projectsDeleteOne,
};