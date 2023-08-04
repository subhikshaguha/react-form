import React, { useEffect, useState } from 'react';
import EditForm from '../Form/EditForm';
import Form from './Form';

const Forms = (props) => {
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({});
  const [updatedFormProps, setUpdatedFormProps] = useState({});  
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
        isMandatory: true
      },
      {
        isTextField: true,
        label: 'Last Name',
        key: 'lastName',
        isMandatory: true,
        validateOnFocusOut: true,
        minCharacterLimit: 10,
      },
      {
        isTextField: true,
        label: 'Middle Name',
        key: 'middleName',
      },
      {
        isObject: true,
        label: 'Address',
        key: 'address',
        childFieldsMetaInfo: [
          { isTextField: true, label: 'Street', key: 'street', isMandatory: true, validateOnChange: true },
          { isTextField: true, label: 'City', key: 'city' },
          { isTextField: true, label: 'State', key: 'state' },
        ]
      }
    ],
  };

  const onFormUpdate = (formProp, value) => {
    console.log('we like to cal this function', formProp, value)
    if (formProp === 'isDirty') {
      setUpdatedFormProps(prevUpdatedFormProps => ({
        ...prevUpdatedFormProps,
        isDirty: value
      }));
    }
  }

  useEffect(() => {
    // formValues
    const formVal = {
      ...formValues,
      onFormUpdate
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
        updatedFormProps={updatedFormProps}
      />
      <p>{message}</p>
    </div>
  );
};

export default Forms;
