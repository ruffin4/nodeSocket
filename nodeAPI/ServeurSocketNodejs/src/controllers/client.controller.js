const { insertClient, updateClient, deleteClient } = require("../database/db");

async function handleClientMessage(message) {
  try {
    const { action, data } = JSON.parse(message);

    switch (action) {
      case "add":
        return (await insertClient(data)) ? "Ajout OK" : "Erreur Ajout";
      case "update":
        return (await updateClient(data))
          ? "Modification OK"
          : "Erreur Modification";
      case "delete":
        return (await deleteClient(data.numero))
          ? "Suppression OK"
          : "Erreur Suppression";
      case "addMultiple":
        // Ajouter plusieurs clients
        if (Array.isArray(data) && data.length > 0) {
          const insertionResults = [];
          for (let client of data) {
            const result = await insertClient(client);
            insertionResults.push(result);
          }
          // Vérifier si toutes les insertions ont réussi
          return insertionResults.every((result) => result)
            ? "Tous les clients ajoutés avec succès"
            : "Erreur lors de l'ajout des clients";
        } else {
          return "Données invalides pour l'ajout multiple";
        }
      default:
        return "Action inconnue";
    }
  } catch (err) {
    console.error(err);
    return "Erreur de traitement";
  }
}

module.exports = { handleClientMessage };
