import { useState, useMemo } from "react";
import { CreateTaskForm } from "./CreateTaskForm";
import { TaskItem } from "./TaskItem";
import { CometRushView } from "./CometRushView";

export function TaskList({ tasks, onTaskCreate, onTaskUpdate, onSubtaskAdd, onSubtaskUpdate, onSubtaskDelete }) {
  const [cometTaskId, setCometTaskId] = useState(null);
  const [sortBy, setSortBy] = useState("createdAt");
  const [selectedTags, setSelectedTags] = useState([]);

  const handleCometStart = (taskId) => {
    setCometTaskId(taskId);
  };

  const handleCometExit = () => {
    setCometTaskId(null);
  };

  const cometTask = cometTaskId ? tasks.find((task) => task.id === cometTaskId) : null;

  // プロジェクト内の全ユニークタグを抽出
  const allTags = useMemo(() => {
    const tags = new Set();
    tasks.forEach((task) => {
      (task.tags || []).forEach((tag) => tags.add(tag));
    });
    return [...tags].sort();
  }, [tasks]);

  const handleTagClick = (tag) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const filteredAndSortedTaskList = useMemo(() => {
    const filtered = selectedTags.length === 0
        ? tasks
        : tasks.filter((task) =>
            selectedTags.every((tag) => (task.tags || []).includes(tag)),
          );

    const priorityOrder = { high: 1, medium: 2, low: 3 };

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "priority":
          const priorityA = priorityOrder[a.priority] || 2;
          const priorityB = priorityOrder[b.priority] || 2;
          return priorityA - priorityB;
        case "createdAt":
        default:
          return b.id - a.id;
      }
    });
  }, [tasks, sortBy, selectedTags]);

  if (cometTask) {
    return <CometRushView task={cometTask} onExit={handleCometExit} />;
  }

  return (
    <div className="relative">
      <div className="sticky top-0 flex flex-col items-end gap-4 bg-slate-100 px-10 py-5">
        <div className="w-full flex justify-between items-start">
          <div className="flex items-center gap-2 flex-wrap">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-2.5 py-1 text-xs rounded-full transition-colors ${
                  selectedTags.includes(tag)
                    ? "bg-sky-600 text-white font-semibold"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}>
                #{tag}
              </button>
            ))}
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="text-xs font-semibold text-gray-500 hover:text-gray-700"
              >
                クリア
              </button>
            )}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded border border-gray-300 bg-white px-3 py-2 text-sm"
          >
            <option value="createdAt">作成日順</option>
            <option value="priority">優先度順</option>
          </select>
        </div>
        <div className="w-full">
          <CreateTaskForm onSubmit={onTaskCreate} />
        </div>
      </div>
      <div className="space-y-3 px-10 pb-10">
        {filteredAndSortedTaskList.length === 0 ? (
          <p className="text-center text-sm">タスクがありません</p>
        ) : (
          filteredAndSortedTaskList.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onChange={onTaskUpdate}
              onCometStart={handleCometStart}
              onSubtaskAdd={onSubtaskAdd}
              onSubtaskUpdate={onSubtaskUpdate}
              onSubtaskDelete={onSubtaskDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
