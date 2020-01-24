const Dev = require("../models/Dev");
const techs2array = require("../utils/techs2array");

module.exports = {
  async index(req, res) {
    try {
      const { latitude, longitude, techs } = req.query;
      const techsArray = techs2array(techs);
      const devs = await Dev.find({
        techs: {
          $in: techsArray
        },
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [longitude, latitude]
            },
            $maxDistance: 10000
          }
        }
      });
      console.log(devs);
      return res.json(devs);
    } catch {
      return res.json("wtf");
    }
  }
};
