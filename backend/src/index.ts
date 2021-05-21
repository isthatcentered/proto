import express = require("express");
import bodyParser = require("body-parser");
import  routes from "./routes";
import config from "./config";

const PORT = 1234;
const app = express();

// Parses incoming request bodies, data available under req.body property
app.use(bodyParser.json());

app.use(config.apiRoot, routes)

const server = app.listen(PORT, () =>
  console.log(`App listening on port ${PORT}`)
);

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
process.on("SIGUSR2", gracefulShutdown); // Sent by nodemon

async function gracefulShutdown() {
  server && server.close(console.log.bind(console, "Server closed"));
  process.exit();
}
