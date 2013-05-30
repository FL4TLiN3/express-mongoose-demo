var log = require('share').log,
    log4js = require('log4js');

module.exports = function(app) {
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
};
