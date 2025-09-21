import { cva } from "class-variance-authority";
import { priorityMap } from "../constants";

const filterButtonVariants = cva(
  "flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition-colors",
  {
    variants: {
      active: {
        true: "border-blue-600 bg-blue-100 text-blue-700",
        false: "border-gray-300 bg-white hover:bg-gray-50",
      },
    },
  },
);

const priorities = ["all", ...Object.keys(priorityMap)];

export function PriorityFilter({ currentFilter, onFilterChange }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border bg-gray-50 p-2">
      <p className="text-sm font-semibold">優先度:</p>
      {priorities.map((priority) => {
        const isActive = currentFilter === priority;
        const label = priority === "all" ? "すべて" : priorityMap[priority].label;
        const { Icon } = priority === "all" ? { Icon: null } : priorityMap[priority];

        return (
          <button
            key={priority}
            type="button"
            className={filterButtonVariants({ active: isActive })}
            onClick={() => onFilterChange(priority)}
          >
            {Icon && <Icon className="size-4" />}
            {label}
          </button>
        );
      })}
    </div>
  );
}
