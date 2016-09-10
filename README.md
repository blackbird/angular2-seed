# angular2-seed
A simple Angular 2/Typescript seed with some extra goodies.

## Quickstart

1. `npm install`: Installs dependencies.

2. `npm run build`: Builds project into the `/build` directory.

3. `npm start`: Recompiles the project and starts web server.

NOTE: If you make changes to `index.html`, you will need to rerun `npm run build`.

## Other Notes

- Currently BrowserSync does not support injecting Angular2 component CSS since it is embedded. From the lite-server docs:

```
CSS with Angular 2 is embedded thus even though BrowserSync detects the file change to CSS, it does not inject the file via sockets. As a workaround, injectChanges defaults to false.
```
