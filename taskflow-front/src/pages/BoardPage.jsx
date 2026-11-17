import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  pointerWithin,
  rectIntersection,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { CSS } from "@dnd-kit/utilities";
import { CalendarDays, GripVertical } from "lucide-react";
import { useState } from "react";

import useTaskStore from "../store/taskStore";

const columns = [
  {
    id: "Todo",
    title: "To Do",
    color: "bg-gray-400",
  },
  {
    id: "In Progress",
    title: "In Progress",
    color: "bg-violet-400",
  },
  {
    id: "Completed",
    title: "Completed",
    color: "bg-emerald-400",
  },
];

// --------------------------------------------------
// Task Card
// --------------------------------------------------

function TaskCard({ task, overlay = false }) {
  return (
    <div
      className={`rounded-xl border border-white/10 bg-[#1D2027] p-4 ${
        overlay ? "border-violet-400/40 shadow-2xl shadow-black/40" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-medium leading-6">{task.title}</h3>

        {!overlay && (
          <GripVertical size={18} className="shrink-0 text-gray-500" />
        )}
      </div>

      <p className="mt-2 text-xs text-gray-400">{task.project || "Personal"}</p>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span
          className={`rounded-md px-2 py-1 text-xs ${
            task.priority === "High"
              ? "bg-red-500/10 text-red-400"
              : task.priority === "Medium"
                ? "bg-amber-500/10 text-amber-400"
                : "bg-emerald-500/10 text-emerald-400"
          }`}
        >
          {task.priority}
        </span>

        <span className="flex items-center gap-1 text-xs text-gray-500">
          <CalendarDays size={13} />
          {task.dueDate || "No date"}
        </span>
      </div>
    </div>
  );
}

// --------------------------------------------------
// Draggable Task
// --------------------------------------------------

function DraggableTask({ task }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    willChange: isDragging ? "transform" : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={isDragging ? "opacity-30" : ""}
    >
      <div className="relative">
        <TaskCard task={task} />

        <button
          type="button"
          {...attributes}
          {...listeners}
          className="absolute right-3 top-3 cursor-grab rounded-md p-1 text-gray-500 active:cursor-grabbing"
          aria-label={`Drag ${task.title}`}
        >
          <GripVertical size={18} />
        </button>
      </div>
    </div>
  );
}

// --------------------------------------------------
// Board Column
// --------------------------------------------------

function BoardColumn({ column, tasks }) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex min-h-125 flex-col rounded-xl border p-3 ${
        isOver
          ? "border-violet-400/50 bg-violet-500/5"
          : "border-white/10 bg-[#17191E]"
      }`}
    >
      <div className="mb-4 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${column.color}`} />

          <h2 className="text-sm font-semibold">{column.title}</h2>
        </div>

        <span className="rounded-md bg-white/5 px-2 py-1 text-xs text-gray-400">
          {tasks.length}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        {tasks.map((task) => (
          <DraggableTask key={task.id} task={task} />
        ))}

        {tasks.length === 0 && (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-white/10 p-6 text-center text-xs text-gray-500">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
}

// --------------------------------------------------
// Board Page
// --------------------------------------------------

function BoardPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const changeTaskStatus = useTaskStore((state) => state.changeTaskStatus);

  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor),
  );

  function handleDragStart(event) {
    const task = tasks.find((item) => item.id === event.active.id);

    setActiveTask(task || null);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) {
      setActiveTask(null);
      return;
    }

    const taskId = active.id;
    const newStatus = over.id;

    const targetColumn = columns.find((column) => column.id === newStatus);

    const task = tasks.find((item) => item.id === taskId);

    if (targetColumn && task && task.status !== newStatus) {
      changeTaskStatus(taskId, newStatus);
    }

    setActiveTask(null);
  }

  function handleDragCancel() {
    setActiveTask(null);
  }

  function collisionDetection(args) {
    const pointerCollisions = pointerWithin(args);

    if (pointerCollisions.length > 0) {
      return pointerCollisions;
    }

    return rectIntersection(args);
  }

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold">Kanban Board</h1>

        <p className="mt-2 text-gray-400">
          Drag and drop tasks to update their status.
        </p>
      </section>

      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetection}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="grid gap-4 xl:grid-cols-3">
          {columns.map((column) => {
            const columnTasks = tasks.filter(
              (task) => task.status === column.id,
            );

            return (
              <BoardColumn
                key={column.id}
                column={column}
                tasks={columnTasks}
              />
            );
          })}
        </div>

        <DragOverlay dropAnimation={null}>
          {activeTask ? <TaskCard task={activeTask} overlay /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default BoardPage;
