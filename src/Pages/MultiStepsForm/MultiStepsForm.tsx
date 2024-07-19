import React, { useRef } from 'react'
import './multisteps.css'
import MultiStep from 'react-multistep';
import { StepOne } from '../../Components/StepOne/StepOne';
import { StepTwo } from '../../Components/StepTwo/StepTwo';
import { StepThree } from '../../Components/StepThree/StepThree';
import { StepFour } from '../../Components/StepFour/StepFour';



export const MultiStepsForm = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const steps: { name: string; component: JSX.Element }[] = [
        { name: 'Step One', component: <StepOne /> },
        { name: 'Step Two', component: <StepTwo /> },
        { name: 'Step Three', component: <StepThree /> },
        { name: 'Step Four', component: <StepFour /> },
    ];

    console.log(formRef, formRef)


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formRef.current) {
            const formData = new FormData(formRef.current);
            console.log(formData, "form submitted")
            // Do something with formData, such as sending it to a server
            // Example:
            // fetch('/submit-form', {
            //   method: 'POST',
            //   body: formData
            // })
            // .then(response => response.json())
            // .then(data => console.log(data))
            // .catch(error => console.error('Error:', error));
        }
    };

    return (
        <div className="multisteps-form">
            <div className='main-container'>
                <div className="title">
                    <h1>Multiform Steps Questions</h1>
                    <span>Give 5 min from your time to have a better imagination of your expenses or skip</span>
                </div>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="form-steps">
                        {/*<style>{customStyles}</style>*/}
                        <MultiStep
                            // showNavigation={true}
                            steps={steps}
                            // activeStep={0}
                        />
                    </div>
                </form>
            </div>
        </div>

    )
}
