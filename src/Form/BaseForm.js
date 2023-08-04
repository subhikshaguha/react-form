import { isNil } from 'lodash';
import { isInvalid } from '../utilities/request';
import { createFields, createFieldModels } from '../utilities/FormModel';
export class BaseForm {
  constructor(formValue) {
    this.onFormUpdate = formValue.onFormUpdate;
    this.isEdit = formValue.isEdit;
    this.dataSource = formValue.dataSource || {};
    this.rawFields = formValue.rawFields;
    this.basicFieldKeys = this.rawFields.map(({ key }) => key);
    this.fields = createFields(this, this.rawFields);
    this.model = createFieldModels(this.fields);
    this.copyFromDataSource();
  }
  submit() {
    this.resetErrors();
    return new Promise((resolve, reject) => {
      this.validate()
        .then(() => {
          this.copyToDataSource();
          resolve();
        })
        .catch((e) => {
          reject();
        });
    });
  }
  resetErrors() {
    this.errors = [];
  };
  reset() {
    this.errors = [];
    this.value = this.initialValue;
  };
  validate() {
    return new Promise((resolve, reject) => {
      let validationPromises = [];
      let fields = this.fields;
      fields.forEach((field) => {
        validationPromises.push(field.validate());
      });
      Promise.allSettled(validationPromises).then((result) => {
        let isValid = result.every((result) => result.status === 'fulfilled');
        console.log('subhiksha here with validation result', result, isValid);
        this.isValid = isValid;
        if (isValid) {
          resolve();
        } else {
          reject();
        }
      });
    });
  }

  isFormDirty() {
    let fields = this.fields;
    const checkFieldAndChildren = (field) => {
      if (field.isObject) {
        let childFields = field.childFields;
        return childFields?.some((childField) => checkFieldAndChildren(childField));
      } else {
        return field.isDirty;
      }
    };
    this.isDirty = fields?.some(field => checkFieldAndChildren(field));
    if (this.onFormUpdate) {
      this.onFormUpdate('isDirty', this.isDirty);
    }
    return this.isDirty;
  };

  populateErrors(errors) {
    let fields = this.fields;
    if (isInvalid(errors.status)) {
      let { errors: errorsPayload } = errors;
      Object.keys(errorsPayload).forEach((errorKey) => {
        if (errorKey === 'nonFieldErrors') {
          this.errors = errorsPayload[errorKey];
        } else {
          let field = fields.find((field) => field.key === errorKey);
          if (!isNil(field)) {
            field.setErrors(errorsPayload[errorKey]);
          }
        }
      });
    }
  }

  copyFromDataSource(source = null) {
    let basicFieldKeys = this.basicFieldKeys;
    let dataSource = source || this.dataSource;
    if (basicFieldKeys) {
      basicFieldKeys.forEach((key) => {
        let field = this.model[key];
        // To skip dynamic fields if not present
        if (field) {
          let value = dataSource[key];
          if (!isNil(value)) {
            field.value = dataSource[key];
          }
        }
      });
    }
  }

  copyToDataSource() {
    let dataSource = this.dataSource;
    let basicFieldKeys = this.basicFieldKeys;
    if (basicFieldKeys) {
      basicFieldKeys.forEach((key) => {
        let field = this.model[key];
        // Dynamic field might not be present for this key
        if (field) {
          if (this.isEdit && !field.isDirty) {
            return; // because we will be sending a PATCH request during edit.
          }
          dataSource[key] = field.value;
        }
      });
    }
  }

  setDataSource(dataSource) {
    this.dataSource = dataSource;
  }

  // createFields(rawFields) {
  //   let fieldModels = [];
  //   // check type of each field and create field model
  //   rawFields.forEach((rawField) => {
  //     fieldModels.push(createField(this, rawField));
  //   });
  //   return fieldModels;
  // }

  // createFieldModels(fields) {
  //   let fieldModels = {};
  //   fields.forEach((field) => {
  //     fieldModels[field.key] = field;
  //   });
  //   return fieldModels;
  // }
}
