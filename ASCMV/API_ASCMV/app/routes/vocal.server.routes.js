module.exports = function(app) {
    var vocal = require('../controllers/vocal.server.controller');
    app.get('/vocal', vocal.render);

};
