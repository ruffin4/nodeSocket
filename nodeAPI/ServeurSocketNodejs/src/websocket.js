const WebSocket = require("ws");
const { handleClientMessage } = require("./controllers/client.controller");

function createWebSocketServer(port) {
  const wss = new WebSocket.Server({ port }, () => {
    console.log(`WebSocket Server running on ws://localhost:${port}`);
  });

  wss.on("connection", (ws) => {
    ws.on("message", async (message) => {
      const response = await handleClientMessage(message);
      ws.send(response);
    });
  });
}

module.exports = { createWebSocketServer };
