import React, { useState } from 'react';
import { TextFieldInput } from '../InputField/TextField';
import { BaseField } from '../InputField/BaseField';

const components = {
  text: BaseField,
};

function Form(props) {
  const { form } = props;
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
      <button type="button" onClick={() => onSubmit()} disabled={!isDirty}>
        Submit
      </button>
    </form>
  );
}

export default Form;
