import { useEffect, useState } from "react";

type Suggestion = google.maps.places.AutocompleteSuggestion;

export function usePlacesAutocompleteV2() {
  const [ready, setReady] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [status, setStatus] = useState<string>("IDLE");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        await google.maps.importLibrary("places");
        setReady(true);
      } catch (e) {
        console.error("Google Maps not loaded:", e);
      }
    };
    init();
  }, []);

  const fetchSuggestions = async (value: string) => {
    setInputValue(value);

    if (!value) {
      setSuggestions([]);
      setStatus("ZERO_RESULTS");
      return;
    }

    try {
      const { AutocompleteSuggestion } = (await google.maps.importLibrary(
        "places"
      )) as any;

      const { suggestions } =
        await AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: value,
          includedRegionCodes: ["ng"], // optional: restrict to Nigeria
        });

      setSuggestions(suggestions);
      setStatus(suggestions.length > 0 ? "OK" : "ZERO_RESULTS");
    } catch (e) {
      console.error("Error fetching suggestions:", e);
      setStatus("ERROR");
    }
  };

  const clearSuggestions = () => {
    setSuggestions([]);
    setStatus("IDLE");
  };

  return {
    ready,
    value: inputValue,
    suggestions: { status, data: suggestions },
    setValue: fetchSuggestions,
    clearSuggestions,
  };
}
