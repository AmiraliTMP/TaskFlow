import * as projectService from "./project.service.js";

const createProject = async (req, res) => {
  const project = await projectService.createProject(req.body);

  res.status(201).json({
    success: true,
    message: "Project created successfully.",
    data: project,
  });
};

const getProjects = async (req, res) => {
  const includeArchived = req.query.includeArchived === "true";

  const projects = await projectService.getProjects(includeArchived);

  res.status(200).json({
    success: true,
    results: projects.length,
    data: projects,
  });
};

const getProjectById = async (req, res) => {
  const project = await projectService.getProjectById(req.params.projectId);

  res.status(200).json({
    success: true,
    data: project,
  });
};

const updateProject = async (req, res) => {
  const project = await projectService.updateProject(
    req.params.projectId,
    req.body,
  );

  res.status(200).json({
    success: true,
    message: "Project updated successfully.",
    data: project,
  });
};

const archiveProject = async (req, res) => {
  const project = await projectService.archiveProject(req.params.projectId);

  res.status(200).json({
    success: true,
    message: "Project archived successfully.",
    data: project,
  });
};

const restoreProject = async (req, res) => {
  const project = await projectService.restoreProject(req.params.projectId);

  res.status(200).json({
    success: true,
    message: "Project restored successfully.",
    data: project,
  });
};

export {
  archiveProject,
  createProject,
  getProjectById,
  getProjects,
  restoreProject,
  updateProject,
};
