import { isEmpty, isEqual } from 'lodash';
export class BaseField {
  errors = [];
  value = null;
  isMandatory = false;
  _initialValue = null;
  defaultValue = null;

  constructor(fieldValue) {
    this.value = fieldValue.value;
    this._initialValue = fieldValue._initialValue;
    this._cleanValue = fieldValue._cleanValue;
    this.defaultValue = fieldValue.defaultValue;
    this.label = fieldValue.label;
    this.errors = fieldValue.errors || [];
    this.isMandatory = fieldValue.isMandatory;
    this.isDisabled = false;
    this.key = fieldValue.key;
  }

  validate() {
    return new Promise((resolve, reject) => {
      this.resetErrors();
      // Mandatory check.
      if (isEmpty(this.value) && this.isMandatory) {
        this.addError('This field is required');
        reject(this.value);
      } else {
        resolve(this.value);
      }
    });
  }

  addErrors(error) {
    this.errors.push(error);
  }

  initializeErrors() {
    this.errors = [];
  }

  isFieldDirty() {
    this.isDirty = !isEqual(this.value, this._initialValue, this.key);
    return this.isDirty;
  }

  updateValue(value) {
    this.value = value;
    this.isFieldDirty();
  }
}
