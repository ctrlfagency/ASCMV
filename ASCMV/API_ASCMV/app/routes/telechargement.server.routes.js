module.exports = function(app) {
    var telechargement = require('../controllers/telechargement.server.controller');
    app.get('/telechargement', telechargement.render);

};
