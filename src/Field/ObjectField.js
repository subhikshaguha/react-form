import { BaseField } from './BaseField';
import { createField, createFieldModels } from '../utilities/FormModel';

export class ObjectField extends BaseField {
  isObject = true;
  value = null;
  initialValue = null;
  childFields = null;
  model = null;

  constructor(form, fieldValue, parentField = null) {
    super(form, fieldValue, parentField);
    this.childFieldsMetaInfo = fieldValue.childFieldsMetaInfo || [];
    this.createChildFields(this.childFieldsMetaInfo);
    // this.childFields = fieldValue.childFields;
    this.model = createFieldModels(this.childFields);
  }

  createChildFields(
    childFieldsValues = null,
    isClone = false,
    setInitialValue = true
  ) {
    let childFields = [];
    if (childFieldsValues) {
      let childMetaInfo = this.childFieldsMetaInfo;
      childFieldsValues.forEach((childValue) => {
        // childMetaInfo.value = childValue;
        let field = createField(this.form, childValue, this);
        childMetaInfo.value = null;
        // field.updateInitialValue();
        childFields.push(field);
        // value.push(field.value);

        // if (isClone) {
        //   field.clearInitialValue();
        // } else if (setInitialValue) {
        //   initialValue.push(field._initialValue);
        // }
      });
    }

    // this.value = value;
    // this._initialValue = initialValue;
    this.childFields = childFields;
  }

  isFieldDirty() {
    this.isDirty = this.childFields.some((child) => child.isDirty);
    if (this.parentField) {
      this.parentField.isFieldDirty();
    } else {
      this.form.isFieldDirty();
    }
    return this.isDirty;
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

  getCleanValue() {
    let cleanValue = {};
    this.childFields.forEach((child) => {
      cleanValue[child.key] = child.getCleanValue();
    });
    return cleanValue;
  }

}
