var gulp 				= require('gulp'),
		sass 				= require('gulp-sass'),
		haml 				= require('gulp-ruby-haml'),
		browserSync = require('browser-sync'),
		concat      = require('gulp-concat'),
    uglify      = require('gulp-uglifyjs'),
    notify      = require('gulp-notify');


gulp.task('sass', function() {
	return gulp.src('app/sass/*.sass')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream:true}))
		.pipe(notify('CSS changed.'))
});

gulp.task('haml', function() {
	return gulp.src('app/haml/*.haml')
		.pipe(haml())
		.pipe(gulp.dest('app/'))
		.pipe(browserSync.reload({stream: true}))
		.pipe(notify('HTML changed.'))
});

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('scripts', function() {
    return gulp.src('app')
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('app/sass/*.sass', ['sass']);
	gulp.watch('app/haml/*.haml', ['haml']);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('default', ['watch']);