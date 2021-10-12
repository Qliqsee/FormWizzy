import React from 'react';
import './App.css';
import { Formik } from 'formik';
import { Button } from '@mui/material';
import * as yup from 'yup';
import InputField from './InputField';
import MultiStepForm, { FormStep } from './MultiStepForm';

function App() {
  const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
  });
  return (
    <div className='App'>
      <header className='App-header'>
        <MultiStepForm
          initialValues={{
            name: '',
            email: '',
            country: '',
            street: '',
            job: '',
            position: '',
          }}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
          }}
        >
          <FormStep
            stepName='Person'
            validationSchema={validationSchema}
            onSubmit={() => console.log('Step1 submit')}
          >
            <InputField name='name' label='Name' />
            <InputField name='email' label='Email' />
          </FormStep>

          <FormStep
            stepName='Adress'
            validationSchema={yup.object({
              street: yup.string().required('Street is required'),
              country: yup.string().required('Country is required'),
            })}
            onSubmit={() => console.log('step2 submit')}
          >
            <InputField name='street' label='Street' />
            <InputField name='country' label='Country' />
          </FormStep>
          <FormStep
            stepName='Job'
            validationSchema={yup.object({
              job: yup.string().required('Job is required'),
              position: yup.string().required('Position is required'),
            })}
            onSubmit={() => console.log('step2 submit')}
          >
            <InputField name='job' label='Job' />
            <InputField name='position' label='Position' />
          </FormStep>
        </MultiStepForm>
      </header>
    </div>
  );
}

export default App;
