import { ReactNode } from "react";
import { FiChevronRight } from "react-icons/fi";
import { cn } from "@/lib/utils";

interface ModalTriggerFieldProps {
  label: string;
  icon?: ReactNode;
  value?: string | ReactNode;
  placeholder: string;
  onClick: () => void;
  error?: string;
  required?: boolean;
  variant?: "bold" | "minimal" | "floating";
}

/**
 * ModalTriggerField - Reusable field component that triggers a modal
 * Replaces repeated button patterns across the form
 */
export function ModalTriggerField({
  label,
  icon,
  value,
  placeholder,
  onClick,
  error,
  required = false,
  variant = "minimal",
}: ModalTriggerFieldProps) {
  const labelStyles = cn(
    "font-clash font-bold text-xs mb-2 block",
    variant === "bold" && "text-[#1a1a1a]",
    (variant === "minimal" || variant === "floating") && "text-[#4b5563]"
  );

  const hasValue = typeof value === "string" ? value : !!value;

  return (
    <div>
      <label className={cn(labelStyles, "flex items-center gap-2")}>
        {icon}
        {label}
        {(required || error) && <span className="text-red-500">*</span>}
      </label>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "w-full text-left py-2 px-3 border-b-2 transition-colors flex items-center justify-between group",
          error
            ? "border-red-500"
            : hasValue
            ? "border-amber-400"
            : "border-[#e5e5e5] hover:border-amber-400"
        )}
      >
        <div className="flex-1 min-w-0">
          {typeof value === "string" ? (
            <span className={cn("text-base truncate", value ? "text-[#1a1a1a]" : "text-[#9ca3af]")}>
              {value || placeholder}
            </span>
          ) : value ? (
            value
          ) : (
            <span className="text-base text-[#9ca3af]">{placeholder}</span>
          )}
        </div>
        <FiChevronRight className="w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors flex-shrink-0" />
      </button>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
