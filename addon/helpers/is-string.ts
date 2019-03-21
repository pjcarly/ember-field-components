import Helper from '@ember/component/helper';
import { isString } from 'ember-attribute-validations/utils';

export default class IsStringHelper extends Helper {
  compute([value]){
    return isString(value);
  }
}
