var path = require('path'),
    share = require('share'),
    config = share.config,
    log = share.log,
    app = share.app,
    request = require('supertest');

var Article = require(path.join(config.path.model, 'Article'));

var articleHelper = require(config.path.testHelper + '/model/article');

describe('PUT /admin/articles/:articleId', function() {
    beforeEach(articleHelper.createArticle);
    afterEach(articleHelper.cleanArticle);

    it('should respond 200, application/json', function(done) {
        request(app)
        .put('/admin/article/' + articleHelper.article.id)
        .send({
            title: 'test',
            description: 'テスト',
            items: [{
                videoId: '3570024',
                title: 'Office Lady In Skirt Licked And Fucked By Her Boyfriend Cum To Mouth Swallowing On The Bed In The Ro',
                url: 'http://www.xvideos.com/video3570024/office_lady_in_skirt_licked_and_fucked_by_her_boyfriend_cum_to_mouth_swallowing_on_the_bed_in_the_ro',
                thumbnail: 'http://img100.xvideos.com/videos/thumbs/45/04/bd/4504bd78eb9bc73dd8b92427280c5360/4504bd78eb9bc73dd8b92427280c5360.1.jpg',
                selected: 0,
                embed: '<iframe src="http://flashservice.xvideos.com/embedframe/3570024" frameborder=0 width=510 height=400 scrolling=no></iframe>'
            }],
            tags: []
        })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 404, application/json', function(done) {
        request(app)
        .put('/admin/article/510004860e84e30000000000')
        .send({
            title: 'test',
            description: 'テスト',
            items: [{
                videoId: '3570024',
                title: 'Office Lady In Skirt Licked And Fucked By Her Boyfriend Cum To Mouth Swallowing On The Bed In The Ro',
                url: 'http://www.xvideos.com/video3570024/office_lady_in_skirt_licked_and_fucked_by_her_boyfriend_cum_to_mouth_swallowing_on_the_bed_in_the_ro',
                thumbnail: 'http://img100.xvideos.com/videos/thumbs/45/04/bd/4504bd78eb9bc73dd8b92427280c5360/4504bd78eb9bc73dd8b92427280c5360.1.jpg',
                selected: 0,
                embed: '<iframe src="http://flashservice.xvideos.com/embedframe/3570024" frameborder=0 width=510 height=400 scrolling=no></iframe>'
            }],
            tags: []
        })
        .set('Accept', 'text/html')
        .expect(404)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 400, application/json', function(done) {
        request(app)
        .put('/admin/article/abcdefg')
        .send({
            title: 'test',
            description: 'テスト',
            items: [{
                videoId: '3570024',
                title: 'Office Lady In Skirt Licked And Fucked By Her Boyfriend Cum To Mouth Swallowing On The Bed In The Ro',
                url: 'http://www.xvideos.com/video3570024/office_lady_in_skirt_licked_and_fucked_by_her_boyfriend_cum_to_mouth_swallowing_on_the_bed_in_the_ro',
                thumbnail: 'http://img100.xvideos.com/videos/thumbs/45/04/bd/4504bd78eb9bc73dd8b92427280c5360/4504bd78eb9bc73dd8b92427280c5360.1.jpg',
                selected: 0,
                embed: '<iframe src="http://flashservice.xvideos.com/embedframe/3570024" frameborder=0 width=510 height=400 scrolling=no></iframe>'
            }],
            tags: []
        })
        .set('Accept', 'text/html')
        .expect(400)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 400, application/json', function(done) {
        request(app)
        .put('/admin/article/' + articleHelper.article.id)
        .send({
            title: 'test',
            description: 'テスト',
            items: [{
                videoId: '3570024',
                title: 'Office Lady In Skirt Licked And Fucked By Her Boyfriend Cum To Mouth Swallowing On The Bed In The Ro',
                url: 'http://www.xvideos.com/video3570024/office_lady_in_skirt_licked_and_fucked_by_her_boyfriend_cum_to_mouth_swallowing_on_the_bed_in_the_ro',
                thumbnail: 'http://img100.xvideos.com/videos/thumbs/45/04/bd/4504bd78eb9bc73dd8b92427280c5360/4504bd78eb9bc73dd8b92427280c5360.1.jpg',
                selected: 0,
                embed: '<iframe src="http://flashservice.xvideos.com/embedframe/3570024" frameborder=0 width=510 height=400 scrolling=no></iframe>'
            }, {
                thumbnail: 'http://img100.xvideos.com/videos/thumbs/45/04/bd/4504bd78eb9bc73dd8b92427280c5360/4504bd78eb9bc73dd8b92427280c5360.1.jpg',
            }],
            tags: []
        })
        .set('Accept', 'application/json')
        .expect(400)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });

    it('should respond 400, application/json', function(done) {
        request(app)
        .put('/admin/article/' + articleHelper.article.id)
        .send({
            title: 'test',
            description: 'テスト',
            items: [{
                videoId: '3570024',
                title: 'Office Lady In Skirt Licked And Fucked By Her Boyfriend Cum To Mouth Swallowing On The Bed In The Ro',
                url: 'http://www.xvideos.com/video3570024/office_lady_in_skirt_licked_and_fucked_by_her_boyfriend_cum_to_mouth_swallowing_on_the_bed_in_the_ro',
                thumbnail: 'http://img100.xvideos.com/videos/thumbs/45/04/bd/4504bd78eb9bc73dd8b92427280c5360/4504bd78eb9bc73dd8b92427280c5360.1.jpg',
                selected: 0,
                embed: '<iframe src="http://flashservice.xvideos.com/embedframe/3570024" frameborder=0 width=510 height=400 scrolling=no></iframe>'
            }, {
                videoId: '3570024',
                title: 'Office Lady In Skirt Licked And Fucked By Her Boyfriend Cum To Mouth Swallowing On The Bed In The Ro',
                url: 'http://www.xvideos.com/video3570024/office_lady_in_skirt_licked_and_fucked_by_her_boyfriend_cum_to_mouth_swallowing_on_the_bed_in_the_ro',
                thumbnail: 'http://img100.xvideos.com/videos/thumbs/45/04/bd/4504bd78eb9bc73dd8b92427280c5360/4504bd78eb9bc73dd8b92427280c5360.1.jpg',
                selected: 0,
                embed: '<iframe src="http://flashservice.xvideos.com/embedframe/3570024" frameborder=0 width=510 height=400 scrolling=no></iframe>'
            }],
            tags: []
        })
        .set('Accept', 'application/json')
        .expect(400)
        .end(function(error, res) {
            if (error) return done(error);
            else return done();
        });
    });
});

