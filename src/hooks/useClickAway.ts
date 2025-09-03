import { useEffect } from "react";

export function useClickAway<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  onClickAway: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    function handleClick(event: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickAway(event);
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [ref, onClickAway]);
}
