import { useEffect, useState } from "react";
import Select, { components } from "react-select";
import { Check } from "lucide-react"; // or any check icon from your icon library

const MultiSelect = ({ options, defaultSelected, label, onChange }: any) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    // Set default selected options when the component mounts
    if (defaultSelected) {
      setSelectedOptions(
        options.filter((option: any) => defaultSelected.includes(option.value))
      );
    }
  }, [defaultSelected, options]);

  const handleChange = (selected: any) => {
    setSelectedOptions(selected);
    onChange && onChange(selected.map((option: any) => option.value)); // Return only values on change
  };

  // Custom Option with check icon for selected items
  const CustomOption = (props: any) => {
    return (
      <components.Option {...props}>
        <div className="flex items-center relative">
          {props.isSelected && (
            <Check size={16} style={{ position: "absolute", right: "10px" }} />
          )}
          <span>{props.label}</span>
        </div>
      </components.Option>
    );
  };

  return (
    <div>
      <label className="block text-xs font-medium text-[#3A3F42] mb-1">
        {label}
      </label>
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        components={{
          Option: CustomOption,
          MultiValueRemove: () => null, // Remove the close icon
        }}
        hideSelectedOptions={false}
        closeMenuOnSelect={false}
        styles={{
          control: (base:any) => ({
            ...base,
            borderColor: "#ccc",
            "&:hover": { borderColor: "#aaa" },
            height: "46px",
            borderRadius: "0.375rem",
            maxHeight: "60px",
            overflowY: "auto",
          }),
          option: (base:any, state:any) => ({
            ...base,
            backgroundColor: state.isSelected
              ? "transparent"
              : base.backgroundColor, // No background color on select
            color: state.isSelected ? "#333" : base.color, // Maintain consistent color
            cursor: "pointer",
          }),
        }}
      />
    </div>
  );
};

export default MultiSelect;
