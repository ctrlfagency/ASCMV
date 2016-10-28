module.exports = function(app) {
    var search = require('../controllers/search.server.controller');
    app.get('/search', search.render);

};
