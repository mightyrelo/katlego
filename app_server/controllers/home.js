const home = (req, res, next) => {
    res.render('index', { title: 'ppApp',
      strap: 'The one app that helps you put pap on the table.' 
 });
}

module.exports = {
    home
}
