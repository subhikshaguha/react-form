export class BaseField {
  errors = [];
  value = null;
  isMandatory = false;
  _initialValue = null;
  defaultValue = null;

  constructor(fieldValue) {
    this.value = fieldValue.Value;
    this._initialValue = fieldValue._initialValue;
    this._cleanValue = fieldValue._cleanValue;
    this.defaultValue = fieldValue.defaultValue;
    this.label = fieldValue.label;
    this.errors = fieldValue.errors || [];
    this.isMandatory = fieldValue.isMandatory;
    this.isDisabled = false;
    this.key = null;
  }

  validate() {
    return new Promise((resolve, reject) => {
      this.resetErrors();
      // Mandatory check.
      if (this.isMandatory) {
        if (!this.value) {
          this.addErrors('This field is required');
          reject(this.errors);
        } else {
          resolve(this.value);
        }
      } else {
        resolve(this.value);
      }
    });
  }

  addErrors(error) {
    this.errors.push(error);
  }

  isDirty() {
    return this.value !== this._initialValue;
  }

  updateValue(value) {
    this.value = value;
  }
}
