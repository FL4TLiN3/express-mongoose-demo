var path = require('path'),
    config = require('share').config,
    log = require('share').log,
    dateUtil = require('dateUtil'),
    validator = require('validator'),
    mongoose = require('mongoose');

var TagSchema = require(path.join(config.path.model, 'Tag')).Schema;

var BookmarkSchema = mongoose.Schema({
    url: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: String,
    tags: [TagSchema],
    isForceRemoved: Boolean,
    isPublished: Boolean,
    isDeleted: Boolean,
    createAt: Date,
    updateAt: Date,
    deleteAt: Date
});

BookmarkSchema.methods.getCreateAt = function () {
    return dateUtil.format(this.createAt);
};
BookmarkSchema.methods.getUpdateAt = function () {
    return dateUtil.format(this.updateAt);
};
BookmarkSchema.methods.getDeleteAt = function () {
    return dateUtil.format(this.deleteAt);
};

BookmarkSchema.path('title').validate(validator.max(50), 'test');

module.exports = mongoose.model('Bookmark', BookmarkSchema);

