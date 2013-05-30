var path = require('path'),
    util = require('util'),
    config = require('share').config,
    log = require('share').log;

var Article = require(path.join(config.path.model, 'Article'));

exports.findAvailables = function (option, callback) {
    Article
    .find({
        isForceRemoved: false,
        isPublished: true,
        isDeleted: false,
    })
    .sort('-updateAt')
    .exec(function (error, articles) {
        if (error) return callback(error);
        return callback(null, articles);
    });
};
