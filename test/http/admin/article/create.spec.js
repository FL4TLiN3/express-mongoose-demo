var path = require('path'),
    share = require('share'),
    config = share.config,
    log = share.log,
    app = share.app,
    request = require('supertest');

var Article = require(path.join(config.path.model, 'Article'));

var articleHelper = require(config.path.testHelper + '/model/article');

describe('POST /admin/article', function() {
    afterEach(articleHelper.cleanArticle);

    it('should respond 200, text/html', function(done) {
        request(app)
        .post('/admin/article')
        .send({
            title: 'Test',
            description: 'description'
        })
        .set('Accept', 'text/html')
        .expect(200)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });
});

