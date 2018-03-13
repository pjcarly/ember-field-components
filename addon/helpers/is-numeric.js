import Ember from 'ember';
import { isNumeric } from 'ember-attribute-validations/utils';
const { Helper } = Ember;

export default Helper.extend({
  compute([value]){
    return isNumeric(value);
  }
});
