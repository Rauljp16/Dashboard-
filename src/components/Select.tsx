import React, { ChangeEvent } from 'react';

interface SelectProps {
  options: string[];
  onChange: (value: string) => void;
}

function Select({ options, onChange }: SelectProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select onChange={handleChange}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Select;
