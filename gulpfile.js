/*===================
* Tasks for frontend automation 
* run 'npm install' to install dependencies 
====================*/

/*
npm package definition
*/

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    del = require('del'),
    gulp_if = require('gulp-if'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    jshint = require('gulp-jshint'),
    debug = require('gulp-debug');


/*========
clean all the builds
=========*/
gulp.task('clean', function() {
    return del(['neuromagic/index.html', 'neuromagic/dist/', 'neuromagic/static/css/*'], { force: true });
});


/*========
Move main bowerfiles(js files) in dist folder 
=========*/
gulp.task('main:bower', function() {
    return gulp.src([
        'bower_components/angular/angular.min.js',
    	'bower_components/angular-ui-router/release/angular-ui-router.min.js',
    	'bower_components/jquery/dist/jquery.min.js',
    	'bower_components/materialize/dist/js/materialize.min.js',
    	'bower_components/materialize/dist/css/materialize.min.css',
    	])
        .pipe(gulp.dest("neuromagic/dist/bower/"))
});

/*========
Concat all the js libs into one vendor file
========*/
gulp.task('vendorjs', function() {
    return gulp.src([
            'neuromagic/dist/bower/angular.min.js',
            'neuromagic/dist/bower/jquery.min.js',
            'neuromagic/dist/bower/*.js',
        ])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('neuromagic/dist/vendor/'));
});


/*========
Concat all the css libs into one vendor file
========*/
gulp.task('vendorcss', function() {
    return gulp.src([
            'neuromagic/dist/bower/materialize/**/*.css',
            'neuromagic/dist/bower/**/*.css',
        ])
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('neuromagic/dist/vendor/'));
});


/*========
build fonts
=========*/
gulp.task('build:fonts', function() {
    return gulp.src([
            'bower_components/materialize/dist/fonts/**/',
        ])
        .pipe(gulp.dest('neuromagic/dist/fonts/'));
});


