import { BaseField } from './BaseField';
export class TextField extends BaseField {
  isTextField = true;
  minCharacterLimit = null;
  maxCharacterLimit = null;
  value = '';
  initialValue = '';
  constructor(form, fieldValue, parentField = null) {
    super(form, fieldValue, parentField);
    this.minCharacterLimit = fieldValue.minCharacterLimit;
    this.maxCharacterLimit = fieldValue.maxCharacterLimit;
  }

  validate() {
    return new Promise((resolve, reject) => {
      super.validate().then(() => {
        if (this.minCharacterLimit && (this.value.length < this.minCharacterLimit) || this.maxCharacterLimit && (this.value.length > this.maxCharacterLimit)) {
          if (this.minCharacterLimit && (this.value.length < this.minCharacterLimit)) {
            if (this.maxCharacterLimit) {
              this.addErrors(`Please enter a value between ${this.minCharacterLimit} and ${this.maxCharacterLimit} characters`);
            } else {
              this.addErrors(`Please enter a value more than ${this.minCharacterLimit} characters`);
            }
            reject();
          }
          if (this.maxCharacterLimit && (this.value.length > this.maxCharacterLimit)) {
            if (this.minCharacterLimit) {
              this.addErrors(`Please enter a value between ${this.minCharacterLimit} and ${this.maxCharacterLimit} characters`);
            } else {
              this.addErrors(`Please enter a value less than ${this.maxCharacterLimit} characters`);
            }
            
          }
        reject();
      } else {
        resolve();
      }
        
      }).catch(() => {
        reject();
      });
    });
  }

}
