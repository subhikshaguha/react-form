import { BaseForm } from './BaseForm';

export default class EditForm extends BaseForm {
  constructor(args) {
    // console.log('subhiksha here');
    super(args);
    this.fields = this._createFieldModels(this.rawFields);
    // super(...args);
    // this._createFieldModels(this.rawFields);
  }
  // validate() {
  //   let x = super.validate();
  //   console.log('we are here with', x);
  //   console.log('validate errors validate');
  // }
  _populateErrors() {
    // console.log('do something Edit Form');
  }
  copyFromDataSource() {
    // to fe
    // super(...arguments);
    // console.log('something copy EditForm');
  }
  _copyToDataSource() {
    // to be
    // console.log('copy to data source EditForm');
  }
}
