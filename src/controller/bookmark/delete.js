var path = require('path'),
    config = require('share').config,
    log = require('share').log;

var Bookmark = require(path.join(config.path.model, 'Bookmark'));

module.exports = function (app) {
    var changeDeleteStatus = function (req, res, isDelete) {
        Bookmark
        .findOne({ _id: req.params.bookmarkId })
        .exec(function (error, bookmark) {
            if (error) return res.send(400);
            if (!bookmark) return res.send(404);
            bookmark.isDeleted = isDelete;
            if (isDelete) bookmark.deleteAt = new Date();
            else bookmark.updateAt = new Date();
            bookmark.save(function (error, bookmark) {
                if (error) return res.send(500);
                req.negotiate({
                    'application/json': function () {
                        return res.send(bookmark);
                    }
                });
            });
        });
    };

    app.del('/admin/bookmark/:bookmarkId', function (req, res) {
        changeDeleteStatus(req, res, true);
    });

    app.put('/admin/bookmark/:bookmarkId/undelete', function (req, res) {
        changeDeleteStatus(req, res, false);
    });
};
