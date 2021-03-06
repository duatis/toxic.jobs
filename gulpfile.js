var gulp = require('gulp');
var mocha = require('gulp-mocha');
var exec = require('child_process').exec;
var watching = false;

gulp.task('default', function(cb) {
    exec('node utils/seed.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
        gulp.src('test/*.test.js').
        pipe(mocha()).on('error',onError);

        gulp.watch('test/*.test.js', function(event) {
            watching = true;
            gulp.src(event.path).
            pipe(mocha()).on('error',onError);
         });
    });
});


function onError(err) {
    console.log(err.toString());
    if (watching) {
        this.emit('end');
    } else {
        // if you want to be really specific
        process.exit(1);
    }
}