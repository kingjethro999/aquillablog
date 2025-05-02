import React, { FC } from 'react';
import { Root, Label, RadioInput } from './style';

interface RadioProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}

const Radio: FC<RadioProps> = ({ name, value, checked, onChange, label }) => {
  return (
    <Root>
      <RadioInput
        type="radio"
        id={`${name}-${value}`}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <Label htmlFor={`${name}-${value}`}>{label}</Label>
    </Root>
  );
};

export default Radio; 