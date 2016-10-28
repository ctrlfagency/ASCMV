var express = require('express');
module.exports = function() {
    var app = express();

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/search.server.routes.js')(app);
    require('../app/routes/api.server.routes.js')(app);
    require('../app/routes/vocal.server.routes.js')(app);
    require('../app/routes/telechargement.server.routes.js')(app);
    require('../app/routes/site.server.routes.js')(app);
    app.use(express.static('./public'));

    return app;
};
