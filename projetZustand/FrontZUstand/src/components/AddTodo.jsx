import { useState } from "react";
import { useTodoStore } from "../store/todoStore";
import Spinner from "./Spinner";
export default function AddTodo() {
  const [text, setText] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);
  const { loading } = useTodoStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText("");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-md"
    >
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nouvelle tâche"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button 
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {loading ? (<Spinner />) : "Ajouter"}
        
        </button>
      </div>
    </form>
  );
}
