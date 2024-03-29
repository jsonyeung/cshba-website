var gulp          = require('gulp');

var deploy        = require('gulp-gh-pages');
var browserSync   = require('browser-sync').create();
var plumber       = require('gulp-plumber');
var sass          = require('gulp-sass');
var postcss       = require('gulp-postcss');
var util          = require('gulp-util');
var gulpif        = require('gulp-if');
var imagemin      = require('gulp-imagemin');

var in_production = util.env.production;

gulp.task('sass', function() {
    var sass_options = {
        sourceComments: !in_production,
        outputStyle: in_production ? 'compressed' : 'nested'
    }

    return gulp.src('app/scss/*.scss')
           .pipe(plumber())
           .pipe(sass(sass_options))
           .pipe(postcss())
           .pipe(gulp.dest('dist'))
           .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src('app/js/*.js')
          .pipe(plumber())
          .pipe(gulp.dest('dist'))
          .pipe(browserSync.stream());
});

gulp.task('images', function() {
    return gulp.src('app/images/**/*')
           .pipe(gulpif(in_production, imagemin()))
           .pipe(gulp.dest('dist/images'))
           .pipe(browserSync.stream());
});

gulp.task('html', function() {
    return gulp.src('app/**/*.html')
           .pipe(gulp.dest('dist'))
           .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/js/**/*.js', ['js']);
    gulp.watch('app/images/**/*', ['images']);
    gulp.watch('app/**/*.html', ['html']);
});


// Commands
gulp.task('build', ['sass', 'js', 'html', 'images']);

gulp.task('dev', ['build', 'watch'], function() {
    var browsersync_options = {
        server: './dist'
    };
    
    browserSync.init(browsersync_options);
});

gulp.task('deploy', function() {
    var deploy_options = {
        remoteUrl: 'https://github.com/jayyeung/cshba_website.git',
    };

    return gulp.src('dist/**/*')
           .pipe(deploy(deploy_options));
});
