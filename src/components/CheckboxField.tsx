import * as React from 'react';

interface ICheckboxFieldProps {
  name: string;
  value: boolean;
  handleChange: (target: any) => void;
}

export const CheckboxField = ({
  name,
  value,
  handleChange,
}: ICheckboxFieldProps) => {
  const handleCheckboxToggle = (e: any) => {
    const target = {
      name,
      value: e.target.checked,
    };
    handleChange({ target });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '6px',
        alignItems: 'center',
        paddingTop: '6px',
        paddingBottom: '6px',
      }}
    >
      <input
        type="checkbox"
        name={name}
        onChange={handleCheckboxToggle}
        checked={value}
      />
      <label htmlFor={name}>{name}</label>
    </div>
  );
};
