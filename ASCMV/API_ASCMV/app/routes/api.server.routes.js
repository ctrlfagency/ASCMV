module.exports = function(app) {
    var api = require('../controllers/api.server.controller');
    app.get('/api', api.render);

};
