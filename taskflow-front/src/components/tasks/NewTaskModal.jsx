import { X } from "lucide-react";
import { useState } from "react";

import useProjectStore from "../../store/projectStore";
import useTaskStore from "../../store/taskStore";

const initialFormData = {
  title: "",
  description: "",
  project: "",
  priority: "Medium",
  dueDate: "",
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#101114] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500";

const labelClass = "mb-2 block text-sm font-medium text-gray-300";

// --------------------------------------------------
// Task Form
// --------------------------------------------------

function TaskModalForm({ onClose, taskToEdit }) {
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);

  const projects = useProjectStore((state) =>
    state.projects.filter((project) => !project.isArchived),
  );

  const isEditing = Boolean(taskToEdit);

  const [formData, setFormData] = useState(() =>
    taskToEdit
      ? {
          title: taskToEdit.title || "",
          description: taskToEdit.description || "",
          project: taskToEdit.project || "",
          priority: taskToEdit.priority || "Medium",
          dueDate: taskToEdit.dueDate || "",
        }
      : initialFormData,
  );

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError("Task title is required.");
      return;
    }

    const taskData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      project: formData.project.trim(),
    };

    if (isEditing) {
      updateTask(taskToEdit.id, taskData);
    } else {
      addTask(taskData);
    }

    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-[#1D2027] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold">
              {isEditing ? "Edit Task" : "Create New Task"}
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              {isEditing
                ? "Update your task details."
                : "Add a new task to your workspace."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
          >
            <X size={19} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label htmlFor="title" className={labelClass}>
              Task Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="What needs to be done?"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="description" className={labelClass}>
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Add more details..."
              className={`${inputClass} resize-none`}
            />
          </div>

          <div>
            <label htmlFor="project" className={labelClass}>
              Project
            </label>

            <select
              id="project"
              name="project"
              value={formData.project}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Personal</option>

              {projects.map((project) => (
                <option key={project.id} value={project.name}>
                  {project.name}
                </option>
              ))}

              {formData.project &&
                !projects.some(
                  (project) => project.name === formData.project,
                ) && (
                  <option value={formData.project}>
                    {formData.project} (previous assignment)
                  </option>
                )}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="priority" className={labelClass}>
                Priority
              </label>

              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className={inputClass}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label htmlFor="dueDate" className={labelClass}>
                Due Date
              </label>

              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-white/10 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-gray-300 transition hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500"
            >
              {isEditing ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --------------------------------------------------
// Modal Wrapper
// --------------------------------------------------

function NewTaskModal({ isOpen, onClose, taskToEdit = null }) {
  if (!isOpen) return null;

  return (
    <TaskModalForm
      key={taskToEdit?.id || "new-task"}
      onClose={onClose}
      taskToEdit={taskToEdit}
    />
  );
}

export default NewTaskModal;
