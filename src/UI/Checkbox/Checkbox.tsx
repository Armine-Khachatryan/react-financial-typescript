import React, { useEffect, useState } from "react";
import s from "./Checkbox.module.css";
import roundedStyles from "./rounded.module.css";

interface CheckboxProps {
    label: string;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    rounded?: boolean;
    className?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    [key: string]: any;
}

export const Checkbox: React.FC<CheckboxProps> = ({
                                                      label,
                                                      disabled = false,
                                                      onChange = () => {},
                                                      name,
                                                      rounded = false,
                                                      className,
                                                      checked,
                                                      defaultChecked,
                                                      ...props
                                                  }) => {
    const [value, setValue] = useState<boolean | undefined>(checked);

    useEffect(() => {
        setValue(checked);
    }, [checked]);

    if (rounded) {
        return (
            <label className="label-container">
                {label}
                <input
                    type="checkbox"
                    checked={!!value}
                    name={name}
                    onChange={onChange}
                    {...props}
                />
                <span className="checkmark"></span>
            </label>
        );
    }

    return (
        <div className={s.container}>
            <label
                className={[
                    s["form-control"],
                    disabled ? s["form-control--disabled"] : "",
                    rounded ? s["checkbox-round"] : "",
                    className,
                ].join(" ")}
            >
                <input
                    type="checkbox"
                    name={name}
                    checked={!!value}
                    disabled={disabled}
                    defaultChecked={defaultChecked}
                    onChange={(e) => onChange(e)}
                    {...props}
                />
                <span>{label} </span>
            </label>
        </div>
    );
};

