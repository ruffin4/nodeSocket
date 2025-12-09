require("dotenv").config();
const { createWebSocketServer } = require("./src/websocket");

createWebSocketServer(5000);
