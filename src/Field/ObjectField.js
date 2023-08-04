import { BaseField } from './BaseField';
import { createFieldModels } from '../utilities/FormModel';

export class ObjectField extends BaseField {
  isObject = true;
  value = {};
  initialValue = {};
  childFields = null;
  constructor(form, fieldValue) {
    super(form, fieldValue);
    this.childFields = fieldValue.childFields;
    this.model = createFieldModels(this.childFields);
  }

  validate() {
    return new Promise((resolve, reject) => {
      this.resetErrors();
      let promises = {};
      this.childFields.forEach((child) => {
        promises[child.key] = child.validate();
      });
  
      Promise.allSettled(Object.values(promises))
        .then((results) => {
          const isValid = results.every((result) => result.status === 'fulfilled');
          if (isValid) {
            resolve();
          } else {
            reject();
          }
        });
    });
  }

}
