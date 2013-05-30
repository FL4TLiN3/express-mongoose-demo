var path = require('path'),
    share = require('share'),
    config = share.config,
    log = share.log,
    app = share.app,
    request = require('supertest');

var Article = require(path.join(config.path.model, 'Article'));

var articleHelper = require(config.path.testHelper + '/model/article');

describe('GET /admin/article/:articleId/edit', function() {
    beforeEach(articleHelper.createArticle);
    afterEach(articleHelper.cleanArticle);

    it('should respond 200, text/html', function(done) {
        request(app)
        .get('/admin/article/' + articleHelper.article.id + '/edit')
        .set('Accept', 'text/html')
        .expect(200)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 200, application/json', function(done) {
        request(app)
        .get('/admin/article/' + articleHelper.article.id + '/edit')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 404, text/html', function(done) {
        request(app)
        .get('/admin/article/510004860e84e30000000000/edit')
        .set('Accept', 'text/html')
        .expect(404)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 404, application/json', function(done) {
        request(app)
        .get('/admin/article/510004860e84e30000000000/edit')
        .set('Accept', 'application/json')
        .expect(404)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 400, text/html', function(done) {
        request(app)
        .get('/admin/article/abcdefg/edit')
        .set('Accept', 'text/html')
        .expect(400)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 400, application/json', function(done) {
        request(app)
        .get('/admin/article/abcdefg/edit')
        .set('Accept', 'application/json')
        .expect(400)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });
});

