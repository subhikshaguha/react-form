import { BaseField } from "./BaseField";
import { createField } from "../utilities/FormModel";

export class ArrayField extends BaseField {
  isArray = true;
  childFields = [];
  model = null;

  constructor(form, fieldValue, parentField = null) {
    super(form, fieldValue, parentField);
    this.childFieldsMetaInfo = fieldValue.childFieldsMetaInfo || [];
  }

  createChildFields(
    childFieldsValues = null,
    isClone = false,
    setInitialValue = true
  ) {
    childFieldsValues = childFieldsValues || this.value;
    let childFields = [];
    let initialValue = [];
    let value = [];

    if (childFieldsValues) {
      let childMetaInfo = this.childFieldsMetaInfo;
      childFieldsValues.forEach((childValue) => {
        childMetaInfo.value = childValue;
        let field = createField(this.form, childMetaInfo, this);
        childFields.push(field);
      });
    }

    // this.value = value;
    // this._initialValue = initialValue;
    this.childFields = childFields;
  }

  addNewChildField(value = null) {
    let fieldValue = {
      ...this.childFieldsMetaInfo,
      value: value,
    };
    let field = createField(this.form, fieldValue, this);
    this.childFields.push(field);
    return this.childFields;
  }
  removeChildField(index) {
    this.childFields.splice(index, 1);
    return this.childFields;
  }

  validate() {
    return new Promise((resolve, reject) => {
      this.resetErrors();
      let promises = [];
      this.childFields.forEach(child => {
        promises.push(child.validate());
      });
  
      Promise.allSettled(promises)
        .then(results => {
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
    return this.childFields.map(childField => {
      let cleanValue;
      if (childField.isDynamicExtraField) {
        cleanValue = { key: childField.key, value: childField.getCleanValue() }
      } else {
        cleanValue = childField.getCleanValue();
      }
      return cleanValue;
    });
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
}
