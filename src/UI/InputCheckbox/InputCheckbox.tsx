import React, { useState,useEffect  } from 'react'

interface IInputCheckboxProps {
    children: string;
    value: string;
    type?: React.HTMLInputTypeAttribute;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export const InputCheckbox = (props: IInputCheckboxProps) => {
    const { children, value, type="radio", name, checked , onChange } = props;
    const [isChecked, setIsChecked] = useState<boolean>(checked);

    // const handleOnChange = () => {
    //     setIsChecked(!isChecked);
    //     onChange(value);
    // };

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    return (
        <label className="label-container">
            {children}
            <input
                type={type}
                value={value}
                name={name}
                onChange={onChange}
            />
            <span className="checkmark"></span>
        </label>
    )
}
