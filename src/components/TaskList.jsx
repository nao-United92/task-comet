import { useState } from "react";
import { CreateTaskForm } from "./CreateTaskForm";
import { TaskItem } from "./Taskitem";

export function TaskList() {
  // タスク一覧の状態を管理
  const [taskList, serTaskList] = useState([]);

  // 新しいタスクを追加
  const createTask = (title) => {
    setTaskList((prevTaskList) => {
      // 新しいタスクオブジェクトクォ生成
      const newTask = {
        id: Date.now(), // 現在の時刻を ID として使用
        title,
        status: "notStarted", // 初期状態は未着手
      };
      // 既存のタスクに新しいタスクを追加
      return [...prevTaskList, newTask];
    });
  };

  return (
    <div className="relative">
      <div className="sticky top-0 flex flex-col items-end gap-2 bg-slate-100 px-10 py-5">
        <div className="w-full">
          <CreateTaskForm onSubmit={createTask} />
        </div>
      </div>
      <div className="space-y-3 px-10 pb-10">
        {taskList.length === 0 ? (
          <p className="text-center text-sm">タスクがありません</p>
        ) : (
          taskList.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}
