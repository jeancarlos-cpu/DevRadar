import socketio from "socket.io-client";

const socket = socketio("http://192.168.0.14:4000", {
  autoConnect: false
});

export function subscribeToNewDevs(subscribeFunction) {
  socket.io("new-dev", subscribeFunction);
}

export function connect(currentLocation, techs) {
  const { latitude, longitude } = currentLocation;
  socket.io.opts.query = { latitude, longitude, techs };

  socket.connect();
}

export function disconnect() {
  socket.disconnect();
}
