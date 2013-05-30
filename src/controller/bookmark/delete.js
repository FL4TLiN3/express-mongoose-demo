var path = require('path'),
    config = require('share').config,
    log = require('share').log,
    negotiate = require('express-negotiate');

var Article = require(path.join(config.path.model, 'Article'));

module.exports = function (app) {
    var changeDeleteStatus = function (req, res, isDelete) {
        Article
        .findOne({ _id: req.params.articleId })
        .exec(function (error, article) {
            if (error) return res.send(400);
            if (!article) return res.send(404);
            article.isDeleted = isDelete;
            if (isDelete) article.deleteAt = new Date();
            else article.updateAt = new Date();
            article.save(function (error, article) {
                if (error) return res.send(500);
                req.negotiate({
                    'application/json': function () {
                        return res.send(article);
                    }
                });
            });
        });
    };

    app.del('/admin/article/:articleId', function (req, res) {
        changeDeleteStatus(req, res, true);
    });

    app.put('/admin/article/:articleId/undelete', function (req, res) {
        changeDeleteStatus(req, res, false);
    });
};
