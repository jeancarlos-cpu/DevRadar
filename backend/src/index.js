const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const { setupWebsocket } = require("./websocket");

const app = express();
const server = http.Server(app);
setupWebsocket(server);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);
server.listen(4000);
