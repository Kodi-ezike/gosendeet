import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  label: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export const Stepper = ({ steps, currentStep, className }: StepperProps) => {
  return (
    <div className={cn("w-full flex justify-center", className)}>
      <div className="flex items-start gap-0 relative max-w-2xl">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <div key={index} className="flex flex-col items-center" style={{ width: '180px' }}>
              {/* Step Circle */}
              <div className="relative flex items-center w-full">
                {/* Circle */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10">
                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200",
                      isCompleted && "bg-green-500 border-green-500 text-white",
                      isCurrent && "bg-blue-600 border-blue-600 text-white",
                      isUpcoming && "bg-white border-neutral-300 text-neutral-400"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-semibold">{stepNumber}</span>
                    )}
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "absolute h-0.5 transition-colors duration-200",
                      "left-1/2 w-full",
                      stepNumber < currentStep && "bg-green-500",
                      stepNumber >= currentStep && "bg-neutral-300"
                    )}
                  />
                )}
              </div>

              {/* Label */}
              <div className="mt-6 text-center w-full px-2">
                <p
                  className={cn(
                    "text-sm font-medium transition-colors",
                    (isCompleted || isCurrent) && "text-neutral-900",
                    isUpcoming && "text-neutral-400"
                  )}
                >
                  {step.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
