import { BaseField } from './BaseField';
// import { createFields } from '../utilities/FormModel';
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
    // console.log('subhiksha here with child values', this.model, this.childFields);
  }

  validate() {
    return new Promise((resolve, reject) => {
      super.validate().then(() => {
        resolve(this.value);
      }).catch(() => {
        resolve();
      });
    });
  }

}
