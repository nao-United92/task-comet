import { X } from "lucide-react";

export function CometRushView({ task, onExit }) {
  return (
    <div className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-2xl">
        <p className="mb-4 text-lg font-semibold text-slate-600">
          FOCUS MODE
        </p>
        <h1 className="mb-8 text-4xl font-bold text-slate-800">
          {task.title}
        </h1>
        <button
          type="button"
          onClick={onExit}
          className="inline-flex items-center gap-2 rounded-full bg-slate-600 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-slate-700"
          aria-label="集中モードを終了する"
        >
          <X className="size-6" />
          <span>モード終了</span>
        </button>
      </div>
    </div>
  );
}
