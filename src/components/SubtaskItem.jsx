import { Trash2 } from "lucide-react";
import { cva } from "class-variance-authority";

const inputVariants = cva("flex-1 bg-transparent", {
  variants: {
    completed: {
      true: "line-through text-gray-400",
    },
  },
});

export function SubtaskItem({ subtask, onUpdate, onDelete }) {
  return (
    <div className="flex items-center gap-2 pl-4 pr-2 py-1 rounded hover:bg-slate-100">
      <input
        type="checkbox"
        className="size-4 cursor-pointer"
        checked={subtask.status === "completed"}
        onChange={(e) =>
          onUpdate({ status: e.target.checked ? "completed" : "notStarted" })
        }
      />
      <input
        type="text"
        className={inputVariants({ completed: subtask.status === "completed" })}
        defaultValue={subtask.title}
        disabled={subtask.status === "completed"}
        onKeyDown={(event) => {
          if (event.nativeEvent.isComposing || event.key !== "Enter") {
            return;
          }
          event.currentTarget.blur();
        }}
        onBlur={(e) => onUpdate({ title: e.target.value })}
      />
      <button
        type="button"
        className="rounded p-1 opacity-50 hover:opacity-100"
        onClick={onDelete}
        aria-label={`サブタスク「${subtask.title}」を削除する`}
      >
        <Trash2 className="size-4 text-gray-500" />
      </button>
    </div>
  );
}
