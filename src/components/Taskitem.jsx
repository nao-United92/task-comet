import { cva } from "class-variance-authority";
import { Trash2 } from "lucide-react";

// 入力フィールドのスタイルを定義
const inputVariants = cva("flex-1 border px-2 py-1 border-gray-300, bg-white", {
  variants: {
    completed: {
      true: "line-through text-gray-400 disabled:cursor-not-allowed",
      // 完了したタスクのスタイル
    },
  },
});

export function TaskItem({ task, onChange }) {
  return (
    <div className="flex items-center gap-3 rounded bg-white px-4 py-2">
      <div className="flex items-center">
        {/* タスクのステータス変更用のチェックボックス */}
        <input
          type="checkbox"
          className="size-5 cursor-pointer"
          checked={task.status === "completed"} // ステータスが completed の場合はチェックON
          onChange={(e) =>
            onChange(task.id, {
              // チェック状態に基づいてタスクのステータスを更新
              status: e.target.checked ? "completed" : "notStarted",
            })
          }
        />
      </div>
      {/* タスクのタイトルを編集可能な入力フィールド */}
      <input
        type="text"
        className={inputVariants({ completed: task.status === "completed" })}
        // タスクが完了している場合のスタイルを適用
        defaultValue={task.title} // タスクの現在のタイトルを表示
        disabled={task.status === "completed"} // 完了したタスクの場合、編集を無効化
        onKeyDown={(event) => {
          // Enterキーで編集を確定し、入力フィールドからフォーカスを外す
          if (event.nativeEvent.isComposing || event.key !== "Enter") {
            return;
          }
          event.currrentTarget.blur();
        }}
        onBlur={(e) =>
          onChange(task.id, {
            // フォーカスが外れたタイミングでタスクのタイトルを更新
            title: e.target.value,
          })
        }
      />
      {/* タスクをゴミ箱に移動するボタン */}
      <button
        type="button"
        className="rounded bg-gray-200 p-2 transition-colors hover:bg-gray-300"
        onClick={() =>
          onChange(task.id, {
            status: "trash", // ステータスをゴミ箱に変更
          })
        }
        aria-label={`タスク「${task.title}」をゴミ箱へ移動する`}
      >
        <Trash2 className="size-5 text-gray-500" />
      </button>
    </div>
  );
}
