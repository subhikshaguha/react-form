import { min } from 'lodash';
import { BaseField } from './BaseField';
export class TextField extends BaseField {
  isTextField = true;
  minCharacterLimit = null;
  maxCharacterLimit = null;
  value = '';
  initialValue = '';
  constructor(args) {
    super(args);
    this.minCharacterLimit = args.minCharacterLimit;
    this.maxCharacterLimit = args.maxCharacterLimit;
  }

  validate() {
    return new Promise((resolve, reject) => {
      super.validate().then(() => {
        if (this.minCharacterLimit && (this.value.length < this.minCharacterLimit)) {
          if (this.maxCharacterLimit) {
            this.addErrors(`Please enter a value between ${this.minCharacterLimit} and ${this.maxCharacterLimit} characters`);
          } else {
            this.addErrors(`Please enter a value more than ${this.minCharacterLimit} characters`);
          }
          resolve();
        }
        if (this.maxCharacterLimit && (this.value.length > this.maxCharacterLimit)) {
          if (this.minCharacterLimit) {
            this.addErrors(`Please enter a value between ${this.minCharacterLimit} and ${this.maxCharacterLimit} characters`);
          } else {
            this.addErrors(`Please enter a value less than ${this.maxCharacterLimit} characters`);
          }
          reject();
        }
        resolve(this.value);
      }).catch((e) => {
        resolve();
      });
    });
  }

}
