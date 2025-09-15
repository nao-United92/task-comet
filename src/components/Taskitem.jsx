import { cva } from "class-variance-authority";

// 入力フィールドのスタイルを定義
const inputVariants = cva("flex-1 border px-2 py-1 border-gray-300, bg-white", {
  variants: {
    completed: {
      true: "line-through text-gray-400 disabled:cursor-not-allowed",
      // 完了したタスクのスタイル
    },
  },
});

export function TaskItem({ task }) {
  return (
    <div className="flex items-center gap-3 rounded bg-white px-4 py-2">
      {/* タスクのタイトルを編集可能な入力フィールド */}
      <input
        type="text"
        className={inputVariants({ completed: task.status === "completed" })}
        // タスクが完了している場合のスタイルを適用
        defaultValue={task.title} // タスクの現在のタイトルを表示
        disabled={task.status === "completed"} // 完了したタスクの場合、編集を無効化
      />
    </div>
  );
}
