import React, { useEffect } from "react";
import { useTodoStore } from "../store/todoStore";
import { useTestStore } from "../store/testStore";

const ZustandPage = () => {
  const todos = useTodoStore((state) => state.todos);
  const loadTodos = useTodoStore((state) => state.loadTodos);
  const count = useTestStore((state) => state.count);
  const calculeSomme = useTestStore((state) => state.calculeSomme);
  const decrementerCount = useTestStore((state) => state.decrementerCount);
  const message = useTestStore((state) => state.message);
  const color = useTestStore((state) => state.color);
  const setColor = useTestStore((state) => state.setColor);
  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Sélection des Tâches
      </h2>

      <div className="relative">
        <select
          className="w-full p-3 border border-gray-300 rounded-lg bg-white 
                             shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
                             focus:border-transparent appearance-none"
        >
          <option value="">Sélectionnez une tâche</option>
          {todos.map((todo) => (
            <option key={todo.id} value={todo.id}>
              {todo.text}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      <div>
        <p style={{ color }} className=" pt-2">
          {message}
        </p>
        <p className="text-2xl text-blue-700 font-bold pb-4 pt-2">
          count : {count}
        </p>
        <div className="flex gap-4">
          <button
            onClick={calculeSomme}
            className="p-2 rounded-md bg-green-400 text-white"
          >
            incrementer count
          </button>
          <button
            onClick={decrementerCount}
            className="p-2 rounded-md bg-red-600 text-white"
          >
            decrementer count
          </button>
          <button
            onClick={()=>setColor("blue")}
            className="p-2 rounded-md bg-blue-600 text-white"
          >
            Modifier couleur
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZustandPage;
