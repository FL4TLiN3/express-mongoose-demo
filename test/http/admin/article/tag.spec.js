var path = require('path'),
    share = require('share'),
    config = share.config,
    log = share.log,
    app = share.app,
    request = require('supertest');

var Article = require(path.join(config.path.model, 'Article'));

var articleTagHelper = require(config.path.testHelper + '/model/articleTag');

describe('PUT /admin/articles/:articleId/tag', function() {
    beforeEach(articleTagHelper.createArticleTag);
    afterEach(articleTagHelper.cleanArticleTag);

    it('should respond 200, application/json', function(done) {
        request(app)
        .put('/admin/article/' + articleTagHelper.article.id + '/tag')
        .send({
            name: '1234567890123456'
        })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 302, application/json', function(done) {
        request(app)
        .put('/admin/article/' + articleTagHelper.article.id + '/tag')
        .send({
            name: 'TestTag'
        })
        .set('Accept', 'application/json')
        .expect(302)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 400, application/json', function(done) {
        request(app)
        .put('/admin/article/' + articleTagHelper.article.id + '/tag')
        .send({
            name: '12345678901234567'
        })
        .set('Accept', 'application/json')
        .expect(400)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 404, application/json', function(done) {
        request(app)
        .put('/admin/article/510004860e84e30000000000/tag')
        .send({
            name: '1234567890123456'
        })
        .set('Accept', 'application/json')
        .expect(404)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });
});

