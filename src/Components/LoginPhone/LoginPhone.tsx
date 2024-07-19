import React, { useState } from 'react'
import "../../Pages/Login/login.css"

const countryCodes = [
    { code: '+44', country: 'UK' },
    { code: '+1', country: 'USA' },
    { code: '+374', country: 'USA' },
    { code: '+222', country: 'USA' },
    { code: '+141', country: 'USA' },
    { code: '+1', country: 'USA' },
    // Add more country codes as needed
];

export const LoginPhone = () => {
    const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
    const [isPhoneNumberEntered, setIsPhoneNumberEntered] = useState(false); // Track if phone number is entered
    const [hideBtnClicked, setHideBtnClicked] = useState(false); // Track if hide button is clicked
    const[stepOneActive, setStepOneActive] = useState(false);


    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const countryCode = event.target.value;
        const selected = countryCodes.find((country) => country.code === countryCode);
        if (selected) {
            setSelectedCountry(selected);
        }
    };

    const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputPhoneNumber = event.target.value;
        const phonePattern = /^(?!.*[-e])\d{7,}$/;
        if (phonePattern.test(inputPhoneNumber)) {
          setIsPhoneNumberValid(true);
          setPhoneNumber(inputPhoneNumber);
          setIsPhoneNumberEntered(true);
        } else {
          setIsPhoneNumberValid(false);
        }
      };

  return (
    <div className="form-group">
    <div className='form-group-item'>
      <div className='country-code'>
        <label htmlFor="">Code/ID</label>
        <select value={selectedCountry.code} onChange={handleCountryChange}>
          {countryCodes.map((country) => (
            <option key={country.code} value={country.code}>
              {`${country.code}`}
            </option>
          ))}
        </select>
      </div>
      <div className="phone-number">
        <label htmlFor="">Mobile number</label>
        <input
          type="number"
          onChange={handlePhoneNumberChange}
          onKeyDown={e => (e.keyCode === 69 || e.keyCode === 109 || e.keyCode === 189) && e.preventDefault()} />
      </div>
    </div>
    <button className={`hide-btn ${stepOneActive ? 'hidden' : ''}`} onClick={() => {setStepOneActive(true); setHideBtnClicked(true);}}>Next</button>
  </div>
  )
}
