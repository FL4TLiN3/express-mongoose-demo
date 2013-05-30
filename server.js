var config = require('share').config = {},
    log = require('share').log = {},
    express = require('express'),
    app = module.exports = express();

// server initialize
require('./src/config/init')(app);

if (!module.parent) {
    app.listen(app.get('port'));
    log.trace('*** listening on port ' + app.get('port') + ' ***\n');
}
