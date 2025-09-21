import { cva } from "class-variance-authority";
import { priorityMap } from "../constants";
import {
  Rocket,
  Trash2,
  ChevronRight,
  ChevronDown,
  Network,
  Plus,
  Tag,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { SubtaskItem } from "./SubtaskItem";



// 入力フィールドのスタイルを定義
const inputVariants = cva("flex-1 bg-transparent", {
  variants: {
    completed: {
      true: "line-through text-gray-400 disabled:cursor-not-allowed",
    },
  },
});

// サブタスク追加フォーム
function AddSubtaskForm({ onSubmit }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim());
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 pl-8 pr-2 py-1">
      <Plus className="size-4 text-gray-400" />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="サブタスクを追加"
        className="flex-1 bg-transparent text-sm placeholder:text-gray-400 focus:outline-none"
      />
      <button type="submit" className="text-sm font-semibold text-sky-600 hover:text-sky-700">
        追加
      </button>
    </form>
  );
}

// タグ追加フォーム
function AddTagForm({ onAdd }) {
  const [tag, setTag] = useState("");

  const handleAdd = () => {
    if (tag.trim()) {
      onAdd(tag.trim());
      setTag("");
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleAdd();
          }
        }}
        placeholder="タグを追加..."
        className="w-24 bg-transparent text-sm placeholder:text-gray-400 focus:outline-none"
      />
    </div>
  );
}

export function TaskItem({
  task,
  onChange,
  onCometStart,
  onSubtaskAdd,
  onSubtaskUpdate,
  onSubtaskDelete,
}) {
  const ref = useRef(null);
  const [isSubtasksOpen, setIsSubtasksOpen] = useState(false);
  const currentPriority = priorityMap[task.priority] || priorityMap.medium;

  const handlePriorityChange = () => {
    onChange(task.id, { priority: currentPriority.next });
  };

  const handleComplete = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      ref.current.classList.add("slide-out");
      setTimeout(() => {
        onChange(task.id, { status: "completed" });
      }, 700);
    } else {
      onChange(task.id, { status: "notStarted" });
    }
  };

  const handleTagAdd = (newTag) => {
    const newTags = [...new Set([...(task.tags || []), newTag])];
    onChange(task.id, { tags: newTags });
  };

  const handleTagDelete = (tagToDelete) => {
    const newTags = (task.tags || []).filter((t) => t !== tagToDelete);
    onChange(task.id, { tags: newTags });
  };

  const completedSubtasks = (task.subtasks || []).filter((st) => st.status === "completed").length;
  const totalSubtasks = (task.subtasks || []).length;

  return (
    <div className={`rounded bg-white transition-shadow duration-300 shadow-sm hover:shadow-md`}>
      <div
        ref={ref}
        className={`flex items-center gap-2 px-4 py-2 border-l-4 ${currentPriority.border}`}
      >
        <input
          type="checkbox"
          className="size-5 cursor-pointer"
          checked={task.status === "completed"}
          onChange={handleComplete}
        />
        <button
          type="button"
          onClick={handlePriorityChange}
          className="p-1 rounded-full hover:bg-gray-100"
          aria-label={`優先度を${priorityMap[currentPriority.next].label}に変更`}
        >
          <currentPriority.Icon className={`size-5 ${currentPriority.color}`} />
        </button>

        <button
          type="button"
          onClick={() => setIsSubtasksOpen((prev) => !prev)}
          className="flex items-center gap-1 rounded p-1 text-sm text-gray-500 hover:bg-gray-100"
        >
          {isSubtasksOpen ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
          <Network className="size-4" />
          {totalSubtasks > 0 && (
            <span>
              {completedSubtasks}/{totalSubtasks}
            </span>
          )}
        </button>

        <input
          type="text"
          className={inputVariants({ completed: task.status === "completed" })}
          defaultValue={task.title}
          disabled={task.status === "completed"}
          onKeyDown={(event) => {
            if (event.nativeEvent.isComposing || event.key !== "Enter") return;
            event.currentTarget.blur();
          }}
          onBlur={(e) => onChange(task.id, { title: e.target.value })}
        />
        <button
          type="button"
          className="rounded bg-gray-200 p-2 transition-colors hover:bg-gray-300"
          onClick={() => onCometStart(task.id)}
          aria-label={`タスク「${task.title}」で集中モードを開始する`}
        >
          <Rocket className="size-5 text-gray-500" />
        </button>
        <button
          type="button"
          className="rounded bg-gray-200 p-2 transition-colors hover:bg-gray-300"
          onClick={() => onChange(task.id, { status: "trash" })}
          aria-label={`タスク「${task.title}」をゴミ箱へ移動する`}
        >
          <Trash2 className="size-5 text-gray-500" />
        </button>
      </div>

      <div className="px-5 pb-2 pt-1 flex items-center flex-wrap gap-2 border-t border-gray-100">
        <Tag className="size-4 text-gray-400" />
        {(task.tags || []).map((tag) => (
          <span
            key={tag}
            className="flex items-center bg-gray-200 rounded-full px-2 py-0.5 text-xs font-medium text-gray-600"
          >
            {tag}
            <button onClick={() => handleTagDelete(tag)} className="ml-1.5">
              <X className="size-3 text-gray-400 hover:text-gray-600" />
            </button>
          </span>
        ))}
        <AddTagForm onAdd={handleTagAdd} />
      </div>

      {isSubtasksOpen && (
        <div className="pt-1 pb-2 border-t border-gray-100">
          {(task.subtasks || []).map((subtask) => (
            <SubtaskItem
              key={subtask.id}
              subtask={subtask}
              onUpdate={(updates) => onSubtaskUpdate(task.id, subtask.id, updates)}
              onDelete={() => onSubtaskDelete(task.id, subtask.id)}
            />
          ))}
          <AddSubtaskForm onSubmit={(title) => onSubtaskAdd(task.id, title)} />
        </div>
      )}
    </div>
  );
}
