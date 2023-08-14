import React, { useState, useEffect } from 'react';
import FormField from './FormField';
import BaseField from './UiBaseField';

const UiObjectField = ({ field }) => {

  return (
    <BaseField
      content={
        <React.Fragment>
          {field.childFields?.map((field, index) => (
            <FormField key={`${field.key}${index}`} field={field} />
          ))}
        </React.Fragment>
      }
    />
  );
};

export default UiObjectField;
