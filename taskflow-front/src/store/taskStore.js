import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { mockTasks } from "../data/mockData";

const useTaskStore = create(
  persist(
    (set) => ({
      tasks: mockTasks,

      addTask: (task) => {
        const newTask = {
          id: crypto.randomUUID(),
          title: task.title.trim(),
          description: task.description.trim(),
          project: task.project.trim() || "Personal",
          priority: task.priority,
          status: "Todo",
          dueDate: task.dueDate || "",
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          tasks: [newTask, ...state.tasks],
        }));
      },

      updateTask: (taskId, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, ...updates } : task,
          ),
        })),

      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),

      changeTaskStatus: (taskId, status) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, status } : task,
          ),
        })),
    }),
    {
      name: "taskflow-tasks",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useTaskStore;
