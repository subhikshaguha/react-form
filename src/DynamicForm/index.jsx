import React, { useEffect, useState } from 'react';
import EditForm from '../Form/EditForm';
import Form from './Form';

const Forms = (props) => {
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({});
  const initialValues = {
    firstName: 'Text',
    lastName: '',
    middleName: '',
  };

  const submit = (form) => {
    // console.log('form is tested here');
  };

  const formValues = {
    stepType: 'add_reply',
    application: 'happyfox',
    rawFields: [
      {
        isTextField: true,
        label: 'First Name',
        key: 'firstName',
      },
      {
        isTextField: true,
        label: 'Last Name',
        key: 'lastName',
      },
      {
        isDynamicField: true,
        label: 'Middle Name',
        key: 'middleName',
      },
    ],
  };

  useEffect(() => {
    // formValues
    const formVal = {
      ...formValues
    }
    let formInstance = new EditForm(formVal);
    setForm(formInstance);
  }, []);

  return (
    <div className="App">
      <h1>Add reply</h1>

      <Form
        submit={submit}
        initialValues={initialValues}
        formValues={formValues}
        form={form}
      />
      <p>{message}</p>
    </div>
  );
};

export default Forms;
