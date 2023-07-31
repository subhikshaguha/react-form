import { TextField } from '../Field/TextField';

export class BaseForm {
  constructor(formValue) {
    this.dataSource = formValue.dataSource;
    this.rawFields = formValue.rawFields;
  }
  submit() {
    let fields = this.fields;
    let dataSource = this.dataSource;
    this.errors = [];
    return new Promise((resolve, reject) => {
      this.validate()
        .then(() => {
          this._copyToDataSource(fields, dataSource);
          resolve(dataSource);
        })
        .catch(() => {
          reject();
        });
    });
  }
  validate() {
    return new Promise((resolve, reject) => {
      let validationPromises = [];
      let fields = this.fields;
      fields.forEach((field) => {
        validationPromises.push(field.validate());
      });
      Promise.allSettled(validationPromises).then((result) => {
        let isValid = result.every((result) => result.state === 'fulfilled');
        this.isValid = isValid;
        if (isValid) {
          resolve();
        } else {
          reject();
        }
      });
    });
  }
  _populateErrors() {
    console.log('do something');
  }
  copyFromDataSource() {
    // to fe
    console.log('something copy');
  }
  _copyToDataSource() {
    let dataSource = this.dataSource;
    // let basicFieldKeys = rawFields.mapBy('key');
    let basicFieldKeys = this.basicFieldKeys;
    if (basicFieldKeys) {
      basicFieldKeys.forEach((key) => {
        let field = this[key];
        // Dynamic field might not be present for this key
        if (field) {
          if (this.isEdit && !field.isDirty) {
            return; // because we will be sending a PATCH request during edit.
          }
          dataSource[key] = field.getCleanValue();
        }
      });
    }
  }
  _createFieldModels(rawFields) {
    let fieldModels = [];
    // check type of each field and create field model
    rawFields.forEach((rawField) => {
      fieldModels.push(this.createField(this, rawField));
    });
    return fieldModels;
  }

  createField(containerItem, rawField) {
    let rawFieldItem;
    if (rawField.isTextField) {
      rawFieldItem = new TextField(rawField);
    } else {
      rawFieldItem = new TextField(rawField);
    }
    return rawFieldItem;
  }
}
