/*global require, process, console */
(function () {
    'use strict';
	
    // Dependencies
    var gulp = require('gulp'),
        sass = require('gulp-sass'),
        plumber = require('gulp-plumber'),
        sourcemaps = require('gulp-sourcemaps'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
		rimraf = require('rimraf'),
		karma = require('karma').server,
		yargv = require('yargs').argv,
		jshint = require('gulp-jshint'),
		jshintStylish = require('jshint-stylish'),
		watch = require('gulp-watch');
    
    // Convert SCSS to CSS files
	function scssToCSS() {
        var sassSettings = {
                outputStyle: 'compressed',
                errLogToConsole: true
            },
            plumberSettings = {
                errorHandler: function (error) {
                    console.log("SASS Error: " + error);
                }
            };
        
        return gulp.src('./styles/scss/all.scss')
            .pipe(plumber(plumberSettings))
            .pipe(sourcemaps.init())
            .pipe(sass(sassSettings))
            .pipe(sourcemaps.write())
            .pipe(plumber.stop())
            .pipe(gulp.dest('./styles'));
    }
	
	// Uglify and Concatenate Javascript files
	function jsUglifyAndMinify() {
		var plumberSettings = {
			errorHandler: function (error) {
				console.log("JS Error: " + error);
			}
		};
        
        return gulp.src([
			'./app/.config.js',
			'./app/app.module.js',
			'./app/app.config.js',
			'./app/app.run.js',
			'./app/**/*.module.js',
			'./app/**/*.config.js',
			'./app/**/*.run.js',
			'./app/**/!(*.module|*.config|*.run|.config).js'
		])
			.pipe(plumber(plumberSettings))
			.pipe(sourcemaps.init())
            .pipe(concat('app.min.js'))
            .pipe(uglify())
			.pipe(sourcemaps.write())
			.pipe(plumber.stop())
            .pipe(gulp.dest('./scripts/'));
    }
	
	// JSHint to make sure code follows .jshintrc rules
	function jshintCheck() {
		console.log('<------------- Js Hint ---------------------->');
		
		return gulp.src([
			'./app/**/*.js',
			'./scripts/**/!(*.min).js'
		])
			.pipe(jshint('.jshintrc'))
			.pipe(jshint.reporter(jshintStylish));
	}
	
	// Test Javascript files locally
	function jsTestLocal(callback) {
		var karmaConfig = {
				configFile: __dirname + '/tests/karma.conf.js',
				coverageReporter: {
					type: 'html',
					dir: 'tests/coverage/'
				}
			};
		if (!yargv.full && !yargv.f) {
			karmaConfig.exclude = ['tests/unit/**/*.module.spec.js', 
								   'tests/unit/**/*.config.spec.js'];
		}
		karma.start(karmaConfig, function (exitCode) {
			if (callback) {
				callback(exitCode);
			} else {
				process.exit(exitCode);
			}
		});
	}
	
	// Continous Integration
	function jsTestCi() {
		var karmaConfig = {
			configFile: __dirname + '/tests/karma.conf.js',
			singleRun: true,
			browsers: ['PhantomJS'],
			coverageReporter: {
				type: 'lcov',
				dir: 'tests/coverage/'
			}
		};
		
		karma.start(karmaConfig, function (exitCode) {
			process.exit(exitCode);
		});
	}
	
    gulp.task('sass', scssToCSS);
	gulp.task('sassWatch', function () {
		watch('./styles/scss/**/*.scss', scssToCSS);
	});
    gulp.task('jsMin', jsUglifyAndMinify);
	gulp.task('jsMinWatch', function () {
		watch(['./app/**/*.js', './app/.config.js'], jsUglifyAndMinify);
	});
	gulp.task('jsTestLocal', jsTestLocal);
	gulp.task('jshint', jshintCheck);
	gulp.task('jshintWatch', function () {
		watch(['./app/**/*.js', './scripts/**/!(*.min).js'], jshintCheck);
	});
    gulp.task('dev', ['sassWatch', 'jsMinWatch', 'jshintWatch'], function () {
		jsTestLocal();
    });
	gulp.task('fullCompile', ['sass', 'jsMin']);
	
	gulp.task('ci', ['fullCompile'], jsTestCi);
    gulp.task('default', ['dev']);
	
}());