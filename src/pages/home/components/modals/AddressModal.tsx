import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useClickAway } from "@/hooks/useClickAway";
import { useRef, useState, useEffect } from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";
import usePlacesAutocomplete, { getDetails } from "use-places-autocomplete";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AddressModalProps, ManualAddressData } from "@/types/forms";
import { validateManualAddress } from "@/utils/form-validators";

// Allowed cities and their state mapping
const CITY_STATE_MAP: Record<string, string> = {
  'Lagos': 'Lagos State',
  'Ibadan': 'Oyo State'
};

const ALLOWED_CITIES = Object.keys(CITY_STATE_MAP);
const ALLOWED_STATES = Object.values(CITY_STATE_MAP);

/**
 * Unified AddressModal - Replaces PickupLocationModal and DestinationModal
 * Handles both pickup and destination address selection with type-based customization
 */
export function AddressModal({
  type,
  open,
  onOpenChange,
  value,
  onSelect,
}: AddressModalProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [manualAddress, setManualAddress] = useState<ManualAddressData>({
    street: '',
    apartment: '',
    city: '',
    state: '',
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

  // Parse existing value and pre-fill form when modal opens
  useEffect(() => {
    if (open && value) {
      // Parse the formatted address: "street, apartment, city, state"
      const parts = value.split(',').map(p => p.trim());
      if (parts.length >= 4) {
        const [street, apartment, city, state] = parts;
        setManualAddress({
          street: street || '',
          apartment: apartment || '',
          city: city || '',
          state: state || '',
        });
      }
    } else if (open && !value) {
      // Reset to blank when opening without a value
      setManualAddress({
        street: '',
        apartment: '',
        city: '',
        state: '',
      });
    }
  }, [open, value]);

  /**
   * Parse address from Google Places address_components
   * Extracts structured address data from Google Places API response
   */
  const parseAddressComponents = (components: google.maps.GeocoderAddressComponent[]): Partial<ManualAddressData> => {
    let premise = '';
    let streetNumber = '';
    let route = '';
    let sublocality = '';
    let sublocalityLevel1 = '';
    let sublocalityLevel2 = '';
    let neighborhood = '';
    let city = '';
    let state = '';

    for (const component of components) {
      const type = component.types[0];

      switch (type) {
        case 'premise':
          premise = component.long_name;
          break;
        case 'street_number':
          streetNumber = component.long_name;
          break;
        case 'route':
          route = component.long_name;
          break;
        case 'sublocality_level_2':
          sublocalityLevel2 = component.long_name;
          break;
        case 'sublocality_level_1':
          sublocalityLevel1 = component.long_name;
          break;
        case 'sublocality':
          sublocality = component.long_name;
          break;
        case 'neighborhood':
          neighborhood = component.long_name;
          break;
        case 'locality':
          city = component.long_name;
          break;
        case 'administrative_area_level_2':
          if (!city) {
            city = component.long_name;
          }
          break;
        case 'administrative_area_level_1':
          state = component.long_name;
          break;
      }
    }

    // Build full street address from all relevant components
    const streetParts = [];
    if (premise) streetParts.push(premise);
    if (streetNumber && route) {
      streetParts.push(`${streetNumber} ${route}`);
    } else if (route) {
      streetParts.push(route);
    } else if (streetNumber) {
      streetParts.push(streetNumber);
    }
    if (sublocalityLevel2) streetParts.push(sublocalityLevel2);
    if (sublocalityLevel1) streetParts.push(sublocalityLevel1);
    if (sublocality) streetParts.push(sublocality);
    if (neighborhood) streetParts.push(neighborhood);

    const fullStreet = streetParts.join(', ');

    // Validate that city is within our allowed values
    if (city && !ALLOWED_CITIES.includes(city)) {
      if (state.includes('Lagos')) {
        city = 'Lagos';
      } else if (state.includes('Oyo')) {
        city = 'Ibadan';
      }
    }

    // Ensure state matches our format
    if (state && !ALLOWED_STATES.includes(state)) {
      if (state.includes('Lagos')) {
        state = 'Lagos State';
      } else if (state.includes('Oyo')) {
        state = 'Oyo State';
      }
    }

    return {
      street: fullStreet,
      apartment: '', // Leave empty for user to fill
      city,
      state,
    };
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    setPlacesValue(newValue);
    setShowSuggestions(true);
  };

  const handleSelectLocation = async (placeId: string) => {
    try {
      const parameter = {
        placeId: placeId,
        fields: ['address_components', 'formatted_address']
      };

      const details = await getDetails(parameter);

      if (typeof details !== 'string' && details.address_components) {
        const parsed = parseAddressComponents(details.address_components);
        setManualAddress({ ...manualAddress, ...parsed });
        setSearchValue('');
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
      state: CITY_STATE_MAP[city]
    });
  };

  const handleStateChange = (state: string) => {
    setManualAddress({
      ...manualAddress,
      state
    });
  };

  const handleSubmit = () => {
    const { street, apartment, city, state } = manualAddress;
    const validation = validateManualAddress(street, apartment, city, state);

    if (!validation.valid) {
      return;
    }

    const formattedAddress = `${street}, ${apartment}, ${city}, ${state}, Nigeria`;
    onSelect(formattedAddress);
    onOpenChange(false);
    setManualAddress({
      street: '',
      apartment: '',
      city: '',
      state: '',
    });
  };

  const isFormValid = manualAddress.street.trim() &&
                      manualAddress.apartment.trim() &&
                      manualAddress.city.trim() &&
                      manualAddress.state.trim();

  // Type-specific content
  const title = type === 'pickup' ? 'Pickup Location' : 'Destination';
  const buttonText = type === 'pickup' ? 'Confirm Pickup Address' : 'Confirm Destination Address';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogTitle className="text-lg font-clash font-bold text-gray-900">
          {title}
        </DialogTitle>

        <div className="space-y-3 mt-3">
          {/* Google Places Search */}
          <div className="relative" ref={suggestionsRef}>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Search Address
            </label>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search for a place..."
                className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:border-amber-400 focus:outline-none transition-colors"
                autoFocus
              />
            </div>

            {/* Suggestions List */}
            {status === "OK" && showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-1.5 bg-white border-2 border-gray-200 rounded-xl shadow-xl max-h-[200px] overflow-y-auto">
                {suggestions.map(({ place_id, description }) => (
                  <button
                    key={place_id}
                    type="button"
                    onClick={() => handleSelectLocation(place_id)}
                    className="w-full px-3 py-2 flex items-start gap-2 hover:bg-amber-50 transition-colors text-left border-b border-gray-100 last:border-0"
                  >
                    <FiMapPin className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-900 text-xs">{description}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-start gap-2 text-xs text-gray-500 bg-blue-50 p-2.5 rounded-lg border border-blue-100">
            <FiSearch className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-blue-500" />
            <p>Start typing to see suggestions, or enter your address manually below.</p>
          </div>

          {/* Street Address - Manual Entry */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Street Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={manualAddress.street}
              onChange={(e) => setManualAddress({ ...manualAddress, street: e.target.value })}
              placeholder="e.g., 123 Main Street"
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl text-sm focus:border-amber-400 focus:outline-none transition-colors"
            />
          </div>

          {/* Apartment/Unit Number */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Apartment/Unit Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={manualAddress.apartment}
              onChange={(e) => setManualAddress({ ...manualAddress, apartment: e.target.value })}
              placeholder="e.g., Apt 5, Unit 3B, Floor 2"
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl text-sm focus:border-amber-400 focus:outline-none transition-colors"
            />
          </div>

          {/* City Selection */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              City <span className="text-red-500">*</span>
            </label>
            <Select
              value={manualAddress.city || undefined}
              onValueChange={handleCityChange}
            >
              <SelectTrigger className="w-full py-2 px-3 text-sm border-2 border-gray-200 rounded-xl focus:border-amber-400">
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
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              State <span className="text-red-500">*</span>
            </label>
            <Select
              value={manualAddress.state || undefined}
              onValueChange={handleStateChange}
            >
              <SelectTrigger className="w-full py-2 px-3 text-sm border-2 border-gray-200 rounded-xl focus:border-amber-400">
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
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Country
            </label>
            <div className="px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-600">
              Nigeria
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="button"
            onClick={handleSubmit}
            variant="secondary"
            size="custom"
            className="w-full py-2.5 text-sm font-bold"
            disabled={!isFormValid}
          >
            {buttonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
