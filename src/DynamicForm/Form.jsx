import React, { useState } from 'react';
import { TextFieldInput } from '../InputField/UiTextField';


function Form(props) {
  const { form, updatedFormProps } = props;
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <form className="Form">
      {form?.fields?.map((field) => {
        let ComponentVal = TextFieldInput;
        if (field.isTextField) {
          ComponentVal = TextFieldInput;
        }
        return (
          <div>{field?.isTextField && <ComponentVal field={field} submitted={submitted} isLoading={isLoading} />}</div>
        );
      })}
      <button type="button" onClick={() => onSubmit()} disabled={!updatedFormProps.isDirty || isLoading}>
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
    </form>
  );
}

export default Form;
