import { API } from "../api/api"; 

export const fetchTodos = () => API.get("/todos");
export const addTodo = (todo) => API.post("/todos", todo);
export const updateTodo = (id, data) => API.put(`/todos/${id}`, data);
export const deleteTodo = (id) => API.delete(`/todos/${id}`);
