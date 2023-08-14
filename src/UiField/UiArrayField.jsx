import React, { useState, useEffect } from 'react';
import FormField from './FormField';
import BaseField from './UiBaseField';

const UiArrayField = ({ field }) => {

  const addChildField = () => {
    field.add?.();
  };

  return (
    <BaseField
      content={
        <React.Fragment>
            Array Field <button type="button" onClick={() => addChildField()}>+</button>
           {field.childFields.map((field, index) => (
            <FormField key={`${field.key}${index}`} field={field} />
          ))}
        </React.Fragment>
      }
    />
  );
};

export default UiArrayField;
