import Helper from '@ember/component/helper';
import { isString } from 'ember-attribute-validations/utils';

export default Helper.extend({
  compute([value]){
    return isString(value);
  }
});
