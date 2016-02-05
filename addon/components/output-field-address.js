import Ember from 'ember';
import FieldOutputComponent from '../mixins/component-field-output-super';

export default Ember.Component.extend(FieldOutputComponent, {
  isBlankOrInline: Ember.computed('inline', function() {
    var field = this.get('field');
    var model = this.get('model');
    var inline = this.get('inline');

    return inline || (Ember.isBlank(model.get(field + '.street')) && Ember.isBlank(model.get(field + '.postalCode')) && Ember.isBlank(model.get(field + '.city')) && Ember.isBlank(model.get(field + '.state')) && Ember.isBlank(model.get(field + '.country')));
  }),
  countrySelectoptions: Ember.computed(function() {
    let fieldAttributeOptions = this.get('fieldAttributeOptions');
    console.log(fieldAttributeOptions);
    return [];
  })
});