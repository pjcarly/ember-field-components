import Ember from 'ember';
import { isMobileAgent } from 'ember-field-components/classes/utils';

export default Ember.Helper.helper(function() {
  return isMobileAgent();
});
