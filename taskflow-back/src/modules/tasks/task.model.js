import mongoose from "mongoose";

import {
  TASK_DEFAULTS,
  TASK_PRIORITIES,
  TASK_STATUSES,
} from "./task.constants.js";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required."],
      trim: true,
      maxlength: 150,
    },

    description: {
      type: String,
      trim: true,
      default: TASK_DEFAULTS.description,
      maxlength: 1000,
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: TASK_DEFAULTS.projectId,
    },

    priority: {
      type: String,
      enum: TASK_PRIORITIES,
      default: TASK_DEFAULTS.priority,
    },

    status: {
      type: String,
      enum: TASK_STATUSES,
      default: TASK_DEFAULTS.status,
    },

    dueDate: {
      type: Date,
      default: TASK_DEFAULTS.dueDate,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

taskSchema.index({ projectId: 1, status: 1 });
taskSchema.index({ dueDate: 1 });

const Task = mongoose.model("Task", taskSchema);

export default Task;
