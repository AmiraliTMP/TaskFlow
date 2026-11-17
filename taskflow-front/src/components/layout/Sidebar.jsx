import {
  CalendarDays,
  CheckSquare,
  FolderKanban,
  Kanban,
  Layers,
  LayoutDashboard,
  Settings,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "My Tasks", path: "/tasks", icon: CheckSquare },
  { label: "Board", path: "/board", icon: Kanban },
  { label: "Projects", path: "/projects", icon: FolderKanban },
  { label: "Calendar", path: "/calendar", icon: CalendarDays },
];

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10 bg-[#17191E] p-5 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500">
              <Layers size={23} />
            </div>
            <div>
              <h1 className="text-xl font-bold">Taskflow</h1>
              <p className="text-xs text-gray-500">Workspace</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-gray-400 hover:bg-white/10 lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Workspace
        </p>

        <nav className="flex flex-col gap-1">
          {navigation.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
                  isActive
                    ? "bg-violet-500/15 font-medium text-violet-300"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={19} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto border-t border-white/10 pt-4">
          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-3 text-sm ${
                isActive
                  ? "bg-violet-500/15 text-violet-300"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Settings size={19} />
            Settings
          </NavLink>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
