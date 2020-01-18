const routes = require("express").Router();
const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");

routes.get("/devs", DevController.store);
routes.post("/devs", DevController.index);

routes.get("/search", SearchController.index);

module.exports = routes;
