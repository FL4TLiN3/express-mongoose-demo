var path = require('path'),
    util = require('util'),
    config = require('share').config,
    log = require('share').log;

var Tag = require(path.join(config.path.model, 'Tag'));

exports.findAvailables = function (option, callback) {
    Tag
    .find()
    .exec(function (error, tags) {
        if (error) return callback(error);
        return callback(null, tags);
    });
};
