import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { FiBox } from "react-icons/fi";

interface DimensionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: string;
  onSelect: (dimensions: string) => void;
  defaultDimensions?: string; // e.g., "30 × 20 × 2 cm"
  unit?: string; // e.g., "cm"
}

export function DimensionsModal({
  open,
  onOpenChange,
  value,
  onSelect,
  defaultDimensions = "",
  unit = "cm",
}: DimensionsModalProps) {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  useEffect(() => {
    if (open) {
      // Parse existing value or default dimensions
      const dimToParse = value || defaultDimensions;

      if (dimToParse) {
        // Parse format: "30 × 20 × 2 cm" or "30 × 20 × 2"
        const parts = dimToParse.split(/\s*[×x]\s*/).map(p => p.trim().replace(/[^\d.]/g, ''));

        if (parts.length >= 3) {
          setLength(parts[0] || "");
          setWidth(parts[1] || "");
          setHeight(parts[2] || "");
        }
      } else {
        // Reset to empty
        setLength("");
        setWidth("");
        setHeight("");
      }
    }
  }, [open, value, defaultDimensions]);

  const handleNumberInput = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    // Allow only numbers and decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setter(value);
    }
  };

  const handleConfirm = () => {
    if (length && width && height) {
      const formattedDimensions = `${length} × ${width} × ${height} ${unit}`;
      onSelect(formattedDimensions);
      onOpenChange(false);
    }
  };

  const isValid = length && width && height &&
                  parseFloat(length) > 0 &&
                  parseFloat(width) > 0 &&
                  parseFloat(height) > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogTitle className="text-2xl font-clash font-bold text-gray-900">
          Enter Package Dimensions
        </DialogTitle>
        <DialogDescription className="text-gray-600">
          Specify the dimensions of your package in {unit}
        </DialogDescription>

        <div className="space-y-6 mt-6">
          {/* Show default dimensions if provided */}
          {defaultDimensions && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                <span className="font-semibold">Suggested:</span> {defaultDimensions}
              </p>
            </div>
          )}

          {/* Dimension Inputs */}
          <div className="grid grid-cols-3 gap-4">
            {/* Length */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Length <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={length}
                  onChange={(e) => handleNumberInput(e.target.value, setLength)}
                  placeholder="0"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-center text-lg font-semibold focus:border-amber-400 focus:outline-none transition-colors"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  {unit}
                </span>
              </div>
            </div>

            {/* Width */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Width <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={width}
                  onChange={(e) => handleNumberInput(e.target.value, setWidth)}
                  placeholder="0"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-center text-lg font-semibold focus:border-amber-400 focus:outline-none transition-colors"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  {unit}
                </span>
              </div>
            </div>

            {/* Height */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Height <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={height}
                  onChange={(e) => handleNumberInput(e.target.value, setHeight)}
                  placeholder="0"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-center text-lg font-semibold focus:border-amber-400 focus:outline-none transition-colors"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  {unit}
                </span>
              </div>
            </div>
          </div>

          {/* Visual Preview */}
          {length && width && height && (
            <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-xl">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <FiBox className="w-4 h-4" />
                <span className="font-semibold">Preview</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {length} × {width} × {height} {unit}
              </p>
            </div>
          )}

          {/* Confirm Button */}
          <Button
            type="button"
            onClick={handleConfirm}
            variant="secondary"
            size="custom"
            className="w-full py-4 text-base font-bold"
            disabled={!isValid}
          >
            Confirm Dimensions
          </Button>
        </div>

        {/* Help Text */}
        <div className="flex items-start gap-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
          <FiBox className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p>Enter the dimensions in the format: Length × Width × Height. Accurate dimensions ensure better quotes.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
