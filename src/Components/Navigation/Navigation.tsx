import React from 'react'
import "../../Pages/Formik/formik.css";
import { StepsNavigation } from '../StepsNavigation/StepsNavigation';
import { useNavigate } from 'react-router-dom';

interface NavigationProps {
    goToNextStep: () => void;
    goToPrevStep: () => void;
    isFirstStep: boolean;
    isLastStep: boolean;
    completedSteps: Set<number>;
    goToStep: (step: number) => void;
    currentStep: number;
  }

export const Navigation = (props: NavigationProps) => {
    const { goToNextStep, goToPrevStep, isFirstStep, isLastStep, completedSteps, goToStep, currentStep } = props;
    const navigate = useNavigate();
    // console.log(currentStep, "currentStep")
    // console.log(completedSteps, "completedSteps")

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        navigate('/');
    }
    return (
        <div className='navigation'>
            <StepsNavigation completedSteps={completedSteps} currentStep={currentStep} />
            <div className='form-buttons'>
                {!isFirstStep && <button onClick={goToPrevStep}>Prev</button>}
                {!isLastStep && <button onClick={goToNextStep}>Next</button>}
                {isLastStep && <button type='submit' onClick={handleSubmit}>Submit</button>}
            </div>
        </div>
    )
}


