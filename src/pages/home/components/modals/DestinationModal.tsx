import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useClickAway } from "@/hooks/useClickAway";
import { useRef, useState } from "react";
import { FiMapPin, FiSearch, FiEdit3 } from "react-icons/fi";
import usePlacesAutocomplete from "use-places-autocomplete";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DestinationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: string;
  onSelect: (location: string) => void;
}

type InputMode = 'search' | 'manual';

export function DestinationModal({
  open,
  onOpenChange,
  value,
  onSelect,
}: DestinationModalProps) {
  const [searchValue, setSearchValue] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputMode, setInputMode] = useState<InputMode>('search');
  const [manualAddress, setManualAddress] = useState({
    street: '',
    city: 'Lagos',
    state: 'Lagos',
    country: 'Nigeria'
  });
  const suggestionsRef = useRef<HTMLDivElement>(null!);

  const {
    suggestions: { status, data: suggestions },
    setValue: setPlacesValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: 'ng' },
    },
    debounce: 300,
  });

  useClickAway(suggestionsRef, () => setShowSuggestions(false));

  const cityStateMap: Record<string, string> = {
    'Lagos': 'Lagos',
    'Ibadan': 'Oyo'
  };

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

  const handleCityChange = (city: string) => {
    setManualAddress({
      ...manualAddress,
      city,
      state: cityStateMap[city]
    });
  };

  const handleManualSubmit = () => {
    const { street, city, state, country } = manualAddress;
    if (!street.trim()) {
      return;
    }
    const formattedAddress = `${street}, ${city}, ${state}, ${country}`;
    onSelect(formattedAddress);
    onOpenChange(false);
    setManualAddress({
      street: '',
      city: 'Lagos',
      state: 'Lagos',
      country: 'Nigeria'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogTitle className="text-2xl font-clash font-bold text-gray-900">
          Select Destination
        </DialogTitle>
        <DialogDescription className="text-gray-600">
          {inputMode === 'search'
            ? 'Search for your delivery address in Lagos or Ibadan, Nigeria'
            : 'Enter your delivery address details manually'
          }
        </DialogDescription>

        <div className="space-y-4 mt-4">
          {/* Mode Toggle Tabs */}
          <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
            <button
              type="button"
              onClick={() => setInputMode('search')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md font-semibold text-sm transition-all",
                inputMode === 'search'
                  ? "bg-white text-amber-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <FiSearch className="w-4 h-4" />
              Search
            </button>
            <button
              type="button"
              onClick={() => setInputMode('manual')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md font-semibold text-sm transition-all",
                inputMode === 'manual'
                  ? "bg-white text-amber-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <FiEdit3 className="w-4 h-4" />
              Manual Entry
            </button>
          </div>

          {/* Search Mode */}
          {inputMode === 'search' && (
            <>
              <div className="relative" ref={suggestionsRef}>
                <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchValue}
                    onChange={handleInputChange}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Enter destination location..."
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

              <div className="flex items-start gap-2 text-sm text-gray-500 bg-blue-50 p-3 rounded-lg border border-blue-100">
                <FiMapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-500" />
                <p>Showing results for Nigeria only. Type your address to see suggestions.</p>
              </div>
            </>
          )}

          {/* Manual Entry Mode */}
          {inputMode === 'manual' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={manualAddress.street}
                  onChange={(e) => setManualAddress({ ...manualAddress, street: e.target.value })}
                  placeholder="e.g., 456 Victoria Island"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base focus:border-amber-400 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Lagos', 'Ibadan'].map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => handleCityChange(city)}
                      className={cn(
                        "py-3 px-4 rounded-xl border-2 font-semibold transition-all",
                        manualAddress.city === city
                          ? "border-amber-500 bg-amber-50 text-amber-700"
                          : "border-gray-200 hover:border-amber-300 text-gray-700"
                      )}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  State
                </label>
                <div className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-base text-gray-600">
                  {manualAddress.state}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Country
                </label>
                <div className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-base text-gray-600">
                  {manualAddress.country}
                </div>
              </div>

              <Button
                type="button"
                onClick={handleManualSubmit}
                variant="secondary"
                size="custom"
                className="w-full py-4 text-base font-bold"
                disabled={!manualAddress.street.trim()}
              >
                Use This Address
              </Button>

              <div className="flex items-start gap-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                <FiEdit3 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>Enter your complete street address. City is limited to Lagos or Ibadan.</p>
              </div>
            </div>
          )}

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
        </div>
      </DialogContent>
    </Dialog>
  );
}
