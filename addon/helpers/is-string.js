import Ember from 'ember';
import { isString } from 'ember-attribute-validations/utils';
const { Helper } = Ember;

export default Helper.extend({
  compute([value]){
    return isString(value);
  }
});
