import React, { useState } from 'react'
import { InputRange } from '../../UI/InputRange/InputRange';
import { InputCheckbox } from '../../UI/InputCheckbox/InputCheckbox';
import {Checkbox} from "../../UI/Checkbox/Checkbox";

export const StepThree = () => {
    const [isRangeSelected, setIsRangeSelected] = useState<boolean>(false);
    const [rangeValue, setRangeValue] = useState<number>(0);
    const [body, setBody] = useState<{ [key: string]: string }>({});

    const handleOptionChange = (name: string, body: string) => {
        setBody(prevState => ({
            ...prevState,
            [name]: body
        }));
    };

    const rangeMaxValue = "50000";
    const rangeMinValue = "0";

    const handleRangeChange = (value: number) => {
        setRangeValue(value);
        setIsRangeSelected(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value.replace(/\D/g, ''), 10); // Remove non-digit characters
        setRangeValue(newValue);
        setIsRangeSelected(true);

        if (newValue == 0) {
            setRangeValue(0);
        }
    };

  return (
    <div className='step-list'>
    <div className='step-item'>
        <div className="step-title">
            <h2>Do you rent a house?</h2>
        </div>
        <div className="checkbox-list rentHouse">
            <div className="checkbox-item">
                <Checkbox
                    rounded={true}
                    name={"rentHouse"}
                    value="yes"
                    checked={body["rentHouse"] === 'yes'}
                    onChange={(event) => handleOptionChange(event.target.name, event.target.value)}
                    label="Yes"
                />
                <Checkbox
                    rounded={true}
                    name={"rentHouse"}
                    value="no"
                    checked={body["rentHouse"] === 'no'}
                    onChange={(event) => handleOptionChange(event.target.name, event.target.value)}
                    label="No"
                />
            </div>
            { body["rentHouse"] === 'yes' &&
             <div className="second-step-form">
                <div className="step-form-item">
                    <div className="toping">
                        <label>Title</label>
                        <input 
                            className={`salary-amount ${isRangeSelected ? 'active' : ''}`}
                            value={`${rangeValue}$`}
                            onChange={handleInputChange}
                            placeholder='100.000.000$' 
                            type="text" 
                        />
                    </div>
                    <InputRange
                        value={rangeValue.toString()}
                        onChange={handleRangeChange}
                        maxValue={rangeMaxValue}
                        minValue={rangeMinValue}
                    />
                </div>
            </div>
            }
        </div>
    </div> 
    <div className='step-item'>
        <div className="step-title">
            <h2>Do you have a car?</h2>
        </div>
        <div className="checkbox-list">
            <div className="checkbox-item">
                <Checkbox
                    rounded={true}
                    name={"haveCar"}
                    value="yes"
                    checked={body["haveCar"] === 'yes'}
                    onChange={(event) => handleOptionChange(event.target.name, event.target.value)}
                    label="Yes"
                />
                <Checkbox
                    rounded={true}
                    name={"haveCar"}
                    value="no"
                    checked={body["haveCar"] === 'no'}
                    onChange={(event) => handleOptionChange(event.target.name, event.target.value)}
                    label="No"
                />
            </div>
        </div>
    </div> 
    </div>
    
  )
}
