import { useEffect, useState } from "react";
import { useTodoStore } from "../store/todoStore";

export default function TodoList() {
  const { todos, loadTodos, deleteTodo, updateTodo } = useTodoStore();
  const [editingId, setEditingId] = useState(null);
  const [newText, setNewText] = useState("");

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const handleUpdate = (id) => {
    updateTodo(id, newText);
    setEditingId(null);
  };

  return (
    <ul className="max-w-md mx-auto space-y-3">
      {todos.map((todo) => (
        <li 
          key={todo.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          {editingId === todo.id ? (
            <div className="flex items-center gap-2 w-full">
              <input
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                onClick={() => handleUpdate(todo.id)}
                className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors duration-200"
              >
                💾
              </button>
            </div>
          ) : (
            <>
              <span className="text-gray-700">{todo.text}</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => deleteTodo(todo.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
                >
                  🗑
                </button>
                <button
                  onClick={() => {
                    setEditingId(todo.id);
                    setNewText(todo.text);
                  }}
                  className="p-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors duration-200"
                >
                  ✏️
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
