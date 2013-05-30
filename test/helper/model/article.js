var path = require('path'),
    share = require('share'),
    config = share.config,
    log = share.log;

var Article = require(path.join(config.path.model, 'Article'));

exports.article = {};
exports.createArticle = function (done) {
    (new Article({
        title: 'Unit Testing...',
        description: 'Unit Testing...',
        isForceRemoved: false,
        isPublished: false,
        isDeleted: false,
        createAt: new Date(),
        updateAt: null,
        deleteAt: null
    })).save(function (error, article) {
        exports.article = article;
        done();
    });
};

exports.createArticles = function (done) {
    var size = 10, ct = 0;
    var callback = function () {
        if (++ct >= size) done();
    };
    for (var i = 0; i < size; i++) {
        (new Article({
            title: 'Unit Testing...',
            description: 'Unit Testing...',
            isForceRemoved: false,
            isPublished: false,
            isDeleted: false,
            createAt: new Date(),
            updateAt: null,
            deleteAt: null
        })).save(function (error, article) {
            callback();
        });
    }
};

exports.cleanArticle = function (done) {
    Article.remove({}, done);
};

