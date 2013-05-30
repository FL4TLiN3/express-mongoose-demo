var path = require('path'),
    share = require('share'),
    config = share.config,
    log = share.log,
    app = share.app,
    request = require('supertest');

var Tag = require(path.join(config.path.model, 'Tag'));

var tagHelper = require(config.path.testHelper + '/model/tag');

describe('GET /admin/tag/:tagId', function() {
    beforeEach(tagHelper.createTag);
    afterEach(tagHelper.cleanTag);

    it('should respond 200, application/json', function(done) {
        request(app)
        .get('/admin/tag/' + tagHelper.tag.id)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 404, application/json', function(done) {
        request(app)
        .get('/admin/tag/510004860e84e30000000000')
        .set('Accept', 'application/json')
        .expect(404)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 400, application/json', function(done) {
        request(app)
        .get('/admin/tag/abcdefg')
        .set('Accept', 'application/json')
        .expect(400)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });
});

