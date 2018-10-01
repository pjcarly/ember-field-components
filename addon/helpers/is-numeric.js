import Helper from '@ember/component/helper';
import { isNumeric } from 'ember-attribute-validations/utils';

export default Helper.extend({
  compute([value]){
    return isNumeric(value);
  }
});
