var path = require('path'),
    config = require('share').config,
    log = require('share').log,
    negotiate = require('express-negotiate');

var Bookmark = require(path.join(config.path.model, 'Bookmark'));

module.exports = function (app) {
    app.post('/bookmark', function (req, res) {
        var bookmark = new Bookmark({
            url: req.body.url,
            title: req.body.title,
            tags: [],
            description: req.body.description,
            isForceRemoved: false,
            isPublished: false,
            isDeleted: false,
            createAt: new Date(),
            updateAt: null,
            deleteAt: null
        });
        bookmark.validate(function (error) {
            if (error) return res.send(400, { error: 'something blew up' });
            bookmark.save(function (error, bookmark) {
                if (error) return res.send(500, error);
                req.negotiate({
                    'application/json': function () {
                        return res.send(bookmark);
                    }
                });
            });
        });
    });
};
