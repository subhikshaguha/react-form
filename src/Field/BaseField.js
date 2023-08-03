import { isEmpty, isEqual } from 'lodash';
export class BaseField {
  errors = [];
  value = null;
  isMandatory = false;
  initialValue = null;
  defaultValue = null;

  constructor(fieldValue, form) {
    this.value = fieldValue.value || fieldValue.defaultValue;
    this.form = form;
    this.initialValue = fieldValue.value;
    this.cleanValue = fieldValue.cleanValue;
    this.defaultValue = fieldValue.defaultValue;
    this.label = fieldValue.label;
    this.errors = fieldValue.errors || [];
    this.isMandatory = fieldValue.isMandatory;
    this.isDisabled = fieldValue.isDisabled;
    this.key = fieldValue.key;
    this.validateOnFocusOut = fieldValue.validateOnFocusOut;
    this.validateOnChange = fieldValue.validateOnChange;
  }

  validate() {
    return new Promise((resolve, reject) => {
      this.resetErrors();
      // Mandatory check.
      if (isEmpty(this.value) && this.isMandatory) {
        this.addErrors('This field is required');
        reject();
      } else {
        resolve();
      }
    });
  }

  addErrors(error) {
    this.errors.push(error);
  }

  setErrors(errors) {
    this.errors = errors;
  }

  resetErrors() {
    this.errors = [];
  }

  isFieldDirty() {
    this.isDirty = !isEqual(this.value, this.initialValue);
    console.log('subhiksha here ', this.form)
    this.form.isFormDirty();
    return this.isDirty;
  }

  updateValue(value) {
    this.value = value;
    this.isFieldDirty();
  }

  updateInitialValue() {
    this.initialValue = this.value;
  }

  clearInitialValue() {
    this.initialValue = null;
  }
}
