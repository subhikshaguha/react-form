import { BaseForm } from './BaseForm';

export default class EditForm extends BaseForm {
  constructor(args) {
    super(args);
  }
  copyFromDataSource() {
    super.copyFromDataSource();
    let isArrayPresent = this.fields.some((field) => field.isArray);
    if (isArrayPresent) {
      this.fields.forEach((field) => {
        if (field.isArray) {
          field.childFields = [];
          field.createChildFields(field.value);
        }
      });
    }
  }

  /*populateErrors(errorResponse) {
    let fields = this.get('fields');
    if (errorResponse && isInvalid(errorResponse.status)) {
      let nonFieldErrorMessage = [];
      errorResponse.errors.forEach(error => {
        if (error.field && error.errors) {
          let field = fields.findBy('key', error.field.camelize());
          if (isPresent(field)) {
            let fieldErrorMessage = [];
            error.errors.forEach(err => {
              if (err.message) {
                fieldErrorMessage.push(err.message);
              }
            });
            field.setErrors(fieldErrorMessage);
          }
        } else if (error.errors) {
          error.errors.forEach(err => {
            if (err.message) {
              nonFieldErrorMessage.push(err.message);
            }
          });
        }
      });
      if (nonFieldErrorMessage.length > 0) {
        this.set('nonFieldErrorMessage', nonFieldErrorMessage);
      } else {
        this.set('nonFieldErrorMessage', null);
      }
    }
  }*/
}
