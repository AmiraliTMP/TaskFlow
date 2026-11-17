import mongoose from "mongoose";

import { PROJECT_COLORS, PROJECT_DEFAULTS } from "./project.constants.js";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required."],
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      default: PROJECT_DEFAULTS.description,
      maxlength: 500,
    },

    color: {
      type: String,
      enum: PROJECT_COLORS,
      default: PROJECT_DEFAULTS.color,
    },

    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Project names must be unique regardless of letter casing.
projectSchema.index(
  { name: 1 },
  {
    unique: true,
    collation: {
      locale: "en",
      strength: 2,
    },
  },
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
