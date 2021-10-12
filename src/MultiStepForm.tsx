import {
  Form,
  Formik,
  FormikConfig,
  FormikHelpers,
  FormikValues,
} from 'formik';
import React, { useState } from 'react';
import FormNav from './FormNav';
import { Stepper, Step, StepLabel } from '@mui/material';

interface Props extends FormikConfig<FormikValues> {
  children: React.ReactNode;
}

const MultiStepForm = ({ children, initialValues, onSubmit }: Props) => {
  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children) as React.ReactElement[];

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const [snapShot, setSnapShot] = useState(initialValues);

  const next = (values: FormikValues) => {
    setStepNumber(stepNumber + 1);
    setSnapShot(values);
  };
  const previous = (values: FormikValues) => {
    setSnapShot(values);
    setStepNumber(stepNumber - 1);
  };
  const handleSubmit = async (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>
  ) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values);
    }
    if (isLastStep) {
      return onSubmit(values, actions);
    } else {
      actions.setTouched({});
      next(values);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={step.props.validationSchema}
      >
        {(formik) => (
          <Form>
            <Stepper activeStep={stepNumber}>
              {steps.map((currentStep) => {
                const label = currentStep.props.stepName;

                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {step}
            <FormNav
              isLastStep={isLastStep}
              hasPrevious={stepNumber > 0}
              onBackClick={() => previous(formik.values)}
              // style={{marginTop:}}
            ></FormNav>
          </Form>
        )}
      </Formik>{' '}
    </div>
  );
};

export default MultiStepForm;

export const FormStep = ({ stepName = '', children }: any) => children;
