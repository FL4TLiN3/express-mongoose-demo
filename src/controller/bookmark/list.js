var path = require('path'),
    config = require('share').config,
    log = require('share').log;

var Bookmark = require(path.join(config.path.model, 'Bookmark'));

module.exports = function (app) {
    app.get('/bookmarks', function (req, res) {
        Bookmark
        .find()
        .sort('-createAt')
        .exec(function (error, bookmarks) {
            return res.send(bookmarks);
        });
    });
};
