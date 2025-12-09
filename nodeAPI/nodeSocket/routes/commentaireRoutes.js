const express = require('express');
const router = express.Router();
const commentaireController = require('../controllers/commentaireController');

module.exports = (io) => {
  router.post('/', (req, res) => commentaireController.createCommentaire(req, res, io));
  router.get('/', (req, res) => commentaireController.fetchCommentaire(req, res, io));

  return router;
};
