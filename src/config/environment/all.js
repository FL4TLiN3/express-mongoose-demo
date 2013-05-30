var share = require('share'),
    config = share.config,
    log = share.log,
    path = require('path'),
    express = require('express');

var applyMessage = function(req, res, next) {
    var msgs = req.session.messages || [];
    res.locals.messages = msgs;
    res.locals.hasMessages = !! msgs.length;
    req.session.messages = [];
    next();
};

module.exports = function(app) {
    // global middlewares
    app.use(log.accessLogger());
    app.use(express.compress());
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.favicon());
    app.use(express.cookieParser('Nu8OTokGA0FizHZLtPetbKcQXPdMsG9nkihzFY6MrRFvCmCHzbxQupMFYwVGReFl'));
    app.use(express.session());
    app.use(express.static(config.path.pub));
    app.use(applyMessage);

    // global view settings
    app.set('view engine', 'jade');
    app.set('views', config.path.view);
    app.engine('html', require('jade').renderFile);
};

