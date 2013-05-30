var path = require('path'),
    config = require('share').config,
    log = require('share').log,
    dateUtil = require('dateUtil'),
    validator = require('validator'),
    mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    isForceRemoved: Boolean,
    isPublished: Boolean,
    isDeleted: Boolean,
    lastSignInAt: Date,
    signUpAt: Date,
    updateAt: Date,
    deleteAt: Date
});

UserSchema.methods.getLastSignInAt = function () {
    return dateUtil.format(this.lastSignInAt);
};
UserSchema.methods.getSignUpAt = function () {
    return dateUtil.format(this.signUpAt);
};
UserSchema.methods.getUpdateAt = function () {
    return dateUtil.format(this.updateAt);
};
UserSchema.methods.getDeleteAt = function () {
    return dateUtil.format(this.deleteAt);
};

UserSchema.path('email').validate(validator.max(255), 'test');

module.exports = mongoose.model('User', UserSchema);
