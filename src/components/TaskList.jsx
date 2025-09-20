import { CreateTaskForm } from "./CreateTaskForm";
import { TaskItem } from "./TaskItem";
import { useTasks } from "../hooks/useTasks";

export function TaskList() {
  const { activeTaskList, createTask, updateTask } = useTasks();

  return (
    <div className="relative">
      <div className="sticky top-0 flex flex-col items-end gap-2 bg-slate-100 px-10 py-5">
        <div className="w-full">
          <CreateTaskForm onSubmit={createTask} />
        </div>
      </div>
      <div className="space-y-3 px-10 pb-10">
        {activeTaskList.length === 0 ? (
          <p className="text-center text-sm">タスクがありません</p>
        ) : (
          activeTaskList.map((task) => <TaskItem key={task.id} task={task} onChange={updateTask} />)
        )}
      </div>
    </div>
  );
}
