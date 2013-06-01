var path = require('path'),
    config = require('share').config,
    log = require('share').log;

var Bookmark = require(path.join(config.path.model, 'Bookmark'));

module.exports = function (app) {
    app.post('/bookmark', function (req, res) {
        var bookmark = new Bookmark({
            url: req.body.url,
            isDeleted: false,
            createAt: new Date(),
            updateAt: null,
            deleteAt: null
        });
        bookmark.validate(function (error) {
            if (error) return res.send(400, { error: 'something blew up' });
            bookmark.save(function (error, bookmark) {
                if (error) return res.send(500, error);
                return res.send(bookmark);
            });
        });
    });
};
