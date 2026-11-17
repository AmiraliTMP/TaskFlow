import { Pencil, Trash2 } from "lucide-react";
import { useOutletContext } from "react-router-dom";

import useTaskStore from "../store/taskStore";

function TasksPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const changeTaskStatus = useTaskStore((state) => state.changeTaskStatus);

  const { onEditTask } = useOutletContext();

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Tasks</h1>

        <p className="mt-2 text-sm text-gray-400">
          Manage and organize all your tasks.
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#1D2027] p-5">
        {tasks.length === 0 ? (
          <p className="py-10 text-center text-sm text-gray-500">
            No tasks yet. Create your first task!
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 py-4 last:border-0"
            >
              {/* Task Information */}
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium">{task.title}</h3>

                {task.description && (
                  <p className="mt-1 line-clamp-2 text-xs text-gray-400">
                    {task.description}
                  </p>
                )}

                <p className="mt-1 text-xs text-gray-500">
                  {task.project || "Personal"} · {task.dueDate || "No due date"}
                </p>
              </div>

              {/* Task Actions */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Status */}
                <select
                  aria-label={`Status of ${task.title}`}
                  value={task.status}
                  onChange={(event) =>
                    changeTaskStatus(task.id, event.target.value)
                  }
                  className="max-w-36 rounded-lg border border-white/10 bg-[#101114] px-2 py-2 text-xs outline-none focus:border-violet-400"
                >
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

                {/* Priority */}
                <span
                  className={`rounded-lg px-3 py-2 text-xs ${
                    task.priority === "High"
                      ? "bg-red-500/10 text-red-400"
                      : task.priority === "Medium"
                        ? "bg-amber-500/10 text-amber-400"
                        : "bg-emerald-500/10 text-emerald-400"
                  }`}
                >
                  {task.priority}
                </span>

                {/* Edit */}
                <button
                  type="button"
                  onClick={() => onEditTask(task)}
                  aria-label={`Edit ${task.title}`}
                  className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-violet-500/10 hover:text-violet-400"
                >
                  <Pencil size={16} />
                </button>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete ${task.title}`}
                  className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default TasksPage;
