var path = require('path'),
    share = require('share'),
    express = require('express');

var app = share.app = express();

app.set('env', 'test');
require('../src/config/init')(app);
app.listen(app.get('port'));

