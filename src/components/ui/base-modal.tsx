import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export interface BaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  width?: "sm" | "md" | "lg" | "xl";
  children: ReactNode;
  helpText?: ReactNode;
  footer?: ReactNode;
}

const widthClasses = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
};

/**
 * BaseModal - Standardized modal wrapper for consistent UX
 * Reduces duplication across all modal components
 */
export function BaseModal({
  open,
  onOpenChange,
  title,
  description,
  width = "lg",
  children,
  helpText,
  footer,
}: BaseModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={widthClasses[width]}>
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}

        <div className="space-y-6 mt-6">{children}</div>

        {helpText && (
          <div className="mt-6 p-3 bg-amber-50 border border-amber-100 rounded-lg">
            {helpText}
          </div>
        )}

        {footer && <div className="mt-6">{footer}</div>}
      </DialogContent>
    </Dialog>
  );
}
