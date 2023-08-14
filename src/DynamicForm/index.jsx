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
    component: './AddReply.jsx',
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
        minCharacterLimit: 5,
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
          {
            isTextField: true, 
            label: 'Street', 
            key: 'street',
            isMandatory: true,
            validateOnChange: true
          },
          { 
            isObject: true,
            label: 'City',
            key: 'city',
            childFieldsMetaInfo: [
              { isTextField: true, label: 'Name', key: 'name', isMandatory: true },
              { isTextField: true, label: 'Code', key: 'code' },
            ]
          },
          { isTextField: true, label: 'State', key: 'state' },
        ]
      },
      {
        isArray: true,
        label: 'Phones',
        key: 'phones',
        childFieldsMetaInfo: {
          isObject: true, 
          label: 'Phone', 
          key: 'phone',
          childFieldsMetaInfo: [
            { isTextField: true, label: 'Number', key: 'number', isMandatory: true },
            { isTextField: true, label: 'Type', key: 'type' },
          ]
        }
      }
    ],
  };

  /*const formValues = {
    stepType: 'add_reply',
    application: 'happyfox',
    component: './AddReply.jsx',
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
          {
            isTextField: true, 
            label: 'Street', 
            key: 'street',
            isMandatory: true,
            validateOnChange: true
          },
          { isTextField: true, label: 'State', key: 'state' },
        ]
      }
    ],
  }; */

  const onFormUpdate = (formProp, value) => {
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
      dataSource: {
        firstName: "text",
        middleName: "some name",
        update_contact: true,
        address: {
            street: "wilford",
            city: {
                name: "street"
            }
        },
        phones: [
            {
                type: "mobile",
                number: ""
            }
        ]
      },
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
