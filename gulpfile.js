'use strict';

const gulp = require('gulp');
const del = require('del');
const tsc = require('gulp-typescript');
const tsProject = tsc.createProject('tsconfig.json');
const tslint = require('gulp-tslint');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-minify-css');
const rename = require('gulp-rename');
const jmerge = require('gulp-merge-json');
const fs = require('fs');
const runSequence = require('run-sequence');

gulp.task('compile', ['compileTs', 'compileScss'], function() {
	console.log('Compiling TypeScript and SCSS...');
});

/** Compile TypeScript sources and create sourcemaps in build directory **/
gulp.task('compileTs', ['tslint'], function() {
	let tsResult = gulp.src('src/**/*.ts')
	.pipe(sourcemaps.init())
	.pipe(tsc(tsProject));
	return tsResult.js
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('build'));
});

/** Compile SCSS into CSS **/
gulp.task('compileScss', function() {
	let scssResult = gulp.src('src/**/*.scss')
	.pipe(sass())
	.pipe(autoprefixer('last 2 versions'))
	.pipe(gulp.dest('build'))
	.pipe(rename({suffix: '.min'}))
	.pipe(minifycss())
	.pipe(gulp.dest('build'));
});

/** Copy all resources that are not TypeScript or SCSS files into build directory **/
gulp.task('resources', function() {
	return gulp.src(['src/**/*', '!**/*.ts', '!**/*.scss', '!src/index.html'])
	.pipe(gulp.dest('build'));
});

/** Copy all required libraries into build directory **/
gulp.task('libs', function() {
	return gulp.src([
		'core-js/client/**',
		'zone.js/dist/**',
		'reflect-metadata/**',
		'systemjs/dist/**',
		'rxjs/**',
		'@angular/**'
	], {cwd: 'node_modules/**'}) // Glob required here
	.pipe(gulp.dest('build/lib'));
});

/** Lint all custom TypeScript files **/
gulp.task('tslint', function() {
	return gulp.src('src/**/*.ts')
	.pipe(tslint())
	.pipe(tslint.report('prose'));
});

/** Generate configuration JSON **/
gulp.task('genconfig', function(){
	let envIndex = process.argv.indexOf('--env');
	if (envIndex > -1) {
		envIndex++ ;
	} else {
		throw('Requires --env [env] to be passed');
	}
	let env = process.argv[envIndex];

	let envs = ['common', env];
	let jsonConfigs = envs.map(function(fileName){ return 'src/app/config/' + fileName + '.json'; });
	let override = JSON.parse(fs.readFileSync('override.json', 'utf8'));
	// TODO: inject 'override: true' if override.json exists
	// TODO: fail gracefully if no override.json exists

	gulp.src(jsonConfigs)
	.pipe(jmerge('config.json', false, false, override))
	.pipe(gulp.dest('build/app'));

});

/** Remove build directory **/
gulp.task('clean', function(cb) {
	return del(['build'], cb);
});

/** Watch for changes in TypeScript, HTML and CSS files **/
gulp.task('watch', function() {
	gulp.watch(['src/**/*.ts'], ['compileTs']).on('change', function (e) {
		console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
	});
	gulp.watch(['src/**/*.scss'], ['compileScss']).on('change', function (e) {
		console.log('SCSS file ' + e.path + ' has been changed. Compiling.');
	});
	gulp.watch([['src/**/*', '!**/*.ts', '!**/*.scss']], ['resources']).on('change', function (e) {
		console.log('Resource file ' + e.path + ' has been changed. Updating.');
	});
	gulp.watch(['src/app/config/*.json', 'override.json'], ['genconfig']).on('change', function (e) {
		console.log('Config file ' + e.path + ' has been changed. Updating.');
	});
});

/** Build the project **/
gulp.task('build', ['compile', 'resources', 'libs'], function() {
	console.log('Building the project...');
	return gulp.src(['src/index.html'])
	.pipe(gulp.dest('build')); 
});

/** Start the project **/
gulp.task('default', function(cb) {
	runSequence('compile',
				'resources',
				'genconfig',
				'watch',
				cb);
});
