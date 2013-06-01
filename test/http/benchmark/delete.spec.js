var path = require('path'),
    share = require('share'),
    config = share.config,
    log = share.log,
    app = share.app,
    request = require('supertest');

var Article = require(path.join(config.path.model, 'Article'));

var articleHelper = require(config.path.testHelper + '/model/article');

describe('DELETE /admin/articles/:articleId', function() {
    beforeEach(articleHelper.createArticle);
    afterEach(articleHelper.cleanArticle);

    it('should respond 200, application/json', function(done) {
        request(app)
        .del('/admin/article/' + articleHelper.article.id)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 404, application/json', function(done) {
        request(app)
        .del('/admin/article/510004860e84e30000000000')
        .set('Accept', 'application/json')
        .expect(404)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 400, application/json', function(done) {
        request(app)
        .del('/admin/article/abcdefg')
        .set('Accept', 'application/json')
        .expect(400)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });
});

describe('PUT /admin/articles/:articleId/undelete', function() {
    beforeEach(articleHelper.createArticle);
    afterEach(articleHelper.cleanArticle);

    it('should respond 200, application/json', function(done) {
        request(app)
        .put('/admin/article/' + articleHelper.article.id + '/undelete')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 404, application/json', function(done) {
        request(app)
        .put('/admin/article/510004860e84e30000000000/undelete')
        .set('Accept', 'application/json')
        .expect(404)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 400, application/json', function(done) {
        request(app)
        .put('/admin/article/abcdefg/undelete')
        .set('Accept', 'application/json')
        .expect(400)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });
});
