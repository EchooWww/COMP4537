const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const utils = require("./labs/3/modules/utils");
const messages = require("./labs/3/lang/en/en");
const port = process.env.PORT || 3000;

http
  .createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;
    if (parsedUrl.pathname === "/COMP4537/labs/3/getDate/") {
      const name = query.name || "";
      const time = utils.getDate();
      const output = messages.getDate.replace("%1", name).replace("%2", time);
      res.writeHead(200, {
        "Content-Type": "text/html",
        "access-control-allow-origin": "*",
      });
      res.end(`<h1 style="color:0076df">${output}</h1>`);
    } else if (parsedUrl.pathname === "/COMP4537/labs/3/writeFile/") {
      const text = query.text || "";
      fs.appendFile("file.txt", text, (err) => {
        if (err) {
          res.writeHead(500, {
            "Content-Type": "text/html",
            "access-control-allow-origin": "*",
          });
          res.end(`<h1>${messages.writeFailed}</h1>`);
        } else {
          res.writeHead(200, {
            "Content-Type": "text/html",
            "access-control-allow-origin": "*",
          });
          res.end(`<h1>${messages.writeSuccess}</h1>`);
        }
      });
    } else if (parsedUrl.pathname.includes("/COMP4537/labs/3/readFile")) {
      const fileName = parsedUrl.pathname.replace(
        "/COMP4537/labs/3/readFile/",
        ""
      );
      console.log(fileName);
      const file = fileName === "" ? "file.txt" : fileName;
      fs.readFile(file, "utf8", (err, data) => {
        if (err) {
          res.writeHead(404, {
            "Content-Type": "text/html",
            "access-control-allow-origin": "*",
          });
          res.end(`<h1>${messages.fileNotFound.replace("%1", file)}</h1>`);
        } else {
          res.writeHead(200, {
            "Content-Type": "text/html",
            "access-control-allow-origin": "*",
          });
          res.end(`<h1 style="color:0076df">${data}</h1>`);
        }
      });
    } else {
      res.writeHead(404, {
        "Content-Type": "text/html",
        "access-control-allow-origin": "*",
      });
      res.end(`<h1>${messages.notFound}</h1>`);
    }
  })
  .listen(port);
