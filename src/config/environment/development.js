var config = require('share').config;

module.exports = function(app) {
    app.set('port', 3000);

    config.db = {};
    config.db.host = '127.0.0.1';
    config.db.port = '27017';
    config.db.name = 'xmatome';
    config.db.connection = 'mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.name;
};

