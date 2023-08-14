import React, { useEffect } from 'react';
import FormField from '../UiField/FormField';

const AddReply = ({ form }) => {
  const [arrayField, setArrayField] = React.useState(form.model?.phones?.length);
  const addNewChildField = (e, formPhones) => {
    e.preventDefault();
    let phones = formPhones.addNewChildField();
    setArrayField(phones.length);
  };

  const removeChildField = (e, index, formPhones) => {
    e.preventDefault();
    let phones = formPhones.removeChildField(index);
    setArrayField(phones.length);
  };

  return (
    <div>
      <FormField field={form?.model?.firstName}  />
      <FormField field={form?.model?.middleName}  />
      <FormField field={form?.model?.lastName}  />
      <FormField field={form?.model?.address}/>
      <button onClick={(e)=> addNewChildField(e, form.model.phones)}>+</button>
      <br />
      {form.model.phones?.childFields?.map?.((phone, index) => {
        return(
        <React.Fragment>
          <button onClick={(e)=> removeChildField(e, index, form.model.phones)}>-</button>
          <FormField key={`${phone.model.number.key}${index}`} field={phone.model.number} />
          <FormField key={`${phone.model.number.type}${index}`} field={phone.model.type} />
        </React.Fragment>
        )})}
    </div>
  );
};

export default AddReply;
