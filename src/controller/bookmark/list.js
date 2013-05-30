var path = require('path'),
    config = require('share').config,
    log = require('share').log,
    negotiate = require('express-negotiate');

var Bookmark = require(path.join(config.path.model, 'Bookmark'));

module.exports = function (app) {
    app.get('/admin/bookmarks', function (req, res) {
        Bookmark
        .find()
        .sort('-createAt')
        .exec(function (error, bookmarks) {
            req.negotiate({
                'application/json': function () {
                    return res.send(bookmarks);
                }
            });
        });
    });
};
