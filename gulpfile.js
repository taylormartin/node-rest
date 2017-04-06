let gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha'),
    ts = require('gulp-typescript'),
    env = require('gulp-env');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('test', function(){
  env({vars: {ENV: 'Test'}});
  gulp.src('tests/*.js', {read: false})
    .pipe(gulpMocha({reporter: 'nyan'}));
});

gulp.task('scripts', () => {
    const tsResult = tsProject.src()
        .pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('start', ['scripts'], () => {
    nodemon({
        script: 'dist/app.js',
        ext: 'ts',
        tasks: ['scripts'],
        env: {
            PORT: 8000
        },
        ignore: ['./dist/**', './dist/*.js', '']
    })
    .on('restart', () => {
        console.log('restarting...');
    });
});
