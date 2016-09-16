# angular2-seed
A simple Angular 2/Typescript seed with some extra goodies.

## Setup/Tooling

- Install Node.js. I recommend installing Node using `n`, a version manager that makes it easy to keep your Node version up to date and switch between versions (https://github.com/tj/n). `npm install -g n && n latest`

- This project is provided with an `.editorconfig` file (http://editorconfig.org/). Editor config allows us to keep certain editor-dependent style choices consistent between our development machines. Check out http://editorconfig.org/#download and download the corresponding plugin for your editor of choice (support for Sublime, Atom, Brackets, VS Code, etc).

## Quickstart

1. `npm install`: Installs dependencies and typings.

1. `npm run build`: Cleans out `/build` and rebuilds project into `/build`.

1. `npm start`: Recompiles the project and starts web server.

NOTE: Gulp will watch for changes to your files and automatically update `/build`. However, if you make changes to `index.html`, you will need to run `npm run build` too see those changes.

## Styleguide

- Some resources for Angular 2 best practices:
	- https://johnpapa.net/angular-2-styles/
	- https://angular.io/styleguide
	- http://tattoocoder.com/angular2-barrels/

- At Blackbird we adhere loosely to variations of BEM/SMACSS for our stylesheets:
	- http://getbem.com/introduction/
	- https://smacss.com/book/categorizing
	- Do not use `id` for styling, every style selector should be a `class`. We do this to separate our style from our logic, and reserve `id` for Javascript and anchor tags.
	- Base: `html, body, ...` Defaults for our entire application.
	- Layouts: `.l-container, ...` Divides pages into sections, hold one or more components together. Prefixed with `-l`.
	- Modifiers/States: `.blockname.is-state, .blockname--elementname.is-state, ...` Ways to describe how our modules or layouts will look when in a particular state. Prefixed with `is-`.

NOTE: This styleguide section is incomplete and will be fleshed out in the future.

## Other Notes

- Currently BrowserSync does not support injecting Angular2 component CSS since it is embedded. From the lite-server docs:
```
CSS with Angular 2 is embedded thus even though BrowserSync detects the file change to CSS, it does not inject the file via sockets. As a workaround, injectChanges defaults to false.
```
