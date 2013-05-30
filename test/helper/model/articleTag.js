var path = require('path'),
    share = require('share'),
    config = share.config,
    log = share.log;

var Article = require(path.join(config.path.model, 'Article'));
var ArticleTag = require(path.join(config.path.model, 'ArticleTag'));
var Tag = require(path.join(config.path.model, 'Tag'));

exports.article = {};
exports.articleTag = {};
exports.tag = {};
exports.createArticleTag = function (done) {
    var size = 2, ct = 0;
    var callback = function () {
        if (++ct >= size) {
            (new ArticleTag({
                articleId: exports.article.id,
                tagId: exports.tag.id,
                createAt: new Date()
            })).save(function (error, articleTag) {
                exports.articleTag = articleTag;
                done();
            });
        }
    };
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
        callback();
    });
    (new Tag({
        name: 'TestTag',
        tagged: 1,
        createAt: new Date(),
        updateAt: null
    })).save(function (error, tag) {
        exports.tag = tag;
        callback();
    });
};

exports.cleanArticleTag = function (done) {
    var size = 3, ct = 0;
    var callback = function () {
        if (++ct >= size) {
            done();
        }
    };
    Article.remove({}, callback);
    ArticleTag.remove({}, callback);
    Tag.remove({}, callback);
};

