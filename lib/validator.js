exports.min = function (len) {
    return function (val) {
        return val.length >= len;
    }
};

exports.max = function (len) {
    return function (val) {
        return val.length <= len;
    }
};
