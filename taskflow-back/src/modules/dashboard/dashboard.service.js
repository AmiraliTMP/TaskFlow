import Project from "../projects/project.model.js";
import Task from "../tasks/task.model.js";

import { validateDashboardQuery } from "./dashboard.validation.js";

const getDashboard = async (query) => {
  const { upcomingLimit } = validateDashboardQuery(query);

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const [
    totalTasks,
    taskStatusCounts,
    overdueTasks,
    activeProjects,
    archivedProjects,
    recentTasks,
    upcomingTasks,
    projectTaskStats,
  ] = await Promise.all([
    // Total tasks
    Task.countDocuments(),

    // Task counts grouped by status
    Task.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]),

    // Overdue tasks
    Task.countDocuments({
      dueDate: { $lt: startOfToday, $ne: null },
      status: { $ne: "Completed" },
    }),

    // Active projects
    Project.countDocuments({ isArchived: false }),

    // Archived projects
    Project.countDocuments({ isArchived: true }),

    // Recently created tasks
    Task.find()
      .populate("projectId", "name color")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),

    // Upcoming tasks
    Task.find({
      dueDate: { $gte: startOfToday, $ne: null },
      status: { $ne: "Completed" },
    })
      .populate("projectId", "name color")
      .sort({ dueDate: 1 })
      .limit(upcomingLimit)
      .lean(),

    // Task statistics grouped by project
    Task.aggregate([
      {
        $match: {
          projectId: { $ne: null },
        },
      },
      {
        $group: {
          _id: "$projectId",
          totalTasks: { $sum: 1 },
          completedTasks: {
            $sum: {
              $cond: [{ $eq: ["$status", "Completed"] }, 1, 0],
            },
          },
          inProgressTasks: {
            $sum: {
              $cond: [{ $eq: ["$status", "In Progress"] }, 1, 0],
            },
          },
          todoTasks: {
            $sum: {
              $cond: [{ $eq: ["$status", "Todo"] }, 1, 0],
            },
          },
        },
      },
    ]),
  ]);

  const statusCounts = {
    Todo: 0,
    "In Progress": 0,
    Completed: 0,
  };

  for (const item of taskStatusCounts) {
    statusCounts[item._id] = item.count;
  }

  const completedTasks = statusCounts.Completed;
  const inProgressTasks = statusCounts["In Progress"];
  const todoTasks = statusCounts.Todo;

  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const projectStatsMap = new Map(
    projectTaskStats.map((item) => [item._id.toString(), item]),
  );

  const projects = await Project.find({ isArchived: false })
    .select("name description color createdAt")
    .sort({ createdAt: -1 })
    .lean();

  const projectProgress = projects.map((project) => {
    const stats = projectStatsMap.get(project._id.toString());

    const total = stats?.totalTasks || 0;
    const completed = stats?.completedTasks || 0;

    return {
      ...project,
      totalTasks: total,
      completedTasks: completed,
      inProgressTasks: stats?.inProgressTasks || 0,
      todoTasks: stats?.todoTasks || 0,
      progress: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  });

  return {
    overview: {
      totalTasks,
      completedTasks,
      inProgressTasks,
      todoTasks,
      overdueTasks,
      completionRate,
    },

    projects: {
      total: activeProjects + archivedProjects,
      active: activeProjects,
      archived: archivedProjects,
      progress: projectProgress,
    },

    recentTasks,
    upcomingTasks,
  };
};

export { getDashboard };
