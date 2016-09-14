# angular2-seed
A simple Angular 2/Typescript seed with some extra goodies.

## Tooling

1. This project is provided with an `.editorconfig` file (http://editorconfig.org/). Editor config allows us to keep certain editor-dependent style choices consistent between our development machines. Check out http://editorconfig.org/#download and download the corresponding plugin for your editor of choice (support for Sublime, Atom, Brackets, VS Code, etc).

## Quickstart

1. `npm install`: Installs dependencies.

1. `npm run clean`: Cleans out the `/build` directory.

1. `npm run build`: Builds project into the `/build` directory.

1. `npm start`: Recompiles the project and starts web server.

NOTE: If you make changes to `index.html`, you will need to rerun `npm run build`.

## Other Notes

- Currently BrowserSync does not support injecting Angular2 component CSS since it is embedded. From the lite-server docs:

```
CSS with Angular 2 is embedded thus even though BrowserSync detects the file change to CSS, it does not inject the file via sockets. As a workaround, injectChanges defaults to false.
```
