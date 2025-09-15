import { dummyTaskList } from "../data/dummyTaskList";
import { TaskItem } from "./TaskItem";

export function TaskList() {
  return (
    <div className="space-y-3 px-10 pb-10">
      <div className="space-y-3 px-10 pb-10">
        {dummyTaskList.length === 0 ? (
          // タスクが0件の場合はフォールバックを表示
          <p className="text-center text-sm">タスクがありません</p>
        ) : (
          dummyTaskList.map((task) => (
            <TaskItem key={task.id} task={task} /> // 各タスクアイテムを表示
          ))
        )}
      </div>
    </div>
  );
}
