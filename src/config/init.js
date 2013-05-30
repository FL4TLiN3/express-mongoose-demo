var fs = require('fs'),
    config = require('share').config,
    path = require('path'),
    mongoose = require('mongoose');

require('date-utils');

module.exports = function(app) {
    config.path = {};
    config.path.root       = path.join(__dirname, '..');
    config.path.config     = path.join(config.path.root, 'config');
    config.path.model      = path.join(config.path.root, 'model');
    config.path.view       = path.join(__dirname, '../../asset/view');
    config.path.controller = path.join(config.path.root, 'controller');
    config.path.service    = path.join(config.path.root, 'service');
    config.path.pub        = path.join(__dirname, '../../pub');
    config.path.test       = path.join(__dirname, '../../test');
    config.path.testHelper = path.join(config.path.test, 'helper');

    app.response.message = app.response.message || function(msg){
        var sess = this.req.session;
        sess.messages = sess.messages || [];
        sess.messages.push(msg);
        return this;
    };

    // logging
    require(path.join(config.path.config, 'log4js'))(app);

    // settings
    require(path.join(config.path.config, 'environment', 'all'))(app);
    require(path.join(config.path.config, 'environment', app.get('env')))(app);

    // initialize database connection
    mongoose.connect(config.db.connection);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));

    // controller
    (function dirlookup(dir) {
        fs.readdirSync(dir).forEach(function (file) {
            var stat = fs.statSync(path.join(dir, file));
            if (stat.isFile()) require(path.join(dir, file.substring(0, file.length - 3)))(app);
            else if (stat.isDirectory()) dirlookup(path.join(dir, file));
        });
    })(config.path.controller);

    // error handler
    require(path.join(config.path.config, 'error'))(app);
};
