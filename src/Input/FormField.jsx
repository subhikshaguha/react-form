import React, { useState, Fragment } from 'react';
import UiTextField from './UiTextField';
import UiObjectField from './UiObjectField';
import UiArrayField from './UiArrayField';

function FormField({ field }) {
  return (
    <Fragment>
      {field?.isText && <UiTextField field={field} />}
      {field?.isObject && <UiObjectField field={field} />}
      {field?.isArray && <UiArrayField field={field}  />}
    </Fragment>
  );
}

export default FormField;
