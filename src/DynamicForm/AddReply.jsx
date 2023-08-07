import React from 'react';
import FormField from '../UiField/FormField';

const AddReply = ({form}) => {
  return (
    <div>
      <FormField field={form.model.firstName} />
      <FormField field={form.model.lastName} />
      <FormField field={form.model.middleName} />
    </div>
  );
};

export default AddReply;
