module.exports = function techs2array(techsString) {
  return techsString.split(",").map(tech => tech.trim());
};
