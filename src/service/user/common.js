var path = require('path'),
    config = require('share').config,
    log = require('share').log;

var User = require(path.join(config.path.model, 'User'));

exports.create = function (params, callback) {
    var user = new User({
        email: params.email,
        password: params.password,
        isForceRemoved: false,
        isPublished: false,
        isDeleted: false,
        lastSignInAt: new Date(),
        signUpAt: new Date(),
        updateAt: null,
        deleteAt: null
    });
    user.validate(function (error) {
        if (error) return callback({ code: 400, body: error });
        user.save(function (error, user) {
            if (error) return callback({ code: 500, body: error });
            return callback(null, user);
        });
    });
};

exports.findById = function (id, callback) {
    User
    .findById(id, function (error, user) {
        if (error) return callback({ code: 400, body: error });
        if (!user) return callback({ code: 404, body: error });
        return callback(null, user);
    });
};

exports.findAll = function (callback) {
    User
    .find()
    .sort('-lastSignInAt')
    .exec(function (error, users) {
        if (error) return callback({ code: 500, body: error });
        return callback(null, users);
    });
};
