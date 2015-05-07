/*global require */
(function () {
    'use strict';
	
    // Dependencies
    var gulp = require('gulp'),
        sass = require('gulp-sass'),
        plumber = require('gulp-plumber'),
        sourcemaps = require('gulp-sourcemaps'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
		console = window.console;
    
    // Convert SCSS to CSS files
    gulp.task('sass', function () {
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
    });
    
    // JSX Transpile, Uglify and Concatenate Javascript files
    gulp.task('js', function () {
		var plumberSettings = {
			errorHandler: function (error) {
				console.log("JS Error: " + error);
			}
		};
        
        return gulp.src([
			'./app/**/config.js',
			'./app/**/module.js',
			'./app/**/!(module,config)*.js'
		])
			.pipe(plumber(plumberSettings))
            .pipe(concat('app.min.js'))
            .pipe(gulp.dest('./scripts/'))
            .pipe(uglify())
			.pipe(plumber.stop())
            .pipe(gulp.dest('./scripts/'));
    });
    
    gulp.task('watch', function () {
        gulp.watch('./styles/scss/**/*.scss', ['sass']);
        gulp.watch('./app/**/*.js', ['js']);
    });
    
    gulp.task('default', ['watch']);
    
}());