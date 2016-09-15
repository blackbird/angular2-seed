'use strict';

const gulp = require('gulp');
const del = require('del');
const tsc = require('gulp-typescript');
const tsProject = tsc.createProject('tsconfig.json');
const tslint = require('gulp-tslint');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const fs = require('fs');

const buildDest = 'build';

// Compile Typescript and SCSS
gulp.task('compile', ['compileTs', 'compileScss'], function() {
	console.log('Compiling TypeScript and SCSS...');
});

// Compile TypeScript sources and create sourcemaps in build directory
gulp.task('compileTs', ['tslint'], function() {
	let tsResult = gulp.src('src/**/*.ts')
		.pipe(sourcemaps.init())
		.pipe(tsc(tsProject));
	return tsResult.js
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(buildDest));
});

// Compile SCSS sources
gulp.task('compileScss', function() {
	let scssResult = gulp.src('src/**/*.scss')
		.pipe(sass())
		.pipe(autoprefixer('last 2 versions'))
		.pipe(gulp.dest('build'))
		.pipe(rename({suffix: '.min'}))
		.pipe(cleancss())
		.pipe(gulp.dest(buildDest));
});

// Copy all resources that are not TypeScript or SCSS files into build directory
gulp.task('resources', function() {
	return gulp.src(['src/**/*', '!**/*.ts', '!**/*.scss', '!src/index.html'])
	.pipe(gulp.dest(buildDest));
});

// Copy all required libraries into build directory
gulp.task('libs', function() {
	return gulp.src([
		'core-js/client/**',
		'zone.js/dist/**',
		'reflect-metadata/**',
		'systemjs/dist/**',
		'rxjs/**',
		'@angular/**'
	], {cwd: 'node_modules/**'}) // Glob required here
		.pipe(gulp.dest(buildDest + '/lib'));
});

// Lint all custom TypeScript files
gulp.task('tslint', function() {
	return gulp.src('src/**/*.ts')
		.pipe(tslint())
		.pipe(tslint.report('prose'));
});

// Generate configuration
gulp.task('genconfig', function(){
	let envIndex = process.argv.indexOf('--env');
	if (envIndex > -1) {
		envIndex++ ;
	} else {
		throw('Requires --env [env] to be passed');
	}
	let env = process.argv[envIndex];

	gulp.src('config/env.' + env + '.ts')
		.pipe(rename('env.ts'))
		.pipe(sourcemaps.init())
		.pipe(tsc())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(buildDest + '/app'));
});

// Remove build directory
gulp.task('clean', function(cb) {
	let dests = [];
	if(fs.existsSync(buildDest)) {
		dests.push(buildDest);
	}
	else {
		console.log('No build folder, skipping clean task.');
	}
	return del(dests, cb);
});

// Watch for changes in TypeScript, HTML and CSS files
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
	gulp.watch(['config/*.ts'], ['genconfig']).on('change', function (e) {
		console.log('Config file ' + e.path + ' has been changed. Updating.');
	});
});

// Build the project
gulp.task('build', ['compile', 'resources', 'libs'], function() {
	console.log('Building the project...');
	return gulp.src(['src/index.html'])
		.pipe(gulp.dest(buildDest));
});

// Start the project
gulp.task('default', function(cb) {
	runSequence('genconfig',
				'resources',
				'compile',
				'watch',
				cb);
});
