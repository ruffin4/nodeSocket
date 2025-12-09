import { create } from "zustand";

export const useTestStore = create((set, get) => ({
  count: 0,
  message: null,
  color: null,
  setColor: (col) => set({ color : col}),
  setMessage: (mes) => set({ message:mes }),
  resetMessage: () => set({ message: null }),

  calculeSomme: () => {
    if (get().count === 4) {
      set((state) => ({
        count: state.count + 1,
        message: "la valeur est 5",
        color: "green" // Correctly setting color
      }));
      return;
    }
    set((state) => ({
      count: state.count + 1,
      message: null,
      color: null // Reset color
    }));
  },

  decrementerCount: () => {
    if (get().count === 0) {
      set({
        message: "Le compteur ne peut pas être négatif.",
        color: "red" // Fixed syntax for color
      });
      return;
    } else if (get().count === 6) {
      set((state) => ({
        count: state.count - 1,
        message: "la valeur est 5",
        color: "green" // Correctly setting color
      }));
      return;
    }
    set((state) => ({
      count: state.count - 1,
      message: null,
      color: null // Reset color when no special condition
    }));
  },
}));
