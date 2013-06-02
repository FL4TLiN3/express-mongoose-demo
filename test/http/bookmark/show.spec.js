var path = require('path'),
    share = require('share'),
    config = share.config,
    log = share.log,
    app = share.app,
    request = require('supertest');

var Bookmark = require(path.join(config.path.model, 'Bookmark'));

var bookmarkHelper = require(config.path.testHelper + '/model/bookmark');

describe('GET /bookmark/:bookmarkId', function() {
    beforeEach(bookmarkHelper.createBookmark);
    afterEach(bookmarkHelper.cleanBookmark);

    it('should respond 200, text/html', function(done) {
        request(app)
        .get('/bookmark/' + bookmarkHelper.bookmark.id)
        .set('Accept', 'text/html')
        .expect(200)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 404, text/html', function(done) {
        request(app)
        .get('/bookmark/510004860e84e30000000000')
        .set('Accept', 'text/html')
        .expect(404)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 400, text/html', function(done) {
        request(app)
        .get('/bookmark/abcdefg')
        .set('Accept', 'text/html')
        .expect(400)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });
});

