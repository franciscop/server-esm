# @server/esm

A server.js plugin to automatically bundle front-end Javascript with [server.js](https://serverjs.io/). You request `/script.js` or `/script.min.js` and this plugin will make sure to either compile it on each request for dev, or once on launch for production.

> This is **beta software** right now.

## Getting Started

First install the plugin:

```
npm install @server/esm
```

Then in your main `index.js` include it with server.js:

```js
const server = require("server");
const serverEsm = require("@server/esm");

// TEMPORARY; this line will change
server.plugins.push(serverEsm);

const { get } = server.router;
const { render } = server.reply;

// Render a single route for the homepage
server(get("/", () => render("index.html")));
```

Then let's create this file. This will be a simple HTML file inside `views/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>ESM Demo</title>
  </head>
  <body>
    <h1>Hi there</h1>
    <script src="/script.js" charset="utf-8"></script>
  </body>
</html>
```

The main important part here is the `/script.js`. This will be automatically compiled and generated from `@server/esm`. Finally, let's create some javascript:

```js
// scripts/index.js
import add from "./add.js";
document.querySelector("h1").innerHTML = `1 + 2 = ${add(1, 2)}`;
```

```js
// scripts/add.js
export default (a, b) => a + b;
```

Finally start the server with `node .` and try the project by opening `http://localhost:3000/`!

## Options

The only option available is the `source` of the JS, which can be specified as one of either:

```js
// With the default path:
server({ esm: "scripts/index.js" });
server({ esm: { source: "scripts/index.js" } });

// But it can be anything really:
server({ esm: "src/index.js" });
server({ esm: "src/myscript.js" });
```

The extension can be either `.js` or `.mjs`, both will work properly.

The behaviour is a bit different for development and production, but from the front-end point of view you want to just request `/style.css` or `/style.min.css` (depending on your preferences).

## Demo

Clone this repo:

```js
git clone git@github.com:franciscop/server-esm.git
cd server-esm
```

Then install the dependencies, enter `demo` and start the project:

```bash
npm install
cd demo
node .
```

Finally open `http://localhost:3000/` to see the styles being rendered.
