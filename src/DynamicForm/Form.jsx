import React, { useState } from 'react';
import { TextFieldInput } from '../InputField/TextField';


function Form(props) {
  const { form } = props;
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const onSubmit = () => {
    if (submitted) {
      setSubmitted(false);
    }
    form.submit().then(() => {
      setSubmitted(true);
      fetchUserData();
    }).catch(() => {
      setSubmitted(true);
    })
  };

  const fetchUserData = () => {
    setIsLoading(true);
    fetch("https://run.mocky.io/v3/c72e27bc-e257-4a0e-8fce-738da6c13fe3")
      .then(response => {
        return response.json()
      })
      .then(data => {
        let dataSource = data?.steps?.[0].data;
        form.setDataSource(dataSource);
        form.copyFromDataSource();
        setIsLoading(false);
      })
  };

  const fieldUpdated = () => {
    const isDirty = form.isFormDirty?.();
    setIsDirty(isDirty);
  }
  return (
    <form className="Form">
      {form?.fields?.map((field) => {
        let ComponentVal = TextFieldInput;
        if (field.isTextField) {
          ComponentVal = TextFieldInput;
        }
        return (
          <div>{field?.isTextField && <ComponentVal field={field} fieldUpdated={fieldUpdated} submitted={submitted} isLoading={isLoading} />}</div>
        );
      })}
      <button type="button" onClick={() => onSubmit()} disabled={!isDirty || isLoading}>
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
    </form>
  );
}

export default Form;
