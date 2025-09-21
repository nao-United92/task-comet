import { useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { PriorityFilter } from "./components/PriorityFilter";
import { TaskList } from "./components/TaskList";
import { TrashedTaskList } from "./components/TrashedTaskList";
import { useTasks } from "./hooks/useTasks";

// TaskList とフィルターをまとめるコンポーネント
const TaskBoard = () => {
  const {
    activeTaskList,
    createTask,
    updateTask,
    addSubtask,
    updateSubtask,
    deleteSubtask,
  } = useTasks();
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filteredTasks = activeTaskList.filter((task) => {
    if (priorityFilter === "all") return true;
    return task.priority === priorityFilter;
  });

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 lg:p-8">
      <PriorityFilter
        currentFilter={priorityFilter}
        onFilterChange={setPriorityFilter}
      />
      <TaskList
        tasks={filteredTasks}
        onTaskCreate={createTask}
        onTaskUpdate={updateTask}
        onSubtaskAdd={addSubtask}
        onSubtaskUpdate={updateSubtask}
        onSubtaskDelete={deleteSubtask}
      />
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    children: [
      {
        path: "/",
        element: <TaskBoard />,
      },
      {
        path: "trash",
        element: <TrashedTaskList />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
