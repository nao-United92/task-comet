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

  return {
    activeTaskList,
    createTask,
    updateTask,
  };
}
