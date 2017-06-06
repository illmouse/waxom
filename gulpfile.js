var gulp 					= require('gulp'),
		sass 					= require('gulp-sass'),
    pug      			= require('gulp-pug'),
		browserSync 	= require('browser-sync'),
		concat      	= require('gulp-concat'),
    notify      	= require('gulp-notify'),
    autoprefixer	= require('gulp-autoprefixer'),
    sourcemaps 		= require('gulp-sourcemaps');

var pug_in = 'src/pug/*.pug'
var pug_out = 'src'

var sass_in = 'src/sass/*.sass'
var sass_out = 'src/css'

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'src'
		},
		notify: false
	});
});

gulp.task('sass', function() {
	return gulp.src(sass_in)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer('> 5%', 'last 2 version'))
		.pipe(sourcemaps.write(''))
		.pipe(gulp.dest(sass_out))
		// .pipe(browserSync.reload({stream: true}))
		.pipe(notify({message: 'CSS changed.', onLast: true}))
});

gulp.task('sass-reload', ['sass'], function() {
    browserSync.reload({stream: true});
});


gulp.task('pug', function() {
	return gulp.src(pug_in)
		.pipe(pug())
		.pipe(gulp.dest(pug_out))
		.pipe(notify('HTML changed.'))
});

gulp.task('pug-reload', ['pug'], function() {
    browserSync.reload({stream: true});
});

gulp.task('watch', ['browserSync', 'sass', 'pug'], function() {
	gulp.watch(sass_in, ['sass-reload']);
	gulp.watch(pug_in, ['pug-reload']);
});

gulp.task('default', ['watch']);


// gulp.task('scripts', function() {
//     return gulp.src('src')
//         .pipe(concat('libs.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('src/js'));
// });