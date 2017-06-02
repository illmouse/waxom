var gulp 					= require('gulp'),
		sass 					= require('gulp-sass'),
    pug      			= require('gulp-pug'),
		browserSync 	= require('browser-sync'),
		concat      	= require('gulp-concat'),
    notify      	= require('gulp-notify'),
    autoprefixer	= require('gulp-autoprefixer'),
    sourcemaps 		= require('gulp-sourcemaps');


gulp.task('sass', function() {
	return gulp.src('src/sass/*.sass')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer('> 5%', 'last 2 version'))
		.pipe(sourcemaps.write('../css'))
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.reload({stream:true}))
		.pipe(notify({message: 'CSS changed.', onLast: true}))
});

gulp.task('pug', function() {
	return gulp.src('/src/pug/*.pug')
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
        .pipe(gulp.dest('/src/js'));
});

gulp.task('watch', ['browserSync', 'sass', 'pug'], function() {
	gulp.watch('/src/sass/*.sass', ['sass']);
	gulp.watch('/src/pug/*.pug', ['pug']);
	gulp.watch('/src/*.html', browserSync.reload);
});

gulp.task('default', ['watch']);