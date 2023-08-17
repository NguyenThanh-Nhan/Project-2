import { useState } from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
import { ChevronDown } from "../icons";
import "./styleselect.css"
import "./dropdown.css";


interface DropdownProps {
  className?: string;
  options: SelectProps["options"];
  placeholder?: string;
  value?: any;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  mode?: "multiple" | "tags" | undefined;
}

const Dropdown: React.FC<DropdownProps> = ({
  className,
  options,
  value,
  placeholder,
  onChange,
  mode,
  ...props
}) => {
  const [select] = useState<any>(() => {
    let initialValue;
    if (options) {
      initialValue = options[0]?.label;
    }
    if (placeholder) initialValue = undefined;
    return initialValue;
  });
  return (
    <div className="wrapper_dropdow">
      <Select
        mode={mode}
        options={options}
        className="select"
        defaultValue={select}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        suffixIcon={<ChevronDown className="icon" />}
        {...props}
      />
    </div>
  );
};

export default Dropdown;
