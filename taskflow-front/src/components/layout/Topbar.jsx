import { Bell, Menu, Plus, Search } from "lucide-react";
import { useLocation } from "react-router-dom";

const titles = {
  "/": "Dashboard",
  "/tasks": "My Tasks",
  "/board": "Board",
  "/projects": "Projects",
  "/calendar": "Calendar",
  "/settings": "Settings",
};

function Topbar({ onNewTask, onMenuClick }) {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-[#101114]/95 px-5 backdrop-blur-md md:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="rounded-lg p-2 text-gray-400 hover:bg-white/5 lg:hidden"
        >
          <Menu size={21} />
        </button>

        <div>
          <h2 className="text-lg font-semibold">
            {titles[pathname] || "Taskflow"}
          </h2>
          <p className="text-xs text-gray-500">Your personal workspace</p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <button
          type="button"
          aria-label="Search"
          className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"
        >
          <Search size={19} />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"
        >
          <Bell size={19} />
        </button>

        <button
          type="button"
          onClick={onNewTask}
          className="flex items-center gap-2 rounded-lg bg-violet-500 px-3 py-2.5 text-sm font-medium hover:bg-violet-600 md:px-4"
        >
          <Plus size={17} />
          <span className="hidden sm:inline">New task</span>
        </button>
      </div>
    </header>
  );
}

export default Topbar;
