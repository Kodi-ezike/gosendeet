import { useRef, useState, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Option = {
  label: string;
  value: string;
};

type MultiSelectProps = {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
};

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select options",
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleOption = (val: string) => {
    const newValue = value.includes(val)
      ? value.filter((v) => v !== val)
      : [...value, val];
    onChange(newValue);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-md py-2 text-sm text-left"
      >
        <span className="truncate">
          {/* {value.length
            ? options
                .filter((opt) => value.includes(opt.value))
                .map((opt) => opt.label)
                .join(", ")
            : placeholder} */}

          {value.length > 0 ? (
            (() => {
              const selectedOptions = options?.filter((opt) =>
                value.includes(opt.value)
              );
              const first = selectedOptions[0]?.label;
              const remaining = selectedOptions.length - 1;

              return (
                <span className="flex justify-between items-center w-full">
                 <span className="max-w-[150px] truncate">{first}</span> 
                  {remaining > 0 && (
                    <span className="text-grey500 py-[2px] ml-1 px-2 mb-0 rounded-full text-xs bg-purple100">
                      +{remaining} more
                    </span>
                  )}
                </span>
              );
            })()
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </span>
        <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md border bg-white shadow-md">
          <ul className="flex flex-col gap-1 p-1">
            {options?.map((opt) => {
              const selected = value.includes(opt.value);
              return (
                <li
                  key={opt.value}
                  onClick={() => toggleOption(opt.value)}
                  className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 hover:bg-accent"
                >
                  <span className="border rounded p-[1px]">
                    <Check
                      className={cn(
                        "h-4 w-4",
                        selected ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </span>
                  <span>{opt.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
