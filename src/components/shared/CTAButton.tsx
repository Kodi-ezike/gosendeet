import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "default" | "large";
}

/**
 * CTAButton - Reusable Call-to-Action button
 * Consistent gradient styling across Benefits, ProcessFlow, and other sections
 */
export function CTAButton({
  children,
  variant = "primary",
  size = "default",
  className,
  ...props
}: CTAButtonProps) {
  return (
    <button
      className={cn(
        "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600",
        "text-white font-semibold rounded-full shadow-lg",
        "transition-all duration-300 hover:-translate-y-1",
        size === "default" && "px-10 py-4",
        size === "large" && "px-12 py-5 text-lg",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
