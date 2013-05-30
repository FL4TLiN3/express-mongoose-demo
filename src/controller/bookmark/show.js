var path = require('path'),
    config = require('share').config,
    log = require('share').log,
    negotiate = require('express-negotiate');

var Bookmark = require(path.join(config.path.model, 'Bookmark'));

module.exports = function (app) {
    app.get('/bookmark/:bookmarkId', function (req, res) {
        Bookmark
        .findOne({ _id: req.params.bookmarkId })
        .exec(function (error, bookmark) {
            if (error) return res.send(400);
            if (!bookmark) return res.send(404);
            req.negotiate({
                'application/json': function () {
                    return res.send(bookmark);
                }
            });
        });
    });
};
