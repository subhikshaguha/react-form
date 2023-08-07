import React from 'react';
import FormField from '../UiField/FormField';

const AddReply = ({ form }) => {
  console.log('subhiksha here with the values', form)
  return (
    <div>
      <FormField field={form?.model?.firstName} />
      <FormField field={form?.model?.middleName} />
      <FormField field={form?.model?.lastName} />
      <FormField field={form?.model?.address} />
      {form?.model?.phones?.childFields?.map?.((phone, index) => (
        <React.Fragment>
          <FormField key={`${phone.key}${index}`} field={phone.model.number} />
          <FormField key={`${phone.key}${index}`} field={phone.model.type} />
        </React.Fragment>
        ))}
    </div>
  );
};

export default AddReply;
