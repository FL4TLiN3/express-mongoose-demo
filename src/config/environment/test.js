var config = require('share').config;

module.exports = function(app) {
    app.set('port', 3001);

    config.db = {};
    config.db.host = '127.0.0.1';
    config.db.port = '27017';
    config.db.name = 'test';
    config.db.connection = 'mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.name;
};

