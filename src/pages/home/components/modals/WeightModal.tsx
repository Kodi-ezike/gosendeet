import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

interface WeightModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: string;
  onSelect: (weight: string) => void;
  maxWeight?: number;
  weightUnit?: string;
}

export function WeightModal({
  open,
  onOpenChange,
  value,
  onSelect,
  maxWeight,
  weightUnit = "kg",
}: WeightModalProps) {
  const [weight, setWeight] = useState(value || "1");
  const [unit] = useState(weightUnit);

  useEffect(() => {
    if (open && value) {
      setWeight(value);
    }
  }, [open, value]);

  const quickWeights = [1, 5, 10, 20, 50];

  const handleIncrement = () => {
    const currentWeight = parseFloat(weight) || 0;
    setWeight(String(currentWeight + 1));
  };

  const handleDecrement = () => {
    const currentWeight = parseFloat(weight) || 0;
    if (currentWeight > 1) {
      setWeight(String(currentWeight - 1));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setWeight(value);
    }
  };

  const handleQuickSelect = (quickWeight: number) => {
    setWeight(String(quickWeight));
  };

  const handleConfirm = () => {
    const weightValue = parseFloat(weight);
    if (weight && weightValue > 0) {
      // Check max weight validation
      if (maxWeight && weightValue > maxWeight) {
        return; // Don't submit if exceeds max
      }
      onSelect(weight);
      onOpenChange(false);
    }
  };

  const currentWeight = parseFloat(weight) || 0;
  const exceedsMax = maxWeight && currentWeight > maxWeight;
  const isValidWeight = weight && currentWeight > 0 && !exceedsMax;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="text-2xl font-clash font-bold text-gray-900">
          Enter Package Weight
        </DialogTitle>
        <DialogDescription className="text-gray-600">
          Specify the weight of your package in kilograms
        </DialogDescription>

        <div className="space-y-6 mt-6">
          {/* Max Weight Banner */}
          {maxWeight && (
            <div className={cn(
              "p-3 border rounded-lg",
              exceedsMax
                ? "bg-red-50 border-red-200"
                : "bg-blue-50 border-blue-200"
            )}>
              <p className={cn(
                "text-sm font-semibold",
                exceedsMax ? "text-red-700" : "text-blue-700"
              )}>
                {exceedsMax ? "⚠️ Weight exceeds maximum!" : "ℹ️ Maximum weight:"} {maxWeight}{unit}
              </p>
            </div>
          )}

          {/* Weight Input with Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleDecrement}
              className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={parseFloat(weight) <= 1}
            >
              <FiMinus className="w-5 h-5 text-gray-700" />
            </button>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={weight}
                onChange={handleInputChange}
                className="w-24 text-center text-4xl font-bold text-gray-900 border-0 border-b-4 border-amber-400 focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="0"
              />
              <span className="text-2xl font-semibold text-gray-600">{unit}</span>
            </div>

            <button
              type="button"
              onClick={handleIncrement}
              className="w-12 h-12 rounded-xl bg-amber-500 hover:bg-amber-600 flex items-center justify-center transition-colors"
            >
              <FiPlus className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Quick Select Buttons */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">Quick Select</p>
            <div className="grid grid-cols-5 gap-2">
              {quickWeights.map((quickWeight) => (
                <button
                  key={quickWeight}
                  type="button"
                  onClick={() => handleQuickSelect(quickWeight)}
                  className={cn(
                    "py-3 px-2 rounded-lg border-2 transition-all font-semibold text-sm",
                    weight === String(quickWeight)
                      ? "border-amber-500 bg-amber-50 text-amber-700"
                      : "border-gray-200 hover:border-amber-300 hover:bg-amber-50 text-gray-700"
                  )}
                >
                  {quickWeight}{unit}
                </button>
              ))}
            </div>
          </div>

          {/* Slider for visual feedback */}
          <div>
            <input
              type="range"
              min="1"
              max="100"
              value={weight || "1"}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1kg</span>
              <span>100kg</span>
            </div>
          </div>

          {/* Confirm Button */}
          <Button
            type="button"
            onClick={handleConfirm}
            variant="secondary"
            size="custom"
            className="w-full py-4 text-base font-bold"
            disabled={!isValidWeight}
          >
            Confirm Weight
          </Button>
        </div>

        {/* Help Text */}
        <div className="flex items-start gap-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
          <span className="text-lg">⚖️</span>
          <p>Enter the approximate weight of your package. Accurate weight ensures better quotes.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
