const request = require('request');

const apiOptions = {
    server: 'http://localhost:3000/api/'
};

if(process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://ppapp.herokuapp.com/api/';
}

const showError = (req, res, code) => {
    let titl = '';
    let content = '';
    if(code === 404) {
        titl = '404, page not found';
        content = 'Oh flip, looks like you can\'t find this page. Sorry.'
    } else {
        titl = `${code}, something's gone wrong`;
        content = 'Something, somewhere has just gone a little bit wrong.'
    }
    res
      .status(code)
      .render('generic-text', {
        title: titl,
        pageHeader: {
            title: titl,
            strapline: ''
        },
        sideBar: '',
        content
      });
}


//list operations
const openMForm = (req, res) => {
    res.render('m-form', {
        title: 'Create M',
        pageHeader: {
            title: 'Create Instance of M',
            strapline: ''
        },
        sideBar: {
            content: 'M is the generic database model.',
            callToAction: 'There are three end point levels - collection, document and subdocument. For each level we define appropriate crud operations'
        },
        error: req.query.err
    });
}
const createM = (req, res) => {
    const path = 'ms';
    if(!req.body.a1 ||!req.body.a2 ||!req.body.a3 ||!req.body.a4 ||
       !req.body.a5 ||!req.body.facilities) {
        res.redirect('/ms/new?err=val');
    } else {
        const formM = {
            a1: req.body.a1,
            a2: req.body.a2,
            a3: req.body.a3,
            a4: req.body.a4,
            a5: req.body.a5,
            facilities: req.body.facilities,
        };
        const requestOptions = {
            url: `${apiOptions.server}${path}`,
            method: 'POST',
            json: formM
        };
        request(requestOptions, (err, {statusCode}, {name}) => {
            if(statusCode === 201) {
                res.redirect('/ms');
            } else if(statusCode === 400) {
                res.redirect('/ms/new?err=val');return;
            } else {
                showError(req, res, statusCode);
            }
        });    
    }
   
};

const renderMList = (req, res, ms) => {
    let message = null;
    if(!(ms instanceof Array)) {
        message = 'API lookup error';
        ms = [];
    } else {
        if(!ms.length) {
            message = 'no ms found'
        }
    }
    res.render('m-list', {
        title: 'List of Ms',
        pageHeader: {
            title: 'ppApp',
            strapline: 'Create and update personal profile for work applications.'
        },
        sideBar: 'Looking to create or update your personal profile for an upcoming job application? ppApp helps you create a profile with a professional appeal and helps you secure that position you\'ve been aiming at. Let ppApp set you apart from competitors and help you prepare for that interview and keep track of your skills, qualifications and experiences as and when you aquire them. Good Luck, the ppApp is With You! Nothing gets you more prepared for a coding interview than a properly packaged personal profile.',
        Ms: ms,
        message
    });

};
const readMs = (req, res) => {
    const path = 'ms';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };
    request(requestOptions, (err, {statusCode}, ms) => {
        let data = [];
        if(statusCode === 200) {
            data = ms;
            renderMList(req, res, ms);
        } else {
            showError(req, res, statusCode);
        }
    });
};

//instance operations
const renderM = (req, res, m) => {
    res.render('m-details', {
        title: m.a1,
        pageHeader: {
            title: m.a1,
            strapline: ''
        },
        sideBar: {
            context: `${m.a1} is on ppApp because it helps describe a person from a certain perspective so that potential employers can know if person is right fit for the company.`,
            callToAction: 'If you\'ve used ppApp to secure a position in the past, help others who were once like you by helping them get organized in search of a job of their dreams.'
        }, 
        m
        
    });
}
const readM = (req, res) => {
    const path = `ms/${req.params.mId}`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };
    request(requestOptions, (err, {statusCode}, m) => {
        let data;
        if(statusCode === 200) {
            data = m;
            renderM(req, res, data);
        } else {
            showError(req, res, statusCode)
        }
      
    })
   
};

const openUpdateForm = (req, res) => {

};
const updateM = (req, res) => {
    res.render('m-update', {
        title: 'Update M', 
        pageHeader: {
            title: 'Update M details',
            strapline: ''
        },
        sideBar: 'Make corrections to existing M'

    });
};
const deleteM = (req, res) => {
    const path = `ms/${req.params.mId}`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'DELETE',   
        json: {}
    };
    request(requestOptions, (err, {statusCode}, body) => {
        if(statusCode === 204 ) {
            res.redirect(`/ms`);
        } else {
            showError(req, res, statusCode);
        }
    });
};




module.exports = {
    createM,
    readMs,
    readM,
    updateM,
    deleteM,
    openMForm
};