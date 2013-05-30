var path = require('path'),
    config = require('share').config,
    log = require('share').log,
    dateUtil = require('dateUtil'),
    validator = require('validator'),
    mongoose = require('mongoose');

var TagSchema = require(path.join(config.path.model, 'Tag')).Schema;

var ItemSchema = mongoose.Schema({
    videoId: { type: String, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    thumbnail: { type: String, required: true },
    selected: { type: Number, required: true },
    embed: { type: String, required: true }
});

var ArticleSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: String,
    items: [ItemSchema],
    tags: [TagSchema],
    isForceRemoved: Boolean,
    isPublished: Boolean,
    isDeleted: Boolean,
    createAt: Date,
    updateAt: Date,
    deleteAt: Date
});

ArticleSchema.methods.getCreateAt = function () {
    return dateUtil.format(this.createAt);
};
ArticleSchema.methods.getUpdateAt = function () {
    return dateUtil.format(this.updateAt);
};
ArticleSchema.methods.getDeleteAt = function () {
    return dateUtil.format(this.deleteAt);
};

ArticleSchema.path('title').validate(validator.max(50), 'test');

module.exports = mongoose.model('Article', ArticleSchema);
