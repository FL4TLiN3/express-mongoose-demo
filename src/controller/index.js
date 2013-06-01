var path = require('path'),
    util = require('util'),
    config = require('share').config,
    log = require('share').log;

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.send(200);
    });
};
