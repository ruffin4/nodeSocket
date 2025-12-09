
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "gestion_client",
  port:  3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function insertClient(client) {
  try {
    const sql = `INSERT INTO clients ( nom, adress, solde) VALUES ( ?, ?, ?)`;


    console.log(' connexion à la base de données...');
    console.log('Données client:', client);
    
    const [rows] = await pool.execute(sql, [
      client.nom,
      client.adress,
      client.solde,
    ]);
    console.log('Résultat insertion:', rows);
    return rows.affectedRows > 0;
  } catch (err) {
    console.error("Erreur détaillée:", err);
    return false;
  }
}
async function insertMultipleClients() {
  try {
    // Charger le fichier JSON
    const data = fs.readFileSync("clients.json", "utf8");
    const clients = JSON.parse(data);

    // Insertion des clients un par un
    for (let client of clients) {
      const success = await insertClient(client);
      if (!success) {
        console.log(`Erreur lors de l'insertion du client: ${client.nom}`);
      }
    }

    console.log("Tous les clients ont été insérés avec succès");
  } catch (err) {
    console.error("Erreur lors de l'insertion des clients:", err);
  }
}

async function updateClient(client) {
  try {
    const sql = `UPDATE clients SET nom = ?, adress = ?, solde = ? WHERE numero = ?`;
    const [rows] = await pool.execute(sql, [
      client.nom,
      client.adresse,
      client.solde,
      client.numero,
    ]);
    return rows.affectedRows > 0;
  } catch (err) {
    console.error("Erreur updateClient:", err.message);
    return false;
  }
}

async function deleteClient(numero) {
  try {
    const sql = `DELETE FROM clients WHERE numero = ?`;
    const [rows] = await pool.execute(sql, [numero]);
    return rows.affectedRows > 0;
  } catch (err) {
    console.error("Erreur deleteClient:", err.message);
    return false;
  }
}

module.exports = {
  insertClient,
  updateClient,
  deleteClient,
  insertMultipleClients,
};
