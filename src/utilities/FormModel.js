import { TextField } from '../Field/TextField';
import { ObjectField } from '../Field/ObjectField';

function createFields(form, rawFields) {
  let fieldModels = [];
  // check type of each field and create field model
  rawFields.forEach((rawField) => {
    fieldModels.push(createField(form, rawField));
  });
  return fieldModels;
}

function getFieldClass(rawField) {
  let fieldClassDefinition = null;
  if (rawField.isObject) {
    fieldClassDefinition = ObjectField;
  } else if (rawField.isTextField) {
    fieldClassDefinition = TextField;
  }
  return fieldClassDefinition;
}

function createField(containerItem, rawField) {
  let fieldClassDefinition = rawField.fieldClass || getFieldClass(rawField);
  // If the field is of object type, create its child fields
  if (rawField.isObject) {
    let childFields = [];
    rawField.childFieldsMetaInfo?.forEach((child) => {
      if (rawField?.value) {
        let value = rawField?.value?.[child.key] || null;;
        child.value = value;
      }
      let field = createField(containerItem, child);
      childFields.push(field);
    });
    rawField.childFields = childFields;
  }

  return new fieldClassDefinition(containerItem, rawField);
}

function createFieldModels(fields) {
  let fieldModels = {};
  fields.forEach((field) => {
    fieldModels[field.key] = field;
  });
  return fieldModels;
}

export { createFields, createField, createFieldModels };
