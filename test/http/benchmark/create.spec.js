var path = require('path'),
    share = require('share'),
    config = share.config,
    log = share.log,
    app = share.app,
    request = require('supertest');

var bookmark = require(path.join(config.path.model, 'bookmark'));

var bookmarkHelper = require(config.path.testHelper + '/model/bookmark');

describe('POST /bookmark', function() {
    afterEach(bookmarkHelper.cleanbookmark);

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
            else return done();
        });
    });
});

