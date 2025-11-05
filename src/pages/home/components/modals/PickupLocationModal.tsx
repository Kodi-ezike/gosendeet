import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useClickAway } from "@/hooks/useClickAway";
import { useRef, useState } from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";
import usePlacesAutocomplete from "use-places-autocomplete";

interface PickupLocationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: string;
  onSelect: (location: string) => void;
}

export function PickupLocationModal({
  open,
  onOpenChange,
  value,
  onSelect,
}: PickupLocationModalProps) {
  const [searchValue, setSearchValue] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null!);

  const {
    suggestions: { status, data: suggestions },
    setValue: setPlacesValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  useClickAway(suggestionsRef, () => setShowSuggestions(false));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    setPlacesValue(newValue);
    setShowSuggestions(true);
  };

  const handleSelectLocation = (description: string) => {
    setSearchValue(description);
    onSelect(description);
    clearSuggestions();
    setShowSuggestions(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh]">
        <DialogTitle className="text-2xl font-clash font-bold text-gray-900">
          Select Pickup Location
        </DialogTitle>
        <DialogDescription className="text-gray-600">
          Search for your pickup address or location
        </DialogDescription>

        <div className="space-y-4 mt-4">
          {/* Search Input */}
          <div className="relative" ref={suggestionsRef}>
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchValue}
                onChange={handleInputChange}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Enter pickup location..."
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-lg focus:border-amber-400 focus:outline-none transition-colors"
                autoFocus
              />
            </div>

            {/* Suggestions List */}
            {status === "OK" && showSuggestions && (
              <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl max-h-[300px] overflow-y-auto">
                {suggestions.map(({ place_id, description }) => (
                  <button
                    key={place_id}
                    type="button"
                    onClick={() => handleSelectLocation(description)}
                    className="w-full px-4 py-3 flex items-start gap-3 hover:bg-amber-50 transition-colors text-left border-b border-gray-100 last:border-0"
                  >
                    <FiMapPin className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-900 text-sm">{description}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Currently Selected */}
          {value && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-center gap-2 text-sm font-semibold text-amber-700 mb-1">
                <FiMapPin className="w-4 h-4" />
                Current Selection
              </div>
              <p className="text-gray-900 font-medium">{value}</p>
            </div>
          )}

          {/* Help Text */}
          <div className="flex items-start gap-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
            <FiMapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>Start typing your address and select from the suggestions</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
