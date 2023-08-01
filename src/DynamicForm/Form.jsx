import React, { useState, useEffect } from 'react';
// import { FormContext } from './FormContext';
// import FormInput from './Field/BaseField';
import { TextFieldInput } from '../InputField/TextField';
import { BaseField } from '../InputField/BaseField';

const components = {
  text: BaseField,
};

function Form(props) {
  const { submit = () => {}, initialValues, formValues, form } = props;
  const [submitted, setSubmitted] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const onSubmit = () => {
    if (submitted) {
      setSubmitted(false);
    }
    form.submit().then(() => {
      setSubmitted(true);
    }).catch(() => {
      setSubmitted(true);
    })
    // if (errors?.length === 0) {
    //   submit(form);
    // }
    // let errorsVal = {};
    // formComponents.forEach((input) => {
    //   const error = input?.validate(form[input.name], errors);
    //   errorsVal[input.name] = error;
    // });
    // setErrors({
    //   ...errors,
    //   ...errorsVal,
    // });
  };

  const fieldUpdated = () => {
    const isDirty = form.isFormDirty?.();
    setIsDirty(isDirty);
  }
  return (
    <form className="Form">
      {form?.fields?.map((field) => {
        let ComponentVal = TextFieldInput(BaseField);
        if (field.isTextField) {
          ComponentVal = TextFieldInput(BaseField);
        }
        return (
          <div>{field?.isTextField && <ComponentVal field={field} fieldUpdated={fieldUpdated} submitted={submitted} />}</div>
        );
      })}
      {isDirty && <div>Form is dirty</div>}
      <button type="button" onClick={() => onSubmit()}>
        Submit
      </button>
    </form>
  );
}

export default Form;
