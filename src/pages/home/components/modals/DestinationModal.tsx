import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useClickAway } from "@/hooks/useClickAway";
import { useRef, useState, useEffect } from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";
import usePlacesAutocomplete, { getDetails } from "use-places-autocomplete";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DestinationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: string;
  onSelect: (location: string) => void;
}

export function DestinationModal({
  open,
  onOpenChange,
  value,
  onSelect,
}: DestinationModalProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchValue, setSearchValue] = useState(''); // Separate search field
  const [manualAddress, setManualAddress] = useState({
    street: '',
    apartment: '',
    city: '',
    state: '',
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
    'Lagos': 'Lagos State',
    'Ibadan': 'Oyo State'
  };

  // Parse existing value and pre-fill form when modal opens
  useEffect(() => {
    if (open && value) {
      // Parse the formatted address: "street, apartment, city, state, country"
      const parts = value.split(',').map(p => p.trim());
      if (parts.length >= 4) {
        const [street, apartment, city, state] = parts;
        setManualAddress({
          street: street || '',
          apartment: apartment || '',
          city: city || '',
          state: state || '',
          country: 'Nigeria'
        });
      }
    } else if (open && !value) {
      // Reset to blank when opening without a value
      setManualAddress({
        street: '',
        apartment: '',
        city: '',
        state: '',
        country: 'Nigeria'
      });
    }
  }, [open, value]);

  // Parse address from Google Places address_components
  const parseAddressComponents = (components: google.maps.GeocoderAddressComponent[]) => {
    let street = '';
    let city = '';
    let state = '';
    let country = 'Nigeria';

    for (const component of components) {
      const type = component.types[0];

      switch (type) {
        case 'street_number':
          street = component.long_name + ' ';
          break;
        case 'route':
          street += component.long_name;
          break;
        case 'locality':
          city = component.long_name;
          break;
        case 'administrative_area_level_1':
          state = component.long_name;
          break;
        case 'country':
          country = component.long_name;
          break;
      }
    }

    // Validate that city and state are within our allowed values
    if (city && !['Lagos', 'Ibadan'].includes(city)) {
      // If city not in our list, try to default based on state
      if (state.includes('Lagos')) {
        city = 'Lagos';
      } else if (state.includes('Oyo')) {
        city = 'Ibadan';
      }
    }

    // Ensure state matches our format
    if (state && !['Lagos State', 'Oyo State'].includes(state)) {
      if (state.includes('Lagos')) {
        state = 'Lagos State';
      } else if (state.includes('Oyo')) {
        state = 'Oyo State';
      }
    }

    return {
      street: street.trim(),
      apartment: '', // Leave empty for user to fill
      city,
      state,
      country
    };
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue); // Update separate search field
    setPlacesValue(newValue);
    setShowSuggestions(true);
  };

  const handleSelectLocation = async (placeId: string) => {
    try {
      // Get detailed place information including address_components
      const parameter = {
        placeId: placeId,
        fields: ['address_components', 'formatted_address']
      };

      const details = await getDetails(parameter);

      if (typeof details !== 'string' && details.address_components) {
        // Parse the structured address components
        const parsed = parseAddressComponents(details.address_components);
        setManualAddress({ ...manualAddress, ...parsed });
        setSearchValue(''); // Clear search after selection
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
    } finally {
      clearSuggestions();
      setShowSuggestions(false);
    }
  };

  const handleCityChange = (city: string) => {
    setManualAddress({
      ...manualAddress,
      city,
      state: cityStateMap[city]
    });
  };

  const handleStateChange = (state: string) => {
    setManualAddress({
      ...manualAddress,
      state
    });
  };

  const handleSubmit = () => {
    const { street, apartment, city, state, country } = manualAddress;
    if (!street.trim() || !apartment.trim() || !city.trim() || !state.trim()) {
      return;
    }
    const apartmentPart = apartment.trim() ? `, ${apartment}` : '';
    const formattedAddress = `${street}${apartmentPart}, ${city}, ${state}, ${country}`;
    onSelect(formattedAddress);
    onOpenChange(false);
    setManualAddress({
      street: '',
      apartment: '',
      city: '',
      state: '',
      country: 'Nigeria'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogTitle className="text-xl font-clash font-bold text-gray-900">
          Destination
        </DialogTitle>

        <div className="space-y-4 mt-4">

          {/* Google Places Search - Separate from manual entry */}
          <div className="relative" ref={suggestionsRef}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Search Address
            </label>
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search for a place..."
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
                    onClick={() => handleSelectLocation(place_id)}
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
            <p> Start typing to see suggestions, or enter your address manually below.</p>
          </div>

          {/* Street Address - Manual Entry */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Street Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={manualAddress.street}
              onChange={(e) => setManualAddress({ ...manualAddress, street: e.target.value })}
              placeholder="e.g., 123 Main Street"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base focus:border-amber-400 focus:outline-none transition-colors"
            />
          </div>

          {/* Apartment/Unit Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Apartment/Unit Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={manualAddress.apartment}
              onChange={(e) => setManualAddress({ ...manualAddress, apartment: e.target.value })}
              placeholder="e.g., Apt 5, Unit 3B, Floor 2"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base focus:border-amber-400 focus:outline-none transition-colors"
            />
          </div>

          {/* City Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <Select
              value={manualAddress.city || undefined}
              onValueChange={handleCityChange}
            >
              <SelectTrigger className="w-full py-3 px-4 text-base border-2 border-gray-200 rounded-xl focus:border-amber-400">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Lagos">Lagos</SelectItem>
                <SelectItem value="Ibadan">Ibadan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* State Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <Select
              value={manualAddress.state || undefined}
              onValueChange={handleStateChange}
            >
              <SelectTrigger className="w-full py-3 px-4 text-base border-2 border-gray-200 rounded-xl focus:border-amber-400">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Lagos State">Lagos State</SelectItem>
                <SelectItem value="Oyo State">Oyo State</SelectItem>
              </SelectContent>
            </Select>
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
            disabled={!manualAddress.street.trim() || !manualAddress.apartment.trim() || !manualAddress.city.trim() || !manualAddress.state.trim()}
          >
            Confirm Destination Address
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
