var path = require('path'),
    config = require('share').config;

var Bookmark = require(path.join(config.path.model, 'bookmark'));

exports.bookmark = {};
exports.createBookmark = function (done) {
    (new Bookmark({
        url: 'http://google.com',
        isDeleted: false,
        createAt: new Date(),
        updateAt: null,
        deleteAt: null
    })).save(function (error, bookmark) {
        exports.bookmark = bookmark;
        done();
    });
};

exports.createBookmarks = function (done) {
    var size = 10, ct = 0;
    var callback = function () {
        if (++ct >= size) done();
    };
    for (var i = 0; i < size; i++) {
        (new Bookmark({
            url: 'http://google.com',
            isDeleted: false,
            createAt: new Date(),
            updateAt: null,
            deleteAt: null
        })).save(function (error, bookmark) {
            callback();
        });
    }
};

exports.cleanBookmark = function (done) {
    console.log(Bookmark.remove);
    Bookmark.remove({}, done);
};

