import { SignalHigh, SignalMedium, SignalLow } from "lucide-react";

// 優先度の定義
export const priorityMap = {
  high: {
    label: "高",
    Icon: SignalHigh,
    color: "text-red-500",
    border: "border-red-500",
    next: "medium",
  },
  medium: {
    label: "中",
    Icon: SignalMedium,
    color: "text-yellow-500",
    border: "border-yellow-500",
    next: "low",
  },
  low: {
    label: "低",
    Icon: SignalLow,
    color: "text-blue-500",
    border: "border-blue-500",
    next: "high",
  },
};
