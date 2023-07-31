import { BaseField } from './BaseField';
export class TextField extends BaseField {
  isTextField = false;
  isMandatory = true;
  constructor(args) {
    super(args);
    this.isTextField = true;
    this.isMandatory = true;
  }

  validate() {
    return new Promise((resolve, reject) => {
      this.initializeErrors();
      // this.resetErrors();
      // Mandatory check.
      if (this.isMandatory) {
        if (this.value === '' || !this.value) {
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

  isDirty() {
    return this.value !== this._initialValue;
  }

  updateValue(value) {
    this.value = value;
  }
}
