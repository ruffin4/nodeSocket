const db = require("../models/db");

// GET /api/todos
exports.getTodos = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM todos");
  res.json(rows);
};

// POST /api/todos
exports.createTodo = async (req, res) => {
  const { text } = req.body;
  const [result] = await db.query("INSERT INTO todos (text) VALUES (?)", [
    text,
  ]);
  const newTodo = { id: result.insertId, text };
  res.status(201).json(newTodo);
};

// PUT /api/todos/:id
exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  await db.query("UPDATE todos SET text = ? WHERE id = ?", [text, id]);
  res.json({ id: Number(id), text });
};

// DELETE /api/todos/:id
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM todos WHERE id = ?", [id]);
  res.sendStatus(204);
};
