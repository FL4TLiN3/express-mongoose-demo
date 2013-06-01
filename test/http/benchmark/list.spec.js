var path = require('path'),
    share = require('share'),
    config = share.config,
    log = share.log,
    app = share.app,
    request = require('supertest');

var Article = require(path.join(config.path.model, 'Article'));

var articleHelper = require(config.path.testHelper + '/model/article');

describe('GET /admin/articles', function() {
    beforeEach(articleHelper.createArticles);
    afterEach(articleHelper.cleanArticle);

    it('should respond 200, text/html', function(done) {
        request(app)
        .get('/admin/articles')
        .set('Accept', 'text/html')
        .expect(200)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 200, application/json', function(done) {
        request(app)
        .get('/admin/articles')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(error, res) {
            if (error) return done(error);
            else if (res.body.length !== 10 ) return done(new Error('result length dose not match'));
            else return done();
        });
    });
});