/*========
build images
=========*/
gulp.task('build:images', function() {
    return gulp.src([
            'neuromagic/static/images/**/',
        ])
        .pipe(gulp_if(flags.production, imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('neuromagic/dist/images/'));
});


/*========
build css
=========*/
gulp.task('build:css', function() {
    return gulp.src([
            'neuromagic/static/css/**/*.css',
            'neuromagic/dist/vendor/*.css'
        ])
        .pipe(gulp_if(flags.production, cssmin()))
        .pipe(gulp_if(flags.production, rename({ suffix: '.min' })))
        .pipe(gulp.dest('neuromagic/dist/build/'));
});


/*========
build js
=========*/
gulp.task('build:js', function() {
    return gulp.src([
            'neuromagic/dist/vendor/*.js'
        ])
        .pipe(gulp_if(flags.production, uglify()))
        .pipe(gulp_if(flags.production, rename({ suffix: '.min' })))
        .pipe(gulp.dest('neuromagic/dist/build/'));
});


/*========= 
Inject static files' path in index.htmk 
==========*/
gulp.task('inject', function() {
    var target = gulp.src('neuromagic/base.html');
    var css = gulp.src([
        'neuromagic/dist/build/vendor.css',
        'neuromagic/dist/build/base.css',
        'neuromagic/dist/build/*.css'
    ], { read: false });
    var js = gulp.src([
        'neuromagic/dist/build/*.js',
    ], { read: false });
    var configs = gulp.src([
        'neuromagic/configs/*.js'
    ], { read: false });
    var constants = gulp.src([
        'neuromagic/constants/*.js'
    ], { read: false });
    var directives = gulp.src([
        'neuromagic/directives/*.js'
    ], { read: false });
    var services = gulp.src([
        'neuromagic/services/*.js'
    ], { read: false });
    var controllers = gulp.src([
        'neuromagic/controllers/*.js'
    ], { read: false });

    return target
        .pipe(inject(css, {
            ignorePath: 'neuromagic',
            addRootSlash: true
        }))
        .pipe(inject(js, {
            ignorePath: 'neuromagic',
            addRootSlash: true
        }))
        .pipe(inject(configs, {
            starttag: '<!-- inject:configs:{{ext}} -->',
            ignorePath: 'neuromagic',
            addRootSlash: true
        }))
        .pipe(inject(constants, {
            starttag: '<!-- inject:constants:{{ext}} -->',
            ignorePath: 'neuromagic',
            addRootSlash: true
        }))
        .pipe(inject(directives, {
            starttag: '<!-- inject:directives:{{ext}} -->',
            ignorePath: 'neuromagic',
            addRootSlash: true
        }))
        .pipe(inject(services, {
            starttag: '<!-- inject:services:{{ext}} -->',
            ignorePath: 'neuromagic',
            addRootSlash: true
        }))
        .pipe(inject(controllers, {
            starttag: '<!-- inject:controllers:{{ext}} -->',
            ignorePath: 'neuromagic',
            addRootSlash: true
        }))
        .pipe(rename({
            basename: "index"
        }))
        .pipe(gulp.dest('neuromagic'));
})


/*========= 
Development Server
==========*/
gulp.task('dev:connect', function() {
    connect.server({
        root: 'neuromagic',
        port: 9000,
        livereload: true,
        fallback: 'neuromagic/index.html'
    });
});


/*========= 
Production server 
==========*/
gulp.task('prod:connect', function() {
    connect.server({
        root: 'neuromagic',
        port: 9000,
        fallback: 'neuromagic/index.html'
    });
});


/*========= 
Add task for sass files.
On change in sass file the sass file are compiled into css
and export to css directory automatically
==========*/
gulp.task('sass', function() {
    return gulp.src('neuromagic/static/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('neuromagic/static/css/'));
});


/*===========
Refresh tasks depends on watch
============*/
gulp.task('refresh', ['build:fonts', 'build:images', 'build:css', 'build:js'], function() {
    gulp.src([
            'neuronme/modules/**/*.html',
            'neuronme/static/css/**/*.css',
            'neuronme/configs/**/*.js',
            'neuronme/constants/**/*.js',
            'neuronme/directives/**/*.js',
            'neuronme/services/**/*.js',
            'neuronme/controllers/**/*.js',
        ])
        .pipe(connect.reload())
})

/*========= 
Gulp watch tasks
==========*/
gulp.task('watch', function() {

    gulp.watch([
        'neuromagic/static/scss/**/*.scss'
    ], ['sass']);

    gulp.watch([
        'neuromagic/modules/**/*.html',
        'neuromagic/static/css/**/*.css',
        'neuromagic/configs/**/*.js',
        'neuromagic/constants/**/*.js',
        'neuromagic/directives/**/*.js',
        'neuromagic/services/**/*.js',
        'neuromagic/controllers/**/*.js',
    ], ['refresh']);
});


/*========= 
JS Linting
==========*/
gulp.task('lint', function() {
    return gulp.src([
            '!neuromagic/bower_components/**/*.js',
            '!neuromagic/dist/**/*.js',
            '!neuromagic/static/**/*.js',
            'neuromagic/**/*.js'
        ]).pipe(jshint({
            "globals": {
                "$": false,
                "jquery": false,
                "angular": false
            },
        }))
        .pipe(jshint.reporter('jshint-stylish'));
});

/*========= 
Run Gulp
==========*/

var flags = {
    production: false
};

gulp.task('prod:runserver', function(callback) {
    flags.production = true;
    runSequence('clean', 'sass', 'main:bower', ['vendorcss', 'vendorjs'], ['build:fonts', 'build:images', 'build:css', 'build:js'], 'inject', 'prod:connect', callback);
})

gulp.task('dev:runserver', function(callback) {
    runSequence('clean', 'sass', 'main:bower', ['vendorcss', 'vendorjs'], ['build:fonts', 'build:images', 'build:css', 'build:js'], 'inject', 'dev:connect', 'watch', callback);
})
