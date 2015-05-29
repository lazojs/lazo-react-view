var gulp = require('gulp');

gulp.task('build-example', function () {
    return gulp.src('index.js')
        .pipe(gulp.dest('example/app/lazo-react-view'));
});