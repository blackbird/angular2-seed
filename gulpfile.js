"use strict";

const gulp = require("gulp");
const del = require("del");
const tsc = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
const tsProject = tsc.createProject("tsconfig.json");
const tslint = require('gulp-tslint');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

/** Remove build directory **/
gulp.task('clean', function(cb) {
	return del(["build"], cb);
});

/** Lint all custom TypeScript files **/
gulp.task('tslint', function() {
	return gulp.src("src/**/*.ts")
	.pipe(tslint())
	.pipe(tslint.report('prose'));
});

gulp.task("compile", ['compileTs', 'compileScss'], function() {
	console.log("Compiling TypeScript and SCSS...");
});

/** Compile TypeScript sources and create sourcemaps in build directory **/
gulp.task("compileTs", ["tslint"], function() {
	let tsResult = gulp.src("src/**/*.ts")
	.pipe(sourcemaps.init())
	.pipe(tsc(tsProject));
	return tsResult.js
	.pipe(sourcemaps.write("."))
	.pipe(gulp.dest("build"));
});

/** Compile SCSS into CSS **/
gulp.task("compileScss", function() {
	let scssResult = gulp.src("src/**/*.scss")
	.pipe(sass())
	.pipe(autoprefixer('last 2 versions'))
	.pipe(gulp.dest("build"));
});

/** Copy all resources that are not TypeScript or SCSS files into build directory **/
gulp.task("resources", function() {
	return gulp.src(["src/**/*", "!**/*.ts", "!**/*.scss"])
	.pipe(gulp.dest("build"));
});

/** Copy all required libraries into build directory **/
gulp.task("libs", function() {
	return gulp.src([
		'core-js/client/**',
		'zone.js/dist/**',
		'reflect-metadata/**',
		'systemjs/dist/**',
		'rxjs/**',
		'@angular/**'
	], {cwd: "node_modules/**"}) // Glob required here
	.pipe(gulp.dest("build/lib"));
});

/** Watch for changes in TypeScript, HTML and CSS files **/
gulp.task('watch', function() {
	gulp.watch(["src/**/*.ts"], ['compileTs']).on('change', function (e) {
		console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
	});
	gulp.watch(["src/**/*.scss"], ['compileScss']).on('change', function (e) {
		console.log('SCSS file ' + e.path + ' has been changed. Compiling.');
	});
	gulp.watch([["src/**/*", "!**/*.ts", "!**/*.scss"]], ['resources']).on('change', function (e) {
		console.log('Resource file ' + e.path + ' has been changed. Updating.');
	});
});

/** Build the project **/
gulp.task("build", ['compile', 'resources', 'libs'], function() {
	console.log("Building the project...");
});