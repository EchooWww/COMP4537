const http = require("http");
const url = require("url");
const utils = require("./modules/utils");
const fs = require("fs");
const message = require("./lang/en/en");
const port = process.env.PORT || 3000;

http
  .createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;
    if (parsedUrl.pathname === "/getDate/") {
      const name = query.name || "";
      const time = utils.getDate();
      const output = message.replace("%1", name).replace("%2", time);
      res.writeHead(200, {
        "Content-Type": "text/html",
        "access-control-allow-origin": "*",
      });
      res.end(`<h1 style="color:0076df">${output}</h1>`);
    } else {
      res.writeHead(404, {
        "Content-Type": "text/html",
        "access-control-allow-origin": "*",
      });
      res.end("<h1>404 Not Found</h1>");
    }
  })
  .listen(port);
