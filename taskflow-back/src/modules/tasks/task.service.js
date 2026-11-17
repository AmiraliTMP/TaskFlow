import Project from "../projects/project.model.js";
import Task from "./task.model.js";

import AppError from "../../utils/AppError.js";

import {
  validateCreateTask,
  validateTaskFilters,
  validateTaskId,
  validateTaskStatus,
  validateUpdateTask,
} from "./task.validation.js";

const validateActiveProject = async (projectId) => {
  if (!projectId) return;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new AppError("Project not found.", 404);
  }

  if (project.isArchived) {
    throw new AppError("Tasks cannot be assigned to archived projects.", 400);
  }
};

const createTask = async (taskData) => {
  const validatedData = validateCreateTask(taskData);

  await validateActiveProject(validatedData.projectId);

  const task = await Task.create(validatedData);

  return Task.findById(task._id).populate("projectId", "name color isArchived");
};

const getTasks = async (filters) => {
  const validatedFilters = validateTaskFilters(filters);

  return Task.find(validatedFilters)
    .populate("projectId", "name color isArchived")
    .sort({ createdAt: -1 });
};

const getTaskById = async (taskId) => {
  validateTaskId(taskId);

  const task = await Task.findById(taskId).populate(
    "projectId",
    "name color isArchived",
  );

  if (!task) {
    throw new AppError("Task not found.", 404);
  }

  return task;
};

const updateTask = async (taskId, taskData) => {
  validateTaskId(taskId);

  const updates = validateUpdateTask(taskData);

  const task = await Task.findById(taskId);

  if (!task) {
    throw new AppError("Task not found.", 404);
  }

  if (updates.projectId !== undefined) {
    await validateActiveProject(updates.projectId);
  }

  Object.assign(task, updates);

  await task.save();

  return Task.findById(task._id).populate("projectId", "name color isArchived");
};

const changeTaskStatus = async (taskId, status) => {
  validateTaskId(taskId);

  const validatedStatus = validateTaskStatus(status);

  const task = await Task.findById(taskId);

  if (!task) {
    throw new AppError("Task not found.", 404);
  }

  task.status = validatedStatus;

  await task.save();

  return Task.findById(task._id).populate("projectId", "name color isArchived");
};

const deleteTask = async (taskId) => {
  validateTaskId(taskId);

  const task = await Task.findById(taskId);

  if (!task) {
    throw new AppError("Task not found.", 404);
  }

  await task.deleteOne();

  return task;
};

export {
  changeTaskStatus,
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
};
