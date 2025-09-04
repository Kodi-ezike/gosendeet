import { useEffect } from "react";

export function useGoogleMaps(apiKey: string, libraries: string[] = []) {
  useEffect(() => {
    if (document.getElementById("google-maps-script")) return;

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries.join(",")}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [apiKey, libraries]);
}
