import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  stepNumber: number;
  isComplete: boolean;
  isActive: boolean;
}

/**
 * StepIndicator - Visual step indicator for multi-step forms
 * Extracted from PackageTypeModal for reusability
 */
export function StepIndicator({ stepNumber, isComplete, isActive }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-2 mb-1">
      <div
        className={cn(
          "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200",
          isComplete
            ? "bg-green-500 text-white"
            : isActive
            ? "bg-amber-500 text-white ring-2 ring-amber-200"
            : "bg-gray-200 text-gray-500"
        )}
      >
        {isComplete ? "✓" : stepNumber}
      </div>
    </div>
  );
}
