import * as React from 'react';
import './style.css';
import InputComponent from './Input';
import Form from './DynamicForm';

// form instance will have list of field instances in say `fields`

/*
{
   "address": {
     "line_1": "",
     "line_2": ""
   },
   "phones": [{
     "type": "",
     "number": "",
     "country_code": ""
   }]
}

*/

/*

[{
  "type": 'text',
  "key": 'name'
}, {
  "type": "object"
  "key": "address", 
  "rawFields": [{
    "type": "text",
    "key": "line_1"
  }]
}]

*/
/*
class BaseForm {
  copyFromDataSource();

  copyToDataSource();

  populateErrors();

  isDirty() {}
}

class BaseField {
  // Copy over what is configured and returned in the baseField function
}

class TextField extends BaseField {}

class ObjectField extends BaseField {}

function baseField() {
  const field = {
    value: null,
    _initialValue: null,
    _cleanValue: null,
    defaultValue: null,
    label: null,
    errors: null,
    isMandatory: false,
    isDisabled: false,
    key: null,
  };

  const validate = () => {
    return new Promise((resolve, reject) => {
      this.resetErrors();
      // Mandatory check.
      if (this.isMandatory) {
        if (!this.value) {
          this.addErrors('This field is required');
          reject(this.errors);
        } else {
          resolve(this.value);
        }
      } else {
        resolve(this.value);
      }
    });
  };

  const addErrors = (error) => {
    this.errors.push(error);
  };

  const isDirty = () => {
    return this.value !== this.initialValue;
  };

  const updateValue = (value) => {
    this.value = value;
  };

  return {
    ...field,
    validate,
    addErrors,
    isDirty,
    updateValue,
  };
}
*/
class Field {
  // have a constructor here and initialize stuff
  value = 'New';
  initialValue = 'New';
  errors = [];
  validateOnChange = true;
  isDirty() {
    return this.value !== this.initialValue;
  }
  validate() {
    console.log(this.isDirty());
    if (this.value.length > 5) {
      this.errors.push('New Error');
    } else {
      this.errors = [];
    }
  }
}

export default function App() {
  // Use rawField to call constructor
  const myFieldInstance = new Field();
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <InputComponent field={myFieldInstance} />
      <Form />
    </div>
  );
}
