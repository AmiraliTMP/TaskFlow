import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { mockProjects } from "../data/mockData";

const useProjectStore = create(
  persist(
    (set) => ({
      projects: mockProjects.map((project) => ({
        ...project,
        isArchived: false,
      })),

      addProject: (projectData) => {
        const newProject = {
          id: crypto.randomUUID(),
          name: projectData.name.trim(),
          description: (projectData.description || "").trim(),
          color: projectData.color,
          progress: 0,
          tasks: 0,
          isArchived: false,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          projects: [newProject, ...state.projects],
        }));
      },

      updateProject: (projectId, updates) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  ...updates,
                  name: updates.name?.trim() ?? project.name,
                  description:
                    updates.description?.trim() ?? project.description,
                }
              : project,
          ),
        })),

      archiveProject: (projectId) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId
              ? { ...project, isArchived: true }
              : project,
          ),
        })),

      restoreProject: (projectId) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId
              ? { ...project, isArchived: false }
              : project,
          ),
        })),
    }),
    {
      name: "taskflow-projects",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useProjectStore;
