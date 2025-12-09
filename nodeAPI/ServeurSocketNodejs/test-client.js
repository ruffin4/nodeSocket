const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:5000");

ws.on("open", () => {
  console.log("🟢 Connecté au serveur");

  const payload = {
    action: "add",
    data: {
      numero: 2,
      nom: "Jean",
      adress: "Fianarantsoa",
      solde: 10000,
    },
    
  };

  ws.send(JSON.stringify(payload));
});

ws.on("message", (message) => {
  console.log("📩 Réponse serveur:", message.toString());
  ws.close();
});
