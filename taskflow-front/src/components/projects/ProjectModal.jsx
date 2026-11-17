import { X } from "lucide-react";
import { useState } from "react";

const colors = [
  { name: "Violet", value: "bg-violet-500" },
  { name: "Blue", value: "bg-blue-500" },
  { name: "Emerald", value: "bg-emerald-500" },
  { name: "Amber", value: "bg-amber-500" },
  { name: "Rose", value: "bg-rose-500" },
  { name: "Cyan", value: "bg-cyan-500" },
];

const initialFormData = {
  name: "",
  description: "",
  color: "bg-violet-500",
};

// --------------------------------------------------
// Project Form
// --------------------------------------------------

function ProjectModalForm({ onClose, onSubmit, projectToEdit }) {
  const isEditing = Boolean(projectToEdit);

  const [formData, setFormData] = useState(() =>
    projectToEdit
      ? {
          name: projectToEdit.name || "",
          description: projectToEdit.description || "",
          color: projectToEdit.color || "bg-violet-500",
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

    if (!formData.name.trim()) {
      setError("Project name is required.");
      return;
    }

    onSubmit({
      name: formData.name.trim(),
      description: formData.description.trim(),
      color: formData.color,
    });
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
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#1D2027] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold">
              {isEditing ? "Edit Project" : "Create Project"}
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              {isEditing
                ? "Update your project details."
                : "Create a new project to organize your tasks."}
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
          {/* Project Name */}
          <div>
            <label
              htmlFor="project-name"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Project Name
            </label>

            <input
              id="project-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Website Redesign"
              className="w-full rounded-xl border border-white/10 bg-[#101114] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-violet-500"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="project-description"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Description
            </label>

            <textarea
              id="project-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Describe what this project is about..."
              className="w-full resize-none rounded-xl border border-white/10 bg-[#101114] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-violet-500"
            />
          </div>

          {/* Project Color */}
          <div>
            <p className="mb-3 text-sm font-medium text-gray-300">
              Project Color
            </p>

            <div className="flex flex-wrap gap-3">
              {colors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  title={color.name}
                  aria-label={`Select ${color.name} color`}
                  aria-pressed={formData.color === color.value}
                  onClick={() =>
                    setFormData((previous) => ({
                      ...previous,
                      color: color.value,
                    }))
                  }
                  className={`h-9 w-9 rounded-full ${color.value} transition ${
                    formData.color === color.value
                      ? "ring-2 ring-white ring-offset-4 ring-offset-[#1D2027]"
                      : "opacity-60 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Validation */}
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
              {isEditing ? "Save Changes" : "Create Project"}
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

function ProjectModal({ isOpen, onClose, onSubmit, projectToEdit = null }) {
  if (!isOpen) return null;

  return (
    <ProjectModalForm
      key={projectToEdit?.id || "new-project"}
      onClose={onClose}
      onSubmit={onSubmit}
      projectToEdit={projectToEdit}
    />
  );
}

export default ProjectModal;
