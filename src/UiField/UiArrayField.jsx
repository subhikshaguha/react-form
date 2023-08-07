import React, { useState, useEffect } from 'react';
import FormField from './FormField';
import BaseField from './UiBaseField';

const UiArrayField = React.memo(({ field, submitted, isLoading }) => {

  return (
    <BaseField
      content={
        <React.Fragment>
          hello World
        </React.Fragment>
      }
    />
  );
});

export default UiArrayField;
