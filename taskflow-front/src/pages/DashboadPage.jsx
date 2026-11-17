import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  ListTodo,
  TrendingUp,
} from "lucide-react";

import { mockProjects } from "../data/mockData";
import useTaskStore from "../store/taskStore";

function DashboardPage() {
  // Zustand store
  const tasks = useTaskStore((state) => state.tasks);

  // Dynamic statistics
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress",
  ).length;

  const completionRate = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  // Statistics cards
  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      detail: "Across all projects",
      icon: ListTodo,
    },
    {
      title: "Completed",
      value: completedTasks,
      detail: "Tasks finished",
      icon: CheckCircle2,
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      detail: "Currently active",
      icon: Clock3,
    },
    {
      title: "Productivity",
      value: `${completionRate}%`,
      detail: "Completion rate",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section>
        <p className="text-sm text-violet-400">Monday, November 16, 2026</p>

        <h1 className="mt-2 text-3xl font-bold">Welcome back!</h1>

        <p className="mt-2 text-gray-400">
          Here's what's happening in your workspace today.
        </p>
      </section>

      {/* Statistics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ title, value, detail, icon: Icon }) => (
          <div
            key={title}
            className="rounded-xl border border-white/10 bg-[#1D2027] p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">{title}</span>

              <Icon size={20} className="text-violet-400" />
            </div>

            <h2 className="mt-4 text-3xl font-bold">{value}</h2>

            <p className="mt-1 text-xs text-gray-500">{detail}</p>
          </div>
        ))}
      </section>

      {/* Tasks and Projects */}
      <section className="grid gap-6 xl:grid-cols-3">
        {/* Recent Tasks */}
        <div className="rounded-xl border border-white/10 bg-[#1D2027] p-5 xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Recent Tasks</h2>

              <p className="mt-1 text-xs text-gray-500">
                Keep track of your latest tasks
              </p>
            </div>

            <button className="flex items-center gap-2 text-sm text-violet-400">
              View all <ArrowRight size={15} />
            </button>
          </div>

          <div className="space-y-3">
            {tasks.length > 0 ? (
              tasks.slice(0, 5).map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between gap-4 rounded-lg border border-white/5 bg-[#17191E] p-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{task.title}</p>

                    <p className="mt-1 text-xs text-gray-500">
                      {task.project} · {task.dueDate || "No due date"}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-md bg-white/5 px-2 py-1 text-xs text-gray-300">
                    {task.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="rounded-lg bg-[#17191E] p-4 text-sm text-gray-500">
                No tasks yet. Create your first task!
              </p>
            )}
          </div>
        </div>

        {/* My Projects */}
        <div className="rounded-xl border border-white/10 bg-[#1D2027] p-5">
          <h2 className="font-semibold">My Projects</h2>

          <p className="mt-1 text-xs text-gray-500">
            Progress across your projects
          </p>

          <div className="mt-6 space-y-6">
            {mockProjects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between gap-3">
                  <span className="text-sm font-medium">{project.name}</span>

                  <span className="text-xs text-gray-400">
                    {project.progress}%
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full ${project.color}`}
                    style={{
                      width: `${project.progress}%`,
                    }}
                  />
                </div>

                <p className="mt-2 text-xs text-gray-500">
                  {project.tasks} tasks
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
