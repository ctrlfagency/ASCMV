module.exports = function(app) {
    var site = require('../controllers/site.server.controller');
    app.get('/site', site.render);

};
