var config = require('share').config,
    log = require('share').log,
    dateUtil = require('dateUtil'),
    validator = require('validator'),
    mongoose = require('mongoose');

var TagSchema = mongoose.Schema({
    name: { type: String, required: true },
    tagged: { type: Number, required: true },
    createAt: Date,
    updateAt: Date
});

TagSchema.methods.getCreateAt = function () {
    return dateUtil.format(this.createAt);
};
TagSchema.methods.getUpdateAt = function () {
    return dateUtil.format(this.updateAt);
};

TagSchema.path('name').validate(validator.max(16), 'field "name" must within 16 characters');

module.exports = mongoose.model('Tag', TagSchema);
