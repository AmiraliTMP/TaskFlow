import {
  Archive,
  FolderKanban,
  MoreHorizontal,
  Plus,
  RotateCcw,
  Target,
} from "lucide-react";
import { useMemo, useState } from "react";

import ProjectModal from "../components/projects/ProjectModal";

import useProjectStore from "../store/projectStore";
import useTaskStore from "../store/taskStore";

function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("active");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);

  const projects = useProjectStore((state) => state.projects);
  const addProject = useProjectStore((state) => state.addProject);
  const updateProject = useProjectStore((state) => state.updateProject);
  const archiveProject = useProjectStore((state) => state.archiveProject);
  const restoreProject = useProjectStore((state) => state.restoreProject);

  const tasks = useTaskStore((state) => state.tasks);
  const updateTask = useTaskStore((state) => state.updateTask);

  const activeProjects = useMemo(
    () => projects.filter((project) => !project.isArchived),
    [projects],
  );

  const archivedProjects = useMemo(
    () => projects.filter((project) => project.isArchived),
    [projects],
  );

  const visibleProjects =
    activeTab === "active" ? activeProjects : archivedProjects;

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  function getProjectStats(project) {
    const projectTasks = tasks.filter((task) => task.project === project.name);

    const completed = projectTasks.filter(
      (task) => task.status === "Completed",
    ).length;

    const total = projectTasks.length;

    return {
      total,
      completed,
      progress: total === 0 ? 0 : Math.round((completed / total) * 100),
    };
  }

  function openCreateModal() {
    setProjectToEdit(null);
    setIsModalOpen(true);
  }

  function openEditModal(project) {
    setProjectToEdit(project);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setProjectToEdit(null);
  }

  function handleSubmitProject(projectData) {
    if (projectToEdit) {
      const oldName = projectToEdit.name;
      const newName = projectData.name;

      updateProject(projectToEdit.id, projectData);

      if (oldName !== newName) {
        tasks
          .filter((task) => task.project === oldName)
          .forEach((task) => {
            updateTask(task.id, { project: newName });
          });
      }
    } else {
      addProject(projectData);
    }

    closeModal();
  }

  function handleArchive(projectId) {
    const confirmed = window.confirm(
      "Archive this project? Its tasks and history will be preserved.",
    );

    if (confirmed) {
      archiveProject(projectId);
    }
  }

  function handleRestore(projectId) {
    restoreProject(projectId);
  }

  return (
    <section className="space-y-7">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>

          <p className="mt-2 text-sm text-gray-400">
            Organize your work and track project progress.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-medium transition hover:bg-violet-500"
        >
          <Plus size={18} />
          New Project
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#1D2027] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Active Projects</p>
            <FolderKanban className="text-violet-400" size={20} />
          </div>

          <p className="mt-4 text-3xl font-bold">{activeProjects.length}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#1D2027] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Total Tasks</p>
            <Target className="text-blue-400" size={20} />
          </div>

          <p className="mt-4 text-3xl font-bold">{totalTasks}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#1D2027] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Completed Tasks</p>
            <Target className="text-emerald-400" size={20} />
          </div>

          <p className="mt-4 text-3xl font-bold">{completedTasks}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-white/10">
        <button
          type="button"
          onClick={() => setActiveTab("active")}
          className={`border-b-2 pb-3 text-sm font-medium transition ${
            activeTab === "active"
              ? "border-violet-500 text-white"
              : "border-transparent text-gray-500 hover:text-gray-300"
          }`}
        >
          Active ({activeProjects.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("archived")}
          className={`border-b-2 pb-3 text-sm font-medium transition ${
            activeTab === "archived"
              ? "border-violet-500 text-white"
              : "border-transparent text-gray-500 hover:text-gray-300"
          }`}
        >
          Archived ({archivedProjects.length})
        </button>
      </div>

      {/* Projects Grid */}
      {visibleProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-[#1D2027]/50 px-6 py-16 text-center">
          <FolderKanban size={38} className="mx-auto text-gray-600" />

          <h3 className="mt-4 font-semibold">
            {activeTab === "active"
              ? "No active projects"
              : "No archived projects"}
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            {activeTab === "active"
              ? "Create your first project to get started."
              : "Archived projects will appear here."}
          </p>

          {activeTab === "active" && (
            <button
              type="button"
              onClick={openCreateModal}
              className="mt-5 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium transition hover:bg-violet-500"
            >
              Create Project
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project) => {
            const stats = getProjectStats(project);

            return (
              <article
                key={project.id}
                className="rounded-2xl border border-white/10 bg-[#1D2027] p-5 transition hover:border-white/20"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5">
                      <span
                        className={`h-3 w-3 rounded-full ${project.color}`}
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold">{project.name}</h3>

                      <p className="mt-1 text-xs text-gray-500">
                        {stats.total} {stats.total === 1 ? "task" : "tasks"}
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    {activeTab === "active" ? (
                      <button
                        type="button"
                        onClick={() => openEditModal(project)}
                        title="Edit project"
                        aria-label={`Edit ${project.name}`}
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
                      >
                        <MoreHorizontal size={19} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleRestore(project.id)}
                        title="Restore project"
                        aria-label={`Restore ${project.name}`}
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
                      >
                        <RotateCcw size={17} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="mt-5 min-h-10 text-sm leading-6 text-gray-400">
                  {project.description || "No description provided."}
                </p>

                {/* Progress */}
                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Progress</span>

                    <span className="text-xs font-semibold text-white">
                      {stats.progress}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${project.color}`}
                      style={{ width: `${stats.progress}%` }}
                    />
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                  <p className="text-xs text-gray-500">
                    {stats.completed} of {stats.total} completed
                  </p>

                  {activeTab === "active" ? (
                    <button
                      type="button"
                      onClick={() => handleArchive(project.id)}
                      className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Archive size={14} />
                      Archive
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleRestore(project.id)}
                      className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs text-emerald-400 transition hover:bg-emerald-500/10"
                    >
                      <RotateCcw size={14} />
                      Restore
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmitProject}
        projectToEdit={projectToEdit}
      />
    </section>
  );
}

export default ProjectsPage;
