var path = require('path'),
    config = require('share').config,
    testConfig = require(config.path.testConfig),
    app = testConfig.app,
    request = require('supertest');

var bookmark = require(path.join(config.path.model, 'bookmark'));
var bookmarkHelper = require(path.join(config.path.testHelperModel, 'bookmark'));

describe('DELETE /bookmarks/:bookmarkId', function() {
    beforeEach(bookmarkHelper.createBookmark);
    afterEach(bookmarkHelper.cleanBookmark);

    it('should respond 200', function(done) {
        request(app)
        .del('/bookmark/' + bookmarkHelper.bookmark.id)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 404', function(done) {
        request(app)
        .del('/bookmark/510004860e84e30000000000')
        .set('Accept', 'application/json')
        .expect(404)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 400', function(done) {
        request(app)
        .del('/bookmark/abcdefg')
        .set('Accept', 'application/json')
        .expect(400)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });
});

describe('PUT /bookmarks/:bookmarkId/undelete', function() {
    beforeEach(bookmarkHelper.createBookmark);
    afterEach(bookmarkHelper.cleanBookmark);

    it('should respond 200', function(done) {
        request(app)
        .put('/bookmark/' + bookmarkHelper.bookmark.id + '/undelete')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 404', function(done) {
        request(app)
        .put('/bookmark/510004860e84e30000000000/undelete')
        .set('Accept', 'application/json')
        .expect(404)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 400', function(done) {
        request(app)
        .put('/bookmark/abcdefg/undelete')
        .set('Accept', 'application/json')
        .expect(400)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });
});
