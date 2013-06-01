var path = require('path');

var Bookmark = require(path.join('../../../src/model', 'bookmark'));

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
    Bookmark.remove({}, done);
};

