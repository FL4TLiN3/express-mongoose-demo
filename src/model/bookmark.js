var path = require('path'),
    config = require('share').config,
    log = require('share').log,
    dateUtil = require('dateUtil'),
    validator = require('validator'),
    mongoose = require('mongoose');

var BookmarkSchema = mongoose.Schema({
    url: { type: String, required: true },
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

module.exports = mongoose.model('Bookmark', BookmarkSchema);

