const socketio = require("socket.io");
const techs2array = require("./utils/techs2array");
const calculateDistance = require("./utils/calculateDistance");
// melhor no redis:
const connections = [];

let io;

exports.setupWebsocket = server => {
  io = socketio(server);
  io.on("connection", socket => {
    const { latitude, longitude, techs } = socket.handshake.query;
    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude)
      },
      techs: techs2array(techs)
    });
  });
};

exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    return (
      calculateDistance(coordinates, connection.coordinates) < 10 &&
      connection.techs.some(item => techs.includes(item))
    );
  });
};

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
};