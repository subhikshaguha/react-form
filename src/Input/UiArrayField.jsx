import React, { useState, useEffect } from 'react';
import FormField from './FormField';
import BaseField from './UiBaseField';

const UiArrayField = ({ field }) => {
  const [arrayField, setArrayField] = useState(field?.childFields?.length || []);
  const addNewChildField = (e, arrField) => {
    e.preventDefault();
    let updatedArrayField = arrField.addNewChildField();
    setArrayField(updatedArrayField.length);
  };

  const removeChildField = (e, index, arrField) => {
    e.preventDefault();
    let updatedArrayField = arrField.removeChildField(index);
    setArrayField(updatedArrayField.length);
  };

  return (
    <BaseField
      content={
        <React.Fragment>
          <button onClick={(e)=> addNewChildField(e, field)}>+</button>
           {arrayField && field?.childFields?.map((childField, index) => (
            <React.Fragment>
              <button onClick={(e)=> removeChildField(e, index, field)}>-</button>
              <FormField key={`${childField.key}${index}`} field={childField} />
            </React.Fragment>
          ))}
        </React.Fragment>
      }
    />
  );
};

export default UiArrayField;
