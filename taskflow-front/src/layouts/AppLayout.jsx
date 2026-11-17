import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import NewTaskModal from "../components/tasks/NewTaskModal";

function AppLayout() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function handleNewTask() {
    setTaskToEdit(null);
    setIsTaskModalOpen(true);
  }

  function handleEditTask(task) {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  }

  function handleCloseTaskModal() {
    setIsTaskModalOpen(false);
    setTaskToEdit(null);
  }

  return (
    <div className="min-h-screen bg-[#101114] text-white">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="min-h-screen lg:pl-64">
        <Topbar
          onNewTask={handleNewTask}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="mx-auto max-w-[1600px] p-5 md:p-8">
          <Outlet context={{ onEditTask: handleEditTask }} />
        </main>
      </div>

      <NewTaskModal
        isOpen={isTaskModalOpen}
        onClose={handleCloseTaskModal}
        taskToEdit={taskToEdit}
      />
    </div>
  );
}

export default AppLayout;
