var path = require('path'),
    share = require('share'),
    config = share.config,
    log = share.log,
    app = share.app,
    request = require('supertest');

var Article = require(path.join(config.path.model, 'Article')),
    ArticleTag = require(path.join(config.path.model, 'ArticleTag')),
    Tag = require(path.join(config.path.model, 'Tag'));

var articleTagHelper = require(config.path.testHelper + '/model/articleTag');

describe('PUT /admin/articles/:articleId/tag', function() {
    beforeEach(articleTagHelper.createArticleTag);
    afterEach(articleTagHelper.cleanArticleTag);

    it('should respond 200, application/json', function(done) {
        var asserted = [];
        var assertCallback = function (result) {
            asserted.push(result);
            if (asserted.length === 3) {
                for (var i = 0, size = asserted.length; i < size; i++) {
                    if (!asserted[i]) return done({ message: 'assertion error' });
                }
                return done();
            }
        };
        request(app)
        .del('/admin/article/' + articleTagHelper.article.id + '/tag')
        .send({
            name: 'TestTag'
        })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(error, res) {
            if (error) return done(error);
            Article.findOne({ _id: articleTagHelper.article.id }).exec(function (error, article) {
                if (article.tags.length === 0) assertCallback(true);
                else assertCallback(false);
            });
            ArticleTag.findOne({ _id: articleTagHelper.articleTag.id }).exec(function (error, articleTag) {
                if (!articleTag) assertCallback(true);
                else assertCallback(false);
            });
            Tag.findOne({ _id: articleTagHelper.tag.id }).exec(function (error, tag) {
                if (tag.tagged === 0) assertCallback(true);
                else assertCallback(false);
            });
        });
    });

    it('should respond 404, application/json', function(done) {
        request(app)
        .del('/admin/article/' + articleTagHelper.article.id + '/tag')
        .send({
            name: '12345678901234567'
        })
        .set('Accept', 'application/json')
        .expect(404)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 404, application/json', function(done) {
        request(app)
        .put('/admin/article/510004860e84e30000000000/tag')
        .send({
            name: 'TestTag'
        })
        .set('Accept', 'application/json')
        .expect(404)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });
});

