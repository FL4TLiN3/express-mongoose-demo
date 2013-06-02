var path = require('path'),
    config = require('share').config,
    testConfig = require(config.path.testConfig),
    app = testConfig.app,
    request = require('supertest');

var bookmark = require(path.join(config.path.model, 'bookmark'));
var bookmarkHelper = require(path.join(config.path.testHelperModel, 'bookmark'));

describe('GET /bookmarks', function() {
    beforeEach(bookmarkHelper.createBookmarks);
    afterEach(bookmarkHelper.cleanBookmark);

    it('should respond 200', function(done) {
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

