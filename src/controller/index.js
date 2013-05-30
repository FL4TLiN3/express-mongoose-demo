var path = require('path'),
    util = require('util'),
    config = require('share').config,
    log = require('share').log,
    async = require('async'),
    negotiate = require('express-negotiate');

var Article = require(path.join(config.path.model, 'Article'));

var articleFindService = require(path.join(config.path.service, 'article', 'find')),
    tagFindService = require(path.join(config.path.service, 'tag', 'find'));

module.exports = function (app) {
    app.get('/', function (req, res) {
        async.parallel({
            articles: function (callback) {
                articleFindService.findAvailables({}, callback);
            },
            tags: function (callback) {
                tagFindService.findAvailables({}, callback);
            }
        },
        function (error, results) {
            res.render('index', {
                articles: results.articles,
                tags: results.tags
            });
        });
    });
};
