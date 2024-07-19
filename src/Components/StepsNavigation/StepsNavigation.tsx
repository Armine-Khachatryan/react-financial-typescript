import React from 'react'
import "./stepsNavigation.css"
import startActive from '../../assets/images/icons/start-step-icon.png'
import financeIcon from '../../assets/images/icons/finance-icon.png'
import financeIconActive from '../../assets/images/icons/Finance_ selected.png'
import rentStepsIcon from '../../assets/images/icons/rent-steps-icon.png'
import rentStepsIconActive from '../../assets/images/icons/Rent_ selected.png'

interface StepsNavigationProps {
    completedSteps: Set<number>;
    currentStep: number;
}

export const StepsNavigation = (props: StepsNavigationProps) => {
    const { completedSteps, currentStep } = props;

    const isStepCompleted = (step: number) => completedSteps.has(step);
    console.log(completedSteps, currentStep, 1111111)

    return (
        <div className='steps'>
            <button 
                className={currentStep === 1 ? 'completed' : ''}
                disabled={!isStepCompleted(1)}>
                <div>
                    <span>Start</span>
                    <div className={`icon-start ${currentStep === 1 ? 'completed' : ''}`}></div>
                </div>
            </button>
            <button  
                className={currentStep === 2 ? 'completed' : ''}
                disabled={!isStepCompleted(2)}>
                <div>
                    <span>Finance</span>
                    <div className={`icon-finance ${currentStep === 2 ? 'completed' : ''}`}></div>
                </div>
            </button>
            <button  
                className={currentStep === 3 ? 'completed' : ''}
                disabled={!isStepCompleted(3)}>
                <div>
                    <span>Rent</span>
                    <div className={`icon-rent ${currentStep === 3 ? 'completed' : ''}`}></div>
                </div>
            </button>
            <button  
                className={currentStep === 4 ? 'completed' : ''}
                disabled={!isStepCompleted(4)}>
                <div>
                    <span>Question</span>
                    <div className={`circle ${currentStep === 4 ? 'completed' : ''}`}></div>
                </div>
            </button>
        </div>
    );
};