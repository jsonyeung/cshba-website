var gulp          = require('gulp');

var deploy        = require('gulp-gh-pages');
var browserSync   = require('browser-sync').create();
var plumber       = require('gulp-plumber');
var sass          = require('gulp-sass');
var postcss       = require('gulp-postcss');
var concat        = require('gulp-concat');
var rename        = require('gulp-rename');
var uglify        = require('gulp-uglify');
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
    return gulp.src('app/js/**/*.js')
          .pipe(plumber())
          .pipe(concat('main.js'))
          .pipe(rename('main.min.js'))
          .pipe(uglify())
          .pipe(gulp.dest('dist'))
          .pipe(browserSync.stream());
});

gulp.task('images', function() {
    return gulp.src('app/images/**/*')
           .pipe(gulpif(in_production, imagemin()))
           .pipe(gulp.dest('dist/images'))
           .pipe(browserSync.stream());
});

gulp.task('twig', function() {
    return gulp.src('app/**/*.twig')
           .pipe(gulp.dest('dist'))
           .pipe(browserSync.stream());
});

gulp.task('php', function() {
    return gulp.src('app/**/*.php')
           .pipe(gulp.dest('dist'))
           .pipe(browserSync.stream());
});

gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
           .pipe(gulp.dest('dist/fonts'))
           .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/js/**/*.js', ['js']);
    gulp.watch('app/images/**/*', ['images']);
    gulp.watch('app/fonts/**/*', ['fonts']);
    gulp.watch('app/**/*.twig', ['twig']);
    gulp.watch('app/**/*.php', ['php']);
});


// Commands
gulp.task('build', ['sass', 'js', 'twig', 'php', 'images', 'fonts']);

gulp.task('dev', ['build', 'watch'], function() {
    var browsersync_options = {
        proxy: 'http://localhost/wordpress'
        // server: './dist'
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
