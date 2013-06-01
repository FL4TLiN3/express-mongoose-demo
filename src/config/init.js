var fs = require('fs'),
    config = require('share').config,
    path = require('path'),
    mongoose = require('mongoose');

require('date-utils');

module.exports = function(app) {
    app.response.message = app.response.message || function(msg){
        var sess = this.req.session;
        sess.messages = sess.messages || [];
        sess.messages.push(msg);
        return this;
    };

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
            if (file.substring(0, 1) == '.') return;
            var stat = fs.statSync(path.join(dir, file));
            if (stat.isFile()) require(path.join(dir, file.substring(0, file.length - 3)))(app);
            else if (stat.isDirectory()) dirlookup(path.join(dir, file));
        });
    })(config.path.controller);

    // error handler
    require(path.join(config.path.config, 'error'))(app);
};
