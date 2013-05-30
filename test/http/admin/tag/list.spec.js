var path = require('path'),
    share = require('share'),
    config = share.config,
    log = share.log,
    app = share.app,
    request = require('supertest');

var Tag = require(path.join(config.path.model, 'Tag'));

var tagHelper = require(config.path.testHelper + '/model/tag');

describe('GET /admin/tags', function() {
    beforeEach(tagHelper.createTags);
    afterEach(tagHelper.cleanTag);

    it('should respond 200, application/json', function(done) {
        request(app)
        .get('/admin/tags')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(error, res){
            if (error) return done(error);
            else if (res.body.length !== 10 ) return done(new Error('result length dose not match'));
            else return done();
        });
    });
});

