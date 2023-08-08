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
    this.component = formValue.component;
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
        let isDirty = childFields?.some((childField) => checkFieldAndChildren(childField));
        field.isDirty = isDirty;
        return isDirty;
      } else if (field.isArray) {
        let childFields = field.childFields;
        let isDirty = childFields?.some((childField) => checkFieldAndChildren(childField));
        field.isDirty = isDirty;
        return isDirty;
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

  findFieldByKey(fields, key) {
    for (let i = 0; i < fields.length; i++) {
      let field = fields[i];
      if (field.key === key) {
        return field;
      } else if (field.children) {
        let childField = findFieldByKey(field.children, key);
        if (childField) {
          return childField;
        }
      }
    }
    return null;
  }

  populateErrors(errors) {
    let fields = this.fields;
    if (isInvalid(errors.status)) {
      let { errors: errorsPayload } = errors;
      Object.keys(errorsPayload).forEach((errorKey) => {
        if (errorKey === 'nonFieldErrors') {
          this.errors = errorsPayload[errorKey];
        } else {
          let field = findFieldByKey(fields, error.field.camelize());
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
          if (field.isObject) {
            let objectSource = dataSource[field.key];
            this.copyFromDataSourceToObjectField(field, objectSource);
          } else if (!isNil(value)) {
            field.value = dataSource[key];
          }
        }
      });
    }
  }

  copyFromDataSourceToObjectField(field, objectSource) {
    field.childFields.forEach((childField) => {
      if (objectSource) {
        let value = objectSource[childField.key];
        if (value !== undefined && childField.isChoice && childField.choiceValueKey) {
          let choices = childField.choices;
          let selectedChoice = choices.find(choice => choice[childField.choiceValueKey] === value.toString());
          childField.value = selectedChoice;
        } else if (value !== undefined) {
          childField.value = value;
        }
        if (childField.isObject) {
          this.copyFromDataSourceToObjectField(childField, value);
        }
      }
    });
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
          dataSource[key] = field.getCleanValue();
        }
      });
    }
  }

  setDataSource(dataSource) {
    this.dataSource = dataSource;
  }
}
