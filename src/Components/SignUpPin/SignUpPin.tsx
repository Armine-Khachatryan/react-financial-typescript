import React, { useRef, useState } from 'react';
import axios from "axios";
import './SignUpPin.css';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";



interface Props {
  data?: {
    phone_number: string;
    password: string;
  };
}
export const SignUpPin: React.FC<Props> = ({ data }) => {

  console.log(data, "data loginPin")
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



  const postRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let cardNumber = pin.join('');
    try {
      let response = await axios.post("https://7369.freelancedeveloper.site/api/v1/register", {
        phone_number: data?.phone_number,
        password: data?.password,
        pin: cardNumber
      });
      navigate('/login');
      localStorage.setItem('phone_number', response.data.user.phone_number);
    } catch (error:any) {
      toast.error(
          error.response.data.message || "Something went wrong!"
      )
    }
  };

  return (
    <form action="" onSubmit={postRegister}>
       <div className='loginpin-form-group'>
        <label htmlFor="">Create a PIN</label>
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
      <button className={`next ${!isValid && "notAllowed"}`}  type={"submit"} >Next</button>
    </form>
  );
};
