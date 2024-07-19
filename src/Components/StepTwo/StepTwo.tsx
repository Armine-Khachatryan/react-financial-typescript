import React, { useRef, useState, useEffect } from 'react'
import plusIcon from "../../assets/images/plus-icon.png"
import { InputRange } from '../../UI/InputRange/InputRange';


export const StepTwo = () => {
    const [isRangeSelected, setIsRangeSelected] = useState<boolean>(false);
    const [numForms, setNumForms] = useState<number>(1);
    const [rangeValues, setRangeValues] = useState<number[]>([0]);
    const [inputChange, setInputChange] = useState<{ [key: string]: any }>([]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>,index: number)=> {
        const {name, value}=e.target;
        setInputChange(prevState => ({
            ...prevState,
            [`${name}${index}`]:value
        }))
    }

    console.log(inputChange, "inputChange")
    console.log(isRangeSelected,"isRangeSelected" );
    console.log(numForms, "numForms");
    console.log(rangeValues, "rangeValues");

    const rangeMaxValue = "50000" , rangeMinValue = "0";
    const clonedItemsRef = useRef<HTMLDivElement>(null);

    const handleRangeChange = (value: number, index: number) => {
        const newRangeValues = [...rangeValues];
        newRangeValues[index] = value;
        setRangeValues(newRangeValues);
        setIsRangeSelected(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newValue = parseInt(e.target.value.replace(/\D/g, ''), 10); // Remove non-digit characters
        const newRangeValues = [...rangeValues];
        newRangeValues[index] = newValue;
        setRangeValues(newRangeValues);
        setIsRangeSelected(true);

        if (newValue === 0) {
            newRangeValues[index] = 0;
            setRangeValues(newRangeValues);
        }
    };

    const handleAddForm = () => {
        setNumForms(numForms + 1);
        setRangeValues(prev => [...prev, 0]); // Initialize the new range value with 0
    };

    useEffect(() => {
        if (clonedItemsRef.current) {
            const { scrollHeight, clientHeight } = clonedItemsRef.current;
            if (scrollHeight > clientHeight) {
                clonedItemsRef.current.style.overflowY = 'scroll';
            } else {
                clonedItemsRef.current.style.overflowY = 'hidden';
            }
        }
    }, [numForms]);

    return (
        <div className='step-item second'>
            <div className="step-title">
                <h2>Where do you work, and your monthly salary</h2>
                <button onClick={handleAddForm}><img src={plusIcon} alt="plus icon" /></button>
            </div>
            <div ref={clonedItemsRef} className="cloned-items">
                {[...Array(numForms)].map((_, index) => (
                <div key={index} className="second-step-form">
                    <div className="step-form-item">
                    <label>Workplace</label>
                    <input type="text" className="workplace" placeholder='Select your workplace name'
                           name="workplace"
                           onChange={(e)=>handleChange(e, index)}
                    />
                    </div>
                    <div className="step-form-item">
                        <div className="toping">
                            <label>Title</label>
                            <input 
                                className={`salary-amount ${isRangeSelected ? 'active' : ''}`}
                                value={`${rangeValues[index]}$`}
                                onChange={(e) => handleInputChange(e, index)}
                                placeholder='100.000.000$' 
                                type="text"
                                // name={"title"}
                            />
                        </div>
                        <InputRange
                            value={rangeValues[index].toString()}
                            onChange={(value) => handleRangeChange(value, index)}
                            maxValue={rangeMaxValue}
                            minValue={rangeMinValue}
                        />
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}

