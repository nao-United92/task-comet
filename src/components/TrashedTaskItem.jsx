import { ArchiveRestore, Trash2 } from "lucide-react";

export function TrashedTaskItem({ task, onResource, onDelete }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded bg-slate-200 px-4 py-2">
      <p>{task.title}</p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="rounded bg-gray-200 p-2 transition-colors hover:bg-gray-300"
          onClick={() =>
            onResource(task.id, {
              status: "notStarted", // ステータスを「未着手」で復元
            })
          }
          aria-label={`タスク「${task.title}」をゴミ箱から復元する`}
        >
          <ArchiveRestore className="size-5 text-gray-500" />
        </button>
        <button
          type="button"
          className="rounded bg-gray-200 p-2 transition-colors hover:bg-gray-300"
          onClick={() => onDelete(task.id)}
          aria-label={`タスク「${task.title}」を完全に削除する`}
        >
          <Trash2 className="size-5 text-gray-500" />
        </button>
      </div>
    </div>
  );
}
