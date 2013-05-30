var path = require('path'),
    share = require('share'),
    config = share.config,
    log = share.log,
    app = share.app,
    request = require('supertest');

var Article = require(path.join(config.path.model, 'Article'));

var articleHelper = require(config.path.testHelper + '/model/article');

describe('PUT /admin/articles/:articleId/publish', function() {
    beforeEach(articleHelper.createArticle);
    afterEach(articleHelper.cleanArticle);

    it('should respond 200, application/json', function(done) {
        request(app)
        .put('/admin/article/' + articleHelper.article.id + '/publish')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 404, application/json', function(done) {
        request(app)
        .put('/admin/article/510004860e84e30000000000/publish')
        .set('Accept', 'application/json')
        .expect(404)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 400, application/json', function(done) {
        request(app)
        .put('/admin/article/abcdefg/publish')
        .set('Accept', 'application/json')
        .expect(400)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });
});

describe('PUT /admin/articles/:articleId/unpublish', function() {
    beforeEach(articleHelper.createArticle);
    afterEach(articleHelper.cleanArticle);

    it('should respond 200, application/json', function(done) {
        request(app)
        .put('/admin/article/' + articleHelper.article.id + '/unpublish')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 404, application/json', function(done) {
        request(app)
        .put('/admin/article/510004860e84e30000000000/unpublish')
        .set('Accept', 'application/json')
        .expect(404)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 400, application/json', function(done) {
        request(app)
        .put('/admin/article/abcdefg/unpublish')
        .set('Accept', 'application/json')
        .expect(400)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });
});
