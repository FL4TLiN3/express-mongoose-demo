var path = require('path'),
    config = require('share').config,
    express = require('express');

var app = exports.app = express();

app.set('env', 'test');
require(path.join(config.path.config, 'init'))(app);
app.listen(app.get('port'));

