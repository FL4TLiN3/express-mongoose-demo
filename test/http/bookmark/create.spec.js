var path = require('path'),
    config = require('share').config,
    testConfig = require(config.path.testConfig),
    app = testConfig.app,
    request = require('supertest');

var bookmark = require(path.join(config.path.model, 'bookmark'));
var bookmarkHelper = require(path.join(config.path.testHelperModel, 'bookmark'));

describe('POST /bookmark', function() {
    afterEach(bookmarkHelper.cleanBookmark);

    it('should respond 200, application/json', function(done) {
        request(app)
        .post('/bookmark')
        .send({
            url: 'http://google.com'
        })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(error, res) {
            if (error) return done(error);
            else return done(null);
        });
    });
});

