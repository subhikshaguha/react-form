import React, { useState } from 'react';
import FormField from '../UiField/FormField';

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
    fetch("https://run.mocky.io/v3/b8b60193-2ff5-4c7b-aefe-7406e630dac8")
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
      {form?.fields?.map((field, index) => {
        return (
          <FormField key={`${field.key}${index}`} field={field} submitted={submitted} isLoading={isLoading} />
        );
      })}
      <button type="button" onClick={() => onSubmit()} disabled={!updatedFormProps.isDirty || isLoading}>
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
    </form>
  );
}

export default Form;
