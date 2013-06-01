var path = require('path'),
    share = require('share'),
    config = share.config,
    log = share.log,
    app = share.app,
    request = require('supertest');

var Article = require(path.join(config.path.model, 'Article'));

var articleHelper = require(config.path.testHelper + '/model/article');

describe('GET /admin/article/:articleId', function() {
    beforeEach(articleHelper.createArticle);
    afterEach(articleHelper.cleanArticle);

    it('should respond 200, text/html', function(done) {
        request(app)
        .get('/admin/article/' + articleHelper.article.id)
        .set('Accept', 'text/html')
        .expect(200)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 404, text/html', function(done) {
        request(app)
        .get('/admin/article/510004860e84e30000000000')
        .set('Accept', 'text/html')
        .expect(404)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 400, text/html', function(done) {
        request(app)
        .get('/admin/article/abcdefg')
        .set('Accept', 'text/html')
        .expect(400)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });
});

