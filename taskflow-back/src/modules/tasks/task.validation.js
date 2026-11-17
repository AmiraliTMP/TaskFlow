import mongoose from "mongoose";

import AppError from "../../utils/AppError.js";

import { TASK_PRIORITIES, TASK_STATUSES } from "./task.constants.js";

const validateTaskId = (taskId) => {
  if (!mongoose.isValidObjectId(taskId)) {
    throw new AppError("Invalid task ID.", 400);
  }
};

const validateProjectId = (projectId) => {
  if (
    projectId !== null &&
    projectId !== "" &&
    !mongoose.isValidObjectId(projectId)
  ) {
    throw new AppError("Invalid project ID.", 400);
  }
};

const validateDueDate = (dueDate) => {
  if (dueDate === null || dueDate === "") {
    return null;
  }

  const parsedDate = new Date(dueDate);

  if (Number.isNaN(parsedDate.getTime())) {
    throw new AppError("Invalid due date.", 400);
  }

  return parsedDate;
};

const validateCreateTask = (data) => {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new AppError("Invalid task data.", 400);
  }

  const { title, description, projectId, priority, status, dueDate } = data;

  if (typeof title !== "string" || !title.trim()) {
    throw new AppError("Task title is required.", 400);
  }

  if (title.trim().length > 150) {
    throw new AppError("Task title cannot exceed 150 characters.", 400);
  }

  if (description !== undefined && typeof description !== "string") {
    throw new AppError("Task description must be a string.", 400);
  }

  if (description && description.length > 1000) {
    throw new AppError("Task description cannot exceed 1000 characters.", 400);
  }

  if (priority !== undefined && !TASK_PRIORITIES.includes(priority)) {
    throw new AppError("Invalid task priority.", 400);
  }

  if (status !== undefined && !TASK_STATUSES.includes(status)) {
    throw new AppError("Invalid task status.", 400);
  }

  if (projectId !== undefined) {
    validateProjectId(projectId);
  }

  return {
    title: title.trim(),
    description: description?.trim() || "",
    projectId: projectId || null,
    priority: priority || "Medium",
    status: status || "Todo",
    dueDate: dueDate === undefined ? null : validateDueDate(dueDate),
  };
};

const validateUpdateTask = (data) => {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new AppError("Invalid task data.", 400);
  }

  const allowedFields = [
    "title",
    "description",
    "projectId",
    "priority",
    "dueDate",
  ];

  const fields = Object.keys(data);

  if (!fields.length) {
    throw new AppError("At least one field is required.", 400);
  }

  const invalidFields = fields.filter(
    (field) => !allowedFields.includes(field),
  );

  if (invalidFields.length) {
    throw new AppError(`Invalid task fields: ${invalidFields.join(", ")}`, 400);
  }

  const updates = {};

  if (data.title !== undefined) {
    if (typeof data.title !== "string" || !data.title.trim()) {
      throw new AppError("Task title cannot be empty.", 400);
    }

    if (data.title.trim().length > 150) {
      throw new AppError("Task title cannot exceed 150 characters.", 400);
    }

    updates.title = data.title.trim();
  }

  if (data.description !== undefined) {
    if (typeof data.description !== "string") {
      throw new AppError("Task description must be a string.", 400);
    }

    if (data.description.length > 1000) {
      throw new AppError(
        "Task description cannot exceed 1000 characters.",
        400,
      );
    }

    updates.description = data.description.trim();
  }

  if (data.projectId !== undefined) {
    validateProjectId(data.projectId);
    updates.projectId = data.projectId || null;
  }

  if (data.priority !== undefined) {
    if (!TASK_PRIORITIES.includes(data.priority)) {
      throw new AppError("Invalid task priority.", 400);
    }

    updates.priority = data.priority;
  }

  if (data.dueDate !== undefined) {
    updates.dueDate = validateDueDate(data.dueDate);
  }

  return updates;
};

const validateTaskStatus = (status) => {
  if (!TASK_STATUSES.includes(status)) {
    throw new AppError("Invalid task status.", 400);
  }

  return status;
};

const validateTaskFilters = (query) => {
  const { projectId, status, priority } = query;

  if (projectId) {
    validateProjectId(projectId);
  }

  if (status && !TASK_STATUSES.includes(status)) {
    throw new AppError("Invalid task status filter.", 400);
  }

  if (priority && !TASK_PRIORITIES.includes(priority)) {
    throw new AppError("Invalid task priority filter.", 400);
  }

  return {
    ...(projectId && { projectId }),
    ...(status && { status }),
    ...(priority && { priority }),
  };
};

export {
  validateCreateTask,
  validateTaskFilters,
  validateTaskId,
  validateTaskStatus,
  validateUpdateTask,
};
