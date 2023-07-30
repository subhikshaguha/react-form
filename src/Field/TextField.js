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

  addErrors(error) {
    this.errors.push(error);
  }

  isDirty() {
    return this.value !== this.initialValue;
  }

  updateValue(value) {
    this.value = value;
  }
}
