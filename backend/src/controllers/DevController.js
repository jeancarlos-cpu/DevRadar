const axios = require("axios");
const Dev = require("../models/Dev");
const techs2array = require("../utils/techs2array");
// index, show, store, update, destroy
module.exports = {
  async index(req, res) {
    try {
      const devs = await Dev.find();
      return res.json(devs);
    } catch {
      res.status(500).json("Unable to get Devs");
    }
  },
  async store(req, res) {
    try {
      const { github_username, techs, latitude, longitude } = req.body;
      let dev = await Dev.findOne({ github_username });
      if (dev) return res.status(400).json("Dev already exists.");
      const { data } = await axios.get(
        `https://api.github.com/users/${github_username}`
      );
      const { name, login, avatar_url, bio } = data;

      const techsArray = techs2array(techs);
      dev = await Dev.create({
        github_username,
        name: name || login,
        avatar_url,
        bio,
        techs: techsArray,
        location: {
          type: "Point",
          coordinates: [longitude, latitude]
        }
      });

      return res.json(dev);
    } catch {
      res.status(500).json("Unable to create new Dev");
    }
  }
};
