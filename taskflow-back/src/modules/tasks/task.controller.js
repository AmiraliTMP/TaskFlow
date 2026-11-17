import * as taskService from "./task.service.js";

const createTask = async (req, res) => {
  const task = await taskService.createTask(req.body);

  res.status(201).json({
    success: true,
    message: "Task created successfully.",
    data: task,
  });
};

const getTasks = async (req, res) => {
  const tasks = await taskService.getTasks(req.query);

  res.status(200).json({
    success: true,
    results: tasks.length,
    data: tasks,
  });
};

const getTaskById = async (req, res) => {
  const task = await taskService.getTaskById(req.params.taskId);

  res.status(200).json({
    success: true,
    data: task,
  });
};

const updateTask = async (req, res) => {
  const task = await taskService.updateTask(req.params.taskId, req.body);

  res.status(200).json({
    success: true,
    message: "Task updated successfully.",
    data: task,
  });
};

const changeTaskStatus = async (req, res) => {
  const task = await taskService.changeTaskStatus(
    req.params.taskId,
    req.body.status,
  );

  res.status(200).json({
    success: true,
    message: "Task status updated successfully.",
    data: task,
  });
};

const deleteTask = async (req, res) => {
  await taskService.deleteTask(req.params.taskId);

  res.status(200).json({
    success: true,
    message: "Task deleted successfully.",
  });
};

export {
  changeTaskStatus,
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
};
