import * as React from 'react';
import { getColorLabel, isAvaneraColor } from '../App';

interface ISelectFieldProps {
  name: string;
  options: any[];
  label?: string;
  value?: string;
  handleChange: (target: any) => void;
}

export const SelectField = ({
  name,
  options,
  handleChange,
  label,
  value,
}: ISelectFieldProps) => {
  const getOptionLabel = (colorValue: string) =>
    isAvaneraColor(colorValue)
      ? getColorLabel(colorValue)
      : colorValue.startsWith('#')
      ? 'Custom'
      : null;

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', marginBottom: '6px' }}
    >
      <label>{name}</label>
      <select name={name} onChange={handleChange} value={value}>
        {options.map((option: string, index: number) => (
          <option key={index} value={option} label={getOptionLabel(option)}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
