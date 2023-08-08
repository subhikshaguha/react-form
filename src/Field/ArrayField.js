import { BaseField } from "./BaseField";
import { createField } from "../utilities/FormModel";

export class ArrayField extends BaseField {
  isArray = true;
  value = null;
  initialValue = null;
  childFields = null;
  model = null;

  constructor(form, fieldValue) {
    super(form, fieldValue);
    this.childFieldsMetaInfo = fieldValue.childFieldsMetaInfo || [];
    let phones = [
      {
        type: "mobile",
        number: "9003283102"
      },
      {
        type: "work",
        number: "9003283102"
      }
    ];
    this.value = phones;
    this.createChildFields(this.value);
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
        let field = createField(this.form, childMetaInfo);
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
    let field = createField(this.form, this.childFieldsMetaInfo);
    // let fieldValue = field.getValueCopy(value);
    // field.value = fieldValue;
    this.childFields.push(field);
    return this.childFields;
  }
  removeChildField(index) {
    this.childFields.splice(index, 1);
    return this.childFields;
  }

}
