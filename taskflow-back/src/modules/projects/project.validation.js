import mongoose from "mongoose";

import AppError from "../../utils/AppError.js";
import { PROJECT_COLORS } from "./project.constants.js";

const validateProjectId = (projectId) => {
  if (!mongoose.isValidObjectId(projectId)) {
    throw new AppError("Invalid project ID.", 400);
  }
};

const validateCreateProject = (data) => {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new AppError("Invalid project data.", 400);
  }

  const { name, description, color } = data;

  if (typeof name !== "string" || !name.trim()) {
    throw new AppError("Project name is required.", 400);
  }

  if (name.trim().length > 100) {
    throw new AppError("Project name cannot exceed 100 characters.", 400);
  }

  if (description !== undefined && typeof description !== "string") {
    throw new AppError("Project description must be a string.", 400);
  }

  if (description && description.length > 500) {
    throw new AppError(
      "Project description cannot exceed 500 characters.",
      400,
    );
  }

  if (color !== undefined && !PROJECT_COLORS.includes(color)) {
    throw new AppError("Invalid project color.", 400);
  }

  return {
    name: name.trim(),
    description: description?.trim() || "",
    color: color || PROJECT_COLORS[0],
  };
};

const validateUpdateProject = (data) => {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new AppError("Invalid project data.", 400);
  }

  const allowedFields = ["name", "description", "color"];
  const fields = Object.keys(data);

  if (!fields.length) {
    throw new AppError("At least one field is required.", 400);
  }

  const invalidFields = fields.filter(
    (field) => !allowedFields.includes(field),
  );

  if (invalidFields.length) {
    throw new AppError(
      `Invalid project fields: ${invalidFields.join(", ")}`,
      400,
    );
  }

  const updates = {};

  if (data.name !== undefined) {
    if (typeof data.name !== "string" || !data.name.trim()) {
      throw new AppError("Project name cannot be empty.", 400);
    }

    if (data.name.trim().length > 100) {
      throw new AppError("Project name cannot exceed 100 characters.", 400);
    }

    updates.name = data.name.trim();
  }

  if (data.description !== undefined) {
    if (typeof data.description !== "string") {
      throw new AppError("Project description must be a string.", 400);
    }

    if (data.description.length > 500) {
      throw new AppError(
        "Project description cannot exceed 500 characters.",
        400,
      );
    }

    updates.description = data.description.trim();
  }

  if (data.color !== undefined) {
    if (!PROJECT_COLORS.includes(data.color)) {
      throw new AppError("Invalid project color.", 400);
    }

    updates.color = data.color;
  }

  return updates;
};

export { validateCreateProject, validateProjectId, validateUpdateProject };
