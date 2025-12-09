const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');
const sequelize = require('./config/database');

const app = express();
const server = http.createServer(app);

// Initialiser Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const commentaireRoutes = require('./routes/commentaireRoutes');
app.use('/api/comment', commentaireRoutes(io)); // doit retourner une fonction avec io

// Ton IP locale (sans espace)

const PORT = 3000;

// Démarrer le serveur et synchroniser la base de données
sequelize.sync()
  .then(() => {
    console.log('✅ Base de données synchronisée');
    server.listen(PORT, () => {
      console.log(`✅ Serveur en marche sur http://${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erreur de connexion DB:', err.message);
  });
