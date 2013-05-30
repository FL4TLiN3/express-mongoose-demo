var express = require('express');

module.exports = function(app) {
    app.use(function(err, req, res, next){
        if (~err.message.indexOf('not found')) return next(); // treat as 404
        console.error(err.stack); // log it
        res.send(500); // error page
    });

    app.use(function(req, res, next){
        res.send(404);
    });
};
