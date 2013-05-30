var config = require('share').config,
    log = require('share').log,
    dateUtil = require('dateUtil'),
    validator = require('validator'),
    mongoose = require('mongoose');

var articleTagSchema = mongoose.Schema({
    articleId: { type: mongoose.Schema.Types.ObjectId, required: true },
    tagId: { type: mongoose.Schema.Types.ObjectId, required: true },
    createAt: Date
});

articleTagSchema.methods.getCreateAt = function () {
    return dateUtil.format(this.createAt);
};

module.exports = mongoose.model('ArticleTag', articleTagSchema);
