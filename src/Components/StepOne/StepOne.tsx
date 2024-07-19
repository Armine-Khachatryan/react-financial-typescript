import React, { useState } from 'react';
import { Checkbox } from "../../UI/Checkbox/Checkbox";

export const StepOne: React.FC = () => {
    const [body, setBody] = useState<{ [key: string]: string }>({});

    const handleOptionChange = (name: string, body: string) => {
        setBody(prevState => ({
            ...prevState,
            [name]: body
        }));
    };
    console.log(body, "body")

    return (
        <div className='step-item'>
            <div className="step-title">
                <h2>Do you want to start?</h2>
            </div>
            <div className="checkbox-list">
                <div className="checkbox-item">
                    <Checkbox
                        rounded={true}
                        name={"wantStart"}
                        value="want/yes"
                        checked={body["wantStart"] === 'want/yes'}
                        onChange={(event) => handleOptionChange(event.target.name, event.target.value)}
                        label="Want"
                    />
                    <Checkbox
                        rounded={true}
                        name={"wantStart"}
                        value="skip/no"
                        checked={body["wantStart"] === 'skip/no'}
                        onChange={(event) => handleOptionChange(event.target.name, event.target.value)}
                        label="Skip"
                    />
                </div>
            </div>
            {/*<div className="step-title">*/}
            {/*    <h2>Do you want to continue?</h2>*/}
            {/*</div>*/}
            {/*<div className="checkbox-list">*/}
            {/*    <div className="checkbox-item">*/}
            {/*        <Checkbox*/}
            {/*            rounded={true}*/}
            {/*            name={"question2"}*/}
            {/*            value="option1"*/}
            {/*            checked={body["question2"] === 'option1'}*/}
            {/*            onChange={(event) => handleOptionChange(event.target.name, event.target.value)}*/}
            {/*            label="Option 1"*/}
            {/*        />*/}
            {/*        <Checkbox*/}
            {/*            rounded={true}*/}
            {/*            name={"question2"}*/}
            {/*            value="option2"*/}
            {/*            checked={body["question2"] === 'option2'}*/}
            {/*            onChange={(event) => handleOptionChange(event.target.name, event.target.value)}*/}
            {/*            label="Option 2"*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

