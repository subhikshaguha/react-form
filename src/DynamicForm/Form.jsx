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

  // const [form, setForm] = useState(initialValues);
  const [formComponents, setFormComponents] = useState([]);
  const [submitted, setSubmitted] = useState(false);
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

  // useEffect(() => {
  //   let arr = [];
  //   formValues?.forEach((element) => {
  //     const component = components[element.type];
  //     const RenderComponent = TextInputField(component);
  //     const [{ ...textField }] = useTextField(setForm, setErrors, element);
  //     arr.push({ component: RenderComponent, ...textField });
  //   });
  //   setFormComponents(arr);
  // }, []);

  return (
    <form className="Form">
      {form?.fields?.map((field) => {
        let ComponentVal = TextFieldInput(BaseField);
        if (field.isTextField) {
          ComponentVal = TextFieldInput(BaseField);
        }
        return (
          <div>{field?.isTextField && <ComponentVal field={field} submitted={submitted} />}</div>
        );
      })}

      <button type="button" onClick={() => onSubmit()}>
        Submit
      </button>
    </form>
  );
}

export default Form;
