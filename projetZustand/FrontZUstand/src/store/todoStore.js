import { create } from "zustand";
import * as serviceTodos from "../service/serviceTodos";

/**
 * @typedef {Object} Todo
 * @property {string} id
 * @property {string} text
 */

/**
 * @typedef {Object} TodoStore
 * @property {Todo[]} todos
 * @property {boolean} loading
 * @property {string|null} error
 * @property {Object} actions
 */

export const useTodoStore = create((set, get) => ({
  todos: [],
  loading: false,
  error: null,
  message: null,
  messageTimer: null,

 
  clearMessageAfterDelay: (delay = 3000) => {
    if (get().messageTimer) {
      clearTimeout(get().messageTimer);
    }
    const timer = setTimeout(() => {
      set({ message: null, messageTimer: null });
    }, delay);
    set({ messageTimer: timer });
  },

  setLoading: (load) => set({ loading: load, error: null }),
  
  setError: (er) => {
    set({ error: er, loading: false });
    get().clearMessageAfterDelay(4000); // Error messages show for 4 seconds
  },
  
  setMessage: (msg) => {
    set({ message: msg, loading: false });
    get().clearMessageAfterDelay(2000); // Success messages show for 2 seconds
  },

  resetError: () => set({ error: null }),

  // Actions CRUD
  loadTodos: async () => {
    try {
      get().setLoading(true);
      const { data } = await serviceTodos.fetchTodos;
      set({ todos: data });
    } catch (error) {
      get().setError(`Erreur lors du chargement des todos: ${error.message}`);
      console.error("LoadTodos Error:", error);
    } finally {
      get().setLoading(false);
    }
  },

  addTodo: async (text) => {
    if (!text?.trim()) {
      get().setError("Le texte du todo ne peut pas être vide");
      return;
    }

    try {
      get().setLoading(true);
      const { data } = await serviceTodos.addTodo({ text });
      if (data) {
       set((state) => ({
        todos: [...state.todos, data],
       }));
        get().setMessage("Todo ajouté avec succès");
      }
     
    } catch (error) {
      get().setError(`Erreur lors de l'ajout du todo: ${error.message}`);
      console.error("AddTodo Error:", error);
    } finally {
      get().setLoading(false);
    }
  },

  deleteTodo: async (id) => {
    if (!id) {
      get().setError("ID invalide pour la suppression");
      return;
    }

    try {
    
      await serviceTodos.deleteTodo(id);
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    } catch (error) {
      get().setError(`Erreur lors de la suppression du todo: ${error.message}`);
      console.error("DeleteTodo Error:", error);
    } 
  },

  updateTodo: async (id, newText) => {
    if (!id || !newText?.trim()) {
      get().setError("ID ou texte invalide pour la mise à jour");
      return;
    }

    try {

      const { data } = await serviceTodos.updateTodo(id, { text: newText });
      set((state) => ({
        todos: state.todos.map((todo) => 
          todo.id === id ? data : todo
        ),
      }));
    } catch (error) {
      get().setError(`Erreur lors de la mise à jour du todo: ${error.message}`);
      console.error("UpdateTodo Error:", error);
    } 
  },

  // Sélecteurs
  getTodoById: (id) => {
    return get().todos.find((todo) => todo.id === id);
  },

  // Utils
  clearTodos: () => set({ todos: [] }),
  hasTodos: () => get().todos.length > 0,
}));

// Sélecteurs personnalisés
export const useTodoSelectors = {
  selectTodos: (state) => state.todos,
  selectLoading: (state) => state.loading,
  selectError: (state) => state.error,
};
