import React, { useRef, useState } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

interface LoginPinProps {
    setToken: React.Dispatch<React.SetStateAction<string>>;
}

export const LoginPin = (props: LoginPinProps) => {
    const navigate = useNavigate();
    const [pin, setPin] = useState<string[]>(['', '', '', '']);
    const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newPin = [...pin];
        newPin[index] = event.target.value;
        setPin(newPin);

        if (event.target.value !== '' && index < inputRefs.length - 1) {
            inputRefs[index + 1].current?.focus();
        }
    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' && pin[index] === '') {
            if (index > 0) {
                inputRefs[index - 1].current?.focus();
            }
        }
    };

    const isValid = pin.every(digit => digit !== '');

    const postLoginPin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let pinNumber = pin.join('');
        try {
            let response = await axios.post("https://7369.freelancedeveloper.site/api/v1/login/pin", {
                phone_number: localStorage.getItem('phone_number') ,
                pin:pinNumber
            });
            localStorage.setItem("token", response.data.access_token);
            props.setToken(response.data.access_token);
            console.log(response.data, "postLoginPin");
            navigate('/steps-form');
        } catch (error:any) {
            setPin(['', '', '', ''])
            toast.error(
                error.response.data.message || "Something went wrong!"
            )
        }
    };
    return (
        <form action="" onSubmit={postLoginPin}>
            <div className='loginpin-form-group'>
                <label htmlFor="">Pin</label>
                <div className="pin-inputs">
                    {pin.map((digit, index) => (
                        <input
                            key={index}
                            type="password"
                            value={digit}
                            maxLength={1}
                            onChange={(e) => handleInputChange(index, e)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            ref={inputRefs[index]}
                        />
                    ))}
                </div>
            </div>
            <button className={`next ${!isValid && "notAllowed"}`}  type={"submit"}>Login</button>
        </form>
    );
};
