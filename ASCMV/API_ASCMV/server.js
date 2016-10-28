var port = 3003;
var express = require('./config/express');
var app = express();
app.listen(port);
module.exports = app;
console.log('Le serveur API_ASCMV est demarré sur http://localhost:' + port);
