(function (global) {

	// Tells the System loader where to look for things
	var map = {
		'app': 'app',

		// Angular bundles
		'@angular/common': 'lib/@angular/common/bundles/common.umd.js',
		'@angular/compiler': 'lib/@angular/compiler/bundles/compiler.umd.js',
		'@angular/core': 'lib/@angular/core/bundles/core.umd.js',
		'@angular/forms': 'lib/@angular/forms/bundles/forms.umd.js',
		'@angular/http': 'lib/@angular/http/bundles/http.umd.js',
		'@angular/platform-browser': 'lib/@angular/platform-browser/bundles/platform-browser.umd.js',
		'@angular/platform-browser-dynamic': 'lib/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
		'@angular/router': 'lib/@angular/router/bundles/router.umd.js',

		// Other libraries
		'rxjs': 'lib/rxjs'
	};

	// Tells the System loader how to load when no filename and/or no extension
	var packages = {
		'app': {main: 'bootstrap.js', defaultExtension: 'js'},
		'rxjs': {defaultExtension: 'js'}
	};

	var config = {
		map: map,
		packages: packages
	};

	// filterSystemConfig - index.html's chance to modify config before we register it
	if (global.filterSystemConfig) {
		global.filterSystemConfig(config);
	}

	System.config(config);

})(this);
