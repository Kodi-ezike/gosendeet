import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useClickAway } from "@/hooks/useClickAway";
import { useRef, useState } from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";
import usePlacesAutocomplete from "use-places-autocomplete";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
  const [showSuggestions, setShowSuggestions] = useState(false);
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

  // Parse address from Google Places result
  const parseAddressFromDescription = (description: string) => {
    // Try to extract city from the description
    // Format is usually: "Street, Area, City, State, Nigeria"
    const parts = description.split(',').map(p => p.trim());

    let detectedCity = 'Lagos'; // default
    let street = parts[0] || '';

    // Check if any part contains Lagos or Ibadan
    for (const part of parts) {
      if (part.toLowerCase().includes('lagos')) {
        detectedCity = 'Lagos';
        break;
      } else if (part.toLowerCase().includes('ibadan')) {
        detectedCity = 'Ibadan';
        break;
      }
    }

    return {
      street,
      city: detectedCity,
      state: cityStateMap[detectedCity],
      country: 'Nigeria'
    };
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setManualAddress({ ...manualAddress, street: newValue });
    setPlacesValue(newValue);
    setShowSuggestions(true);
  };

  const handleSelectLocation = (description: string) => {
    // Parse the selected address and populate form fields
    const parsed = parseAddressFromDescription(description);
    setManualAddress(parsed);
    clearSuggestions();
    setShowSuggestions(false);
  };

  const handleCityChange = (city: string) => {
    setManualAddress({
      ...manualAddress,
      city,
      state: cityStateMap[city]
    });
  };

  const handleSubmit = () => {
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
          Select Pickup Location
        </DialogTitle>
        <DialogDescription className="text-gray-600">
          Search for your pickup address or enter manually. Limited to Lagos and Ibadan, Nigeria.
        </DialogDescription>

        <div className="space-y-4 mt-4">
          {/* Search Input with Autocomplete */}
          <div className="relative" ref={suggestionsRef}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Street Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={manualAddress.street}
                onChange={handleSearchChange}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search or type address..."
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-lg focus:border-amber-400 focus:outline-none transition-colors"
                autoFocus
              />
            </div>

            {/* Suggestions List */}
            {status === "OK" && showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl max-h-[250px] overflow-y-auto">
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
            <FiSearch className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-500" />
            <p>Start typing to see suggestions, or enter your address manually below.</p>
          </div>

          {/* City Selection */}
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

          {/* State (Auto-filled) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              State
            </label>
            <div className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-base text-gray-600">
              {manualAddress.state}
            </div>
          </div>

          {/* Country (Fixed) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Country
            </label>
            <div className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-base text-gray-600">
              {manualAddress.country}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="button"
            onClick={handleSubmit}
            variant="secondary"
            size="custom"
            className="w-full py-4 text-base font-bold"
            disabled={!manualAddress.street.trim()}
          >
            Confirm Pickup Address
          </Button>

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
