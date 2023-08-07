import React, { useState, Fragment } from 'react';
import UiTextField from './UiTextField';
import UiObjectField from './UiObjectField';
import UiArrayField from './UiArrayField';

function FormField({ field, submitted, isLoading }) {
  return (
    <Fragment>
      {field?.isTextField && <UiTextField field={field} submitted={submitted} isLoading={isLoading} />}
      {field?.isObject && <UiObjectField field={field} submitted={submitted} isLoading={isLoading} />}
      {field?.isArray && <UiArrayField field={field} submitted={submitted} isLoading={isLoading} />}
    </Fragment>
  );
}

export default FormField;
