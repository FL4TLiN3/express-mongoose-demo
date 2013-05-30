var path = require('path'),
    share = require('share'),
    config = share.config,
    log = share.log;

var Tag = require(path.join(config.path.model, 'Tag'));

exports.tag = {};
exports.createTag = function (done) {
    (new Tag({
        name: 'sexy',
        tagged: 0,
        createAt: new Date(),
        updateAt: null
    })).save(function (error, tag) {
        exports.tag = tag;
        done();
    });
};

exports.createTags = function (done) {
    var size = 10, ct = 0;
    var callback = function () {
        if (++ct >= size) done();
    };
    for (var i = 0; i < size; i++) {
        (new Tag({
            name: 'sexy' + i,
            tagged: 0,
            createAt: new Date(),
            updateAt: null
        })).save(function (error, tag) {
            callback();
        });
    }
};

exports.cleanTag = function (done) {
    Tag.remove({}, done);
};

