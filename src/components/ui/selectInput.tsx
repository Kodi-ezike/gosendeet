import * as React from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { FaAngleDown } from "react-icons/fa6";
import { cls } from "@/lib/utils";
import { optionProps } from "@/lib/types";

type Props = {
  label?: string;
  register?: Function;
  required?: boolean;
  name?: string;
  hasError?: any;
  error?: string;
  classes?: any;
  type?: string;
  autocomplete?: string;
  errorMessage?: string;
  placeholder?: string;
  size: string;
  variant: string;
  labelPlacement?: string;
  options: optionProps[];
  selectedKey?: string | null;
  onSelectionChange?: (e: any) => void;
  isLoading?: boolean;
};

const SelectInput = React.forwardRef<HTMLSelectElement, Props>(
  (
    {
      label,
      register,
      required,
      name,
      hasError,
      error,
      type,
      classes,
      autocomplete,
      errorMessage,
      placeholder,
      variant,
      labelPlacement,
      size,
      options,
      selectedKey,
      onSelectionChange,
      isLoading,
      ...rest
    },
    ref
  ) => {
    const [currentSelectedKey, setCurrentSelectedKey] = React.useState<string | null>(selectedKey || "");

    // Sync state with selectedKey prop when it changes
    React.useEffect(() => {
      if (selectedKey !== undefined && selectedKey !== currentSelectedKey) {
        setCurrentSelectedKey(selectedKey);
      }
    }, [selectedKey]);

    const handleChange = (e: any) => {
      setCurrentSelectedKey(e);
      onSelectionChange?.(e); // Trigger parent onSelectionChange if provided
    };

    return (
      <div>
        <Autocomplete
          label={label || undefined}
          aria-label={label || placeholder || "Select option"}
          variant={variant}
          placeholder={placeholder}
          labelPlacement={labelPlacement}
          className="text-sm font-medium text-gray bg-none"
          radius="none"
          size={size}
          color="#FFFFFF"
          selectorIcon={<FaAngleDown />}
          selectedKey={currentSelectedKey}
          onSelectionChange={handleChange}
          isLoading={isLoading}
          inputProps={{
            classNames: {
              base: "rounded-md hover:bg-white focus:bg-white",
              input: cls(
                "hover:bg-white focus:bg-white py-0 w-full",
                `${classes}`
              ),
              innerWrapper: "bg-white hover:bg-white focus:bg-white",
              mainWrapper: "hover:bg-white focus:bg-white",
              inputWrapper: cls(
                "bg-white rounded-md border border-[#BBBABA] hover:bg-white focus:bg-white",
                `${classes}`
              ),
            },
          }}
          {...register?.(name, { required })}
          classNames={{
            base: "w-full mb-1 placeholder:text-sm placeholder:text-gray-700 text-sm font-medium text-gray capitalize hover:bg-white",
            listboxWrapper: "rounded-none bg-none hover:bg-white",
            listbox:
              "w-full p-0 rounded-none data-[hover=true]:bg[#FF0000] data-focus-[filled=true]:rounded-none border border-[#232B30] hover:bg-white",
            label:
              "group-data-[filled=true]:text-sm group-data-[filled=true]:font-medium text-gray group-data-[filled=true]:text-gray capitalize hover:bg-white",
            popoverContent: "rounded-none bg-none",
          }}
          ref={ref}
          {...rest}
        >
          {options?.map((option) => (
            <AutocompleteItem key={option.key} value={option.label}>
              {option.label}
            </AutocompleteItem>
          ))}
        </Autocomplete>

        {errorMessage && (
          <p className="capitalize text-[12px] text-[#FF0000]">{errorMessage}</p>
        )}
      </div>
    );
  }
);
SelectInput.displayName = "SelectInput";

export { SelectInput };
