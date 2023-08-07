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
    form.submit().then(() => {
      setSubmitted(true);
      fetchUserData();
    }).catch(() => {
      setSubmitted(true);
    })
  };

  const fetchUserData = () => {
    setIsLoading(true);
    fetch("https://run.mocky.io/v3/3c961efc-ff85-46b3-828f-39f7d00ae557")
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
      {form?.component ? <UiDynamicForm component={form.component} form={form} /> :
        <React.Fragment>
          {form?.fields?.map((field, index) => {
            return (
              <FormField key={`${field.key}${index}`} field={field} submitted={submitted} isLoading={isLoading} />
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
