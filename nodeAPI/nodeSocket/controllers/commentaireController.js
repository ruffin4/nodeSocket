const Commentaire = require('../models/Commentaire');

exports.createCommentaire = async (req, res, io) => {
  const { auteur, comms } = req.body;
  if (!auteur || !comms) {
    return res.status(400).json({ message: 'Champs manquants' });
  }

  try {
    const commentaire = await Commentaire.create({ auteur, comms });

    io.emit('notification', {
      message: `Commentaire: ${auteur} x ${comms}`,
      date: new Date()
    });

    res.status(201).json(commentaire);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
 exports.fetchCommentaire = async (req,res,io) => {
  try {
    const  commentaire = await Commentaire.findAll();
    return res.status(201).json(commentaire)
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
 }
