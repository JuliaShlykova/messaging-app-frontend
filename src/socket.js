import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_SERVER_URL, {
  autoConnect: false //prevent opening a connection to the server before sending credentials
});

export default socket;