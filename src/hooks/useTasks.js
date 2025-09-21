import { useLocalStorageState } from "./useLocalStorageState";

export function useTasks() {
  const [taskList, setTaskList] = useLocalStorageState("tasks", []);

  const activeTaskList = taskList.filter(({ status }) => status === "notStarted");

  // タスクを作成する
  const createTask = (title) => {
    setTaskList((prevTaskList) => {
      const newTask = {
        id: Date.now(),
        title,
        status: "notStarted",
        priority: "medium",
        subtasks: [],
        tags: [], // タグ配列を追加
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

  // --- サブタスク操作関数 ---

  // サブタスクを追加する
  const addSubtask = (parentId, subtaskTitle) => {
    setTaskList((prevTaskList) => {
      return prevTaskList.map((task) => {
        if (task.id === parentId) {
          const newSubtask = {
            id: Date.now(),
            title: subtaskTitle,
            status: "notStarted",
          };
          return {
            ...task,
            subtasks: [...(task.subtasks || []), newSubtask],
          };
        }
        return task;
      });
    });
  };

  // サブタスクを更新する
  const updateSubtask = (parentId, subtaskId, updates) => {
    setTaskList((prevTaskList) => {
      return prevTaskList.map((task) => {
        if (task.id === parentId) {
          return {
            ...task,
            subtasks: (task.subtasks || []).map((subtask) =>
              subtask.id === subtaskId ? { ...subtask, ...updates } : subtask,
            ),
          };
        }
        return task;
      });
    });
  };

  // サブタスクを削除する
  const deleteSubtask = (parentId, subtaskId) => {
    setTaskList((prevTaskList) => {
      return prevTaskList.map((task) => {
        if (task.id === parentId) {
          return {
            ...task,
            subtasks: (task.subtasks || []).filter((subtask) => subtask.id !== subtaskId),
          };
        }
        return task;
      });
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
    // サブタスク用関数をエクスポート
    addSubtask,
    updateSubtask,
    deleteSubtask,
  };
}
