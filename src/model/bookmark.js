var dateUtil = require('dateUtil'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookmarkSchema = new Schema({
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

if (!mongoose.models.Bookmark) mongoose.model('Bookmark', BookmarkSchema);
module.exports = mongoose.model('Bookmark');

