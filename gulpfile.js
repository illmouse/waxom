var gulp 				= require('gulp'),
		sass 				= require('gulp-sass'),
    pug      		= require('gulp-pug'),
		browserSync = require('browser-sync'),
		concat      = require('gulp-concat'),
    notify      = require('gulp-notify');


gulp.task('sass', function() {
	return gulp.src('src/sass/*.sass')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.reload({stream:true}))
		.pipe(notify('CSS changed.'))
});

// gulp.task('haml', function() {
// 	return gulp.src('src/haml/*.haml')
// 		.pipe(haml())
// 		.pipe(gulp.dest('src/'))
// 		.pipe(browserSync.reload({stream: true}))
// 		.pipe(notify('HTML changed.'))
// });

gulp.task('pug', function() {
	return gulp.src('src/pug/*.pug')
		.pipe(pug())
		.pipe(gulp.dest('src/'))
		.pipe(browserSync.reload({stream: true}))
		.pipe(notify('HTML changed.'))
});

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'src'
		},
		notify: false
	});
});

gulp.task('scripts', function() {
    return gulp.src('src')
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js'));
});

gulp.task('watch', ['browserSync', 'sass', 'pug'], function() {
	gulp.watch('src/sass/*.sass', ['sass']);
	gulp.watch('src/pug/*.pug', ['pug']);
	gulp.watch('src/*.html', browserSync.reload);
});

gulp.task('default', ['watch']);