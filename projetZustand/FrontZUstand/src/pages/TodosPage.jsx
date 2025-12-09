import React from 'react';
import  AddTodo  from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { useTodoStore } from "../store/todoStore";
const TodosPage = () => {
    const { message } = useTodoStore();
    return (
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Liste des tâches
        </h2>
      {message && (
        <div className="bg-gray-50 p-4 rounded-md text-white  text-center border-2 border-gray-300 shadow-md mb-6">
          <p className="text-lg text-green-700 font-semibold ">
            {message}
          </p>
        </div>
      )}
        <AddTodo />
        <TodoList />
      </div>
    );
};

export default TodosPage;