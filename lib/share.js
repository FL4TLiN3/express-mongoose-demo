var share = exports = module.exports = {};

var config = share.config = {};
config.path = {};
config.path.root = path.join(__dirname, '..');
config.path.pub = path.join(config.path.root, 'pub');

config.path.asset = path.join(config.path.root, 'asset');
config.path.js = path.join(config.path.asset, 'js');
config.path.style = path.join(config.path.asset, 'style');
config.path.view = path.join(config.path.asset, 'view');

config.path.src = path.join(config.path.root, 'src');
config.path.config = path.join(config.path.src, 'config');
config.path.model = path.join(config.path.src, 'model');
config.path.controller = path.join(config.path.src, 'controller');
config.path.service = path.join(config.path.src, 'service');

config.path.test = path.join(config.path.root, 'test');
config.path.testConfig = path.join(config.path.test, 'test.conf');
config.path.testHelper = path.join(config.path.test, 'helper');

var log = share.log = {},
    log4js = require('log4js');

log4js.configure({
    appenders: [{
        type: "dateFile",
        filename: "log/access.log",
        pattern: "-yyyy-MM-dd",
        category: "access"
    }, {
        type: "console",
        category: "debug"
    }]
});

log.accessLogger = function() {
    var format;
    if (app.get('env') == 'development') {
        format = [
            ':method',
            ':url',
            ':status',
            ':response-timems',
            ':res[content-length]byte'
        ].join(' ');
        return log4js.connectLogger(
            log4js.getLogger('debug'),
            {level: log4js.levels.TRACE, format: format}
        );
    } else {
        format = [
            ':remote-addr',
            ':req[x-forwarded-for]',
            ':response-time',
            ':method',
            ':url',
            'HTTP/:http-version',
            ':status',
            ':res[content-length]',
            ':referrer',
            ':user-agent'
        ].join('\t');
        return log4js.connectLogger(
            log4js.getLogger('access'),
            {level: log4js.levels.INFO, format: format}
        );
    }
};

log.trace = function(message) {
    if (app.get('env') == 'development') {
        log4js.getLogger('debug').trace(message);
    }
};

log.debug = function(message) {
    if (app.get('env') == 'development') {
        log4js.getLogger('debug').debug(message);
    }
};
