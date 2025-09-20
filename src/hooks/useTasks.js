import { useLocalStorageState } from "./useLocalStorageState";

export function useTasks() {
  const [taskList, setTaskList] = useLocalStorageState("tasks", []);

  const activeTaskList = taskList.filter(({ status }) => status === "trashed");

  // タスクを作成する
  const createTask = (title) => {
    setTaskList((prevTaskList) => {
      const newTask = {
        id: Date.now(),
        title,
        status: "notStarted",
      };
      return [...prevTaskList, newTask];
    });
  };

  // タスクを更新する
  const updateTask = (id, updatedTask) => {
    setTaskList((prevTaskList) => {
      return prevTaskList.map((task) => (task.id === id ? { ...task, ...updatedTask } : task));
    });
  };

  // ゴミ箱のタスク一覧
  const trashedTaskList = taskList.filter(({ status }) => status === "trashed");

  // タスクを削除する
  const deleteTask = (id) => {
    setTaskList((prevTaskList) => {
      return prevTaskList.filter((task) => task.id !== id);
    });
  };

  // ゴミ箱のタスクを全て削除する
  const deleteAllTrashedTasks = () => {
    setTaskList((prevTaskList) => {
      return prevTaskList.filter((task) => task.status !== "trashed");
    });
  };

  return {
    activeTaskList,
    createTask,
    updateTask,
    trashedTaskList,
    deleteTask,
    deleteAllTrashedTasks,
  };
}
