var fs = require('fs'),
    path = require('path'),
    share = require('share'),
    config = share.config = {},
    log = share.log = {},
    Mocha = require('mocha'),
    express = require('express'),
    app = share.app = module.exports = express();

app.set('env', 'test');
require('./config/init')(app);
app.listen(app.get('port'));

var mocha = new Mocha({
    ui: 'bdd',
    reporter: 'spec'
});
if (process.argv.length > 2) {
    for (var i = 2, size = process.argv.length; i < size; i++) {
        mocha.addFile(path.join('./', process.argv[i]));
    }
} else {
    (function dirlookup(dir) {
        fs.readdirSync(dir).forEach(function (file) {
            var stat = fs.statSync(path.join(dir, file));
            if (stat.isFile() && ~file.indexOf('.spec.js')) mocha.addFile(path.join(dir, file));
            else if (stat.isDirectory()) dirlookup(path.join(dir, file));
        });
    })('./test');
}

mocha.run(function(failures){
    process.exit(failures);
});
