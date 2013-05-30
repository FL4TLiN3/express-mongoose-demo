if (location.hostname === 'localhost' || ~location.hostname.indexOf('192.168')) {
    var livereload = document.createElement('script');
    livereload.src = 'http://' + location.hostname + ':35729/livereload.js';
    document.body.appendChild(livereload);
}
