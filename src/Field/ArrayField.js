import { BaseField } from "./BaseField";
import { createField } from "../utilities/FormModel";

export class ArrayField extends BaseField {
  isArray = true;
  value = null;
  initialValue = null;
  childFields = null;
  model = null;

  constructor(form, fieldValue, parentField = null) {
    super(form, fieldValue, parentField);
    this.childFieldsMetaInfo = fieldValue.childFieldsMetaInfo || [];
    // let phones = [
    //   {
    //     type: "mobile",
    //     number: "9003283102"
    //   },
    //   {
    //     type: "work",
    //     number: "9003283102"
    //   }
    // ];
    // this.value = phones;
    // this.createChildFields(this.value);
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
        // childMetaInfo.value = childValue;
        let field = createField(this.form, childMetaInfo, this);
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

  addNewChildField(value = null) {
    let field = createField(this.form, this.childFieldsMetaInfo, this);
    // let fieldValue = field.getValueCopy(value);
    // field.value = fieldValue;
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
