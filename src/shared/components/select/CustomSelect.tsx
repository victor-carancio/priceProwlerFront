import { SelectContainer, StyledSelect } from "./CustomSelect.styles";

interface SelectProps {
  name?: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void; //(value: string) => void;
  placeholder?: string;
  autosize?: boolean;
}

const CustomSelect = ({
  name,
  options,
  value,
  onChange,
  placeholder,
  autosize,
}: SelectProps) => {
  return (
    <SelectContainer $autoSize={autosize}>
      <StyledSelect
        value={value}
        onChange={(e) => onChange(e)}
        name={name ? name : ""}
        data-testid={`${name}-select`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </StyledSelect>
    </SelectContainer>
  );
};

export default CustomSelect;
