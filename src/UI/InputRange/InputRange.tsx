import React, { useState } from 'react'

interface IInputRangeProps {
    maxValue: string;
    minValue: string;
    value: string;
    onChange: (value: number) => void;
}

export const InputRange = (props: IInputRangeProps) => {
    const { maxValue, minValue, value, onChange } = props;

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value, 10); // Convert value to number
        onChange(newValue);
    };

  return (
    <>
     <input
        type='range'
        min={minValue}
        max={maxValue}
        value={value}
        onChange={handleOnChange}
        className='custom-slider'>
    </input> 
    </>
  )
}
