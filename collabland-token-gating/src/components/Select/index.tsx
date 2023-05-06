import React from 'react';

interface IOption {
  text: string;
  value: string | number;
}
interface ISelectProps {
  id?: string;
  name?: string;
  options: IOption[];
  setCurrentValue: (args: string | number) => void;
}
const Select: React.FunctionComponent<ISelectProps> = ({ id, name, options, setCurrentValue }) => {
  return (
    <select
      id={id}
      name={name}
      onChange={(e) => {
        setCurrentValue(e.target.value);
      }}
    >
      {options.map((option) => (
        <option value={option.value}>{option.text}</option>
      ))}
    </select>
  );
};

export default Select;
