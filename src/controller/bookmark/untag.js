var path = require('path'),
    config = require('share').config,
    log = require('share').log,
    async = require('async'),
    negotiate = require('express-negotiate');

var Article = require(path.join(config.path.model, 'Article')),
    ArticleTag = require(path.join(config.path.model, 'ArticleTag')),
    Tag = require(path.join(config.path.model, 'Tag'));

module.exports = function (app) {
    app.del('/admin/article/:articleId/tag', function (req, res) {
        var article,
            articleTag,
            tag;
        async.series([
            function (callback) {
                async.parallel({
                    article: function (paraCallback) { Article.findOne({ _id: req.params.articleId }).exec(paraCallback); },
                    tag:     function (paraCallback) { Tag.findOne({ name: req.body.name }).exec(paraCallback); }
                }, function (error, results) {
                    if (error) return callback(error);
                    if (!results.article) return callback({ message: 'no article found' });
                    if (!results.tag)     return callback({ message: 'no tag found' });
                    article = results.article;
                    tag = results.tag;
                    return callback();
                });
            },
            function (callback) {
                ArticleTag
                .remove({ articleId: article.id, tagId: tag.id }, function (error) {
                    if (error) return callback(error);
                    else return callback()
                });
            },
            function (callback) {
                --tag.tagged;
                tag.validate(function (error) {
                    if (error) return callback(error);
                    tag.save(function (error, _tag) {
                        tag = _tag;
                        return callback(error);
                    });
                });
            },
            function (callback) {
                article.tags.remove(tag);
                article.validate(function (error) {
                    if (error) return callback(error);
                    article.save(callback);
                });
            }
        ],
        function (error, results){
            if (error) {
                if (error.message === 'no article found') return res.send(404);
                else if (error.message === 'no tag found') return res.send(404);
                else if (error.message === 'Validation failed') return res.send(400);
                else return res.send(400);
            }
            if (!article) return res.send(500);
            req.negotiate({
                'application/json': function () { return res.send(article); }
            });
        });
    });
};
