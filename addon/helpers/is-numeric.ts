import Helper from '@ember/component/helper';
import { isNumeric } from 'ember-attribute-validations/utils';

export default class IsNumericClass extends Helper {
  compute([value]){
    return isNumeric(value);
  }
}
