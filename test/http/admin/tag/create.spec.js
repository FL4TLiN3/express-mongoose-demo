var path = require('path'),
    share = require('share'),
    config = share.config,
    log = share.log,
    app = share.app,
    request = require('supertest');

var Tag = require(path.join(config.path.model, 'Tag'));

var tagHelper = require(config.path.testHelper + '/model/tag');

describe('POST /admin/tag', function() {
    beforeEach(tagHelper.createTag);
    afterEach(tagHelper.cleanTag);

    it('should respond 200, application/json', function(done) {
        request(app)
        .post('/admin/tag')
        .send({
            name: 'Testing...'
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
        .post('/admin/tag')
        .send({
            name: 'sexy'
        })
        .set('Accept', 'application/json')
        .expect(302)
        .end(function(error, res){
            if (error) return done(error);
            else return done();
        });
    });
});

