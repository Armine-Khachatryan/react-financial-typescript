import React, { useState } from 'react';
import "./formik.css";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { StepOne } from '../../Components/StepOne/StepOne';
import { StepTwo } from '../../Components/StepTwo/StepTwo';
import { StepThree } from '../../Components/StepThree/StepThree';
import { StepFour } from '../../Components/StepFour/StepFour';
import { StepsNavigation } from '../../Components/StepsNavigation/StepsNavigation';
import { Navigation } from '../../Components/Navigation/Navigation';


export const FormikExample = () => {
  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState(new Set<number>());
  console.log(step, "step")
    console.log(completedSteps, "completedSteps")

  const goToNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const goToPrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const goToStep = (step: number) => {
    setStep(step);
  };

  const isFirstStep = step === 1, isLastStep = step === 4;

  return (
    <div className="multisteps-form">
        <div className='main-container'>
            <div className="title">
                <h1>Multiform Steps Questions</h1>
                <span>Give 5 min from your time to have a better imagination of your expenses or skip</span>
            </div>
            <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: ''
            }}
            onSubmit={(values) => {
                console.log(values);
            }}
            >
            {({ isSubmitting, values }) => (
                <Form className='form'>
                    <Navigation
                      goToNextStep={goToNextStep}
                      goToPrevStep={goToPrevStep}
                      isFirstStep={isFirstStep}
                      isLastStep={isLastStep}
                      completedSteps={completedSteps}
                      goToStep={goToStep}
                      currentStep={step}
                    />
                    {step === 1 && <StepOne />}
                    {step === 2 && <StepTwo />}
                    {step === 3 && <StepThree />}
                    {step === 4 && <StepFour />}
                </Form>
            )}
            </Formik>
            </div>
    </div>
  );
};
