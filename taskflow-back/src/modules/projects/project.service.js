import Project from "./project.model.js";

import AppError from "../../utils/AppError.js";

import {
  validateCreateProject,
  validateProjectId,
  validateUpdateProject,
} from "./project.validation.js";

const createProject = async (projectData) => {
  const validatedData = validateCreateProject(projectData);

  const existingProject = await Project.findOne({
    name: validatedData.name,
  }).collation({ locale: "en", strength: 2 });

  if (existingProject) {
    throw new AppError("A project with this name already exists.", 409);
  }

  try {
    return await Project.create(validatedData);
  } catch (error) {
    if (error.code === 11000) {
      throw new AppError("A project with this name already exists.", 409);
    }

    throw error;
  }
};

const getProjects = async (includeArchived = false) => {
  const filter = includeArchived ? {} : { isArchived: false };

  return Project.find(filter).sort({ createdAt: -1 });
};

const getProjectById = async (projectId) => {
  validateProjectId(projectId);

  const project = await Project.findById(projectId);

  if (!project) {
    throw new AppError("Project not found.", 404);
  }

  return project;
};

const updateProject = async (projectId, projectData) => {
  validateProjectId(projectId);

  const updates = validateUpdateProject(projectData);

  const project = await Project.findById(projectId);

  if (!project) {
    throw new AppError("Project not found.", 404);
  }

  if (project.isArchived) {
    throw new AppError(
      "Archived projects cannot be updated. Restore the project first.",
      400,
    );
  }

  if (updates.name) {
    const existingProject = await Project.findOne({
      name: updates.name,
      _id: { $ne: projectId },
    }).collation({ locale: "en", strength: 2 });

    if (existingProject) {
      throw new AppError("A project with this name already exists.", 409);
    }
  }

  try {
    Object.assign(project, updates);

    return await project.save();
  } catch (error) {
    if (error.code === 11000) {
      throw new AppError("A project with this name already exists.", 409);
    }

    throw error;
  }
};

const archiveProject = async (projectId) => {
  validateProjectId(projectId);

  const project = await Project.findById(projectId);

  if (!project) {
    throw new AppError("Project not found.", 404);
  }

  if (project.isArchived) {
    throw new AppError("Project is already archived.", 400);
  }

  project.isArchived = true;

  return project.save();
};

const restoreProject = async (projectId) => {
  validateProjectId(projectId);

  const project = await Project.findById(projectId);

  if (!project) {
    throw new AppError("Project not found.", 404);
  }

  if (!project.isArchived) {
    throw new AppError("Project is not archived.", 400);
  }

  project.isArchived = false;

  return project.save();
};

export {
  archiveProject,
  createProject,
  getProjectById,
  getProjects,
  restoreProject,
  updateProject,
};
