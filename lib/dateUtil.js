exports.format = function (date) {
    if (!date) return '';
    else return date.toFormat('YYYY/MM/DD HH24:MI:SS');
};
