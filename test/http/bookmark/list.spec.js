var path = require('path'),
    share = require('share'),
    config = share.config,
    log = share.log,
    app = share.app,
    request = require('supertest');

var Bookmark = require(path.join(config.path.model, 'Bookmark'));

var bookmarkHelper = require(config.path.testHelper + '/model/bookmark');

describe('GET /bookmarks', function() {
    beforeEach(bookmarkHelper.createBookmarks);
    afterEach(bookmarkHelper.cleanBookmark);

    it('should respond 200, text/html', function(done) {
        request(app)
        .get('/bookmarks')
        .set('Accept', 'text/html')
        .expect(200)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 200, application/json', function(done) {
        request(app)
        .get('/bookmarks')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(error, res) {
            if (error) return done(error);
            else if (res.body.length !== 10 ) return done(new Error('result length dose not match'));
            else return done();
        });
    });
});

