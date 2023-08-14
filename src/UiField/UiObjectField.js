import React, { useState, useEffect } from 'react';
import FormField from './FormField';
import BaseField from './UiBaseField';

const UiObjectField = React.memo(({ field, submitted, isLoading }) => {

  return (
    <BaseField
      content={
        <React.Fragment>
          {field.childFields?.map((field, index) => (
            <FormField key={`${field.key}${index}`} field={field} submitted={submitted} isLoading={isLoading} />
          ))}
        </React.Fragment>
      }
    />
  );
});

export default UiObjectField;
