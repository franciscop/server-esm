const server = require("server");
server.plugins.push(require("../index.js"));
const { get } = server.router;
const { render } = server.reply;

server(get("/", () => render("index.html")));
