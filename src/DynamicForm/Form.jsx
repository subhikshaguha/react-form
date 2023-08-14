import React, { useState } from 'react';
import FormField from '../UiField/FormField';
import UiDynamicForm from './UiDynamicForm';

function Form(props) {
  const { form, updatedFormProps } = props;
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    if (submitted) {
      setSubmitted(false);
    }
    form.submit().then(async() => {
      setSubmitted(true);
      await fetchUserData();
      setSubmitted(false);
    }).catch(() => {
      setSubmitted(true);
    })
  };

  const fetchUserData = () => {
    setIsLoading(true);
    // https://run.mocky.io/v3/7c368ee5-f390-4feb-a3bc-1a3e55393287 - error
    // https://run.mocky.io/v3/3c961efc-ff85-46b3-828f-39f7d00ae557 - success
    fetch("https://run.mocky.io/v3/7c368ee5-f390-4feb-a3bc-1a3e55393287")
      .then(response => {
        return response.json()
      })
      .then(data => {
        if (data?.steps?.[0]?.data) {
          let dataSource = data?.steps?.[0].data;
          form.setDataSource(dataSource);
          form.copyFromDataSource();
          setIsLoading(false);
        } else if (data?.errors) {
          data.status = 422;
          form.populateErrors(data);
          setIsLoading(false);
        }
      })
  };

  return (
    <form className="Form">
      {form?.component ? <UiDynamicForm component={form.component} form={form} /> :
        <React.Fragment>
          {form?.fields?.map((field, index) => {
            return (
              <FormField key={`${field.key}${index}`} field={field} />
            );
          })}
        </React.Fragment>
      }
      <button type="button" onClick={() => onSubmit()} disabled={!updatedFormProps.isDirty || isLoading}>
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
    </form>
  );
}

export default Form;
