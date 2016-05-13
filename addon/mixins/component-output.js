import Ember from 'ember';

export default Ember.Mixin.create({
  classNameBindings: ['defaultClassName', 'type', 'isButtonGroup:input-group'],
  defaultClassName: 'output',
  type: null,
  prefix: null,
  suffix: null,
  hideButtons: false, // used for url, email and phone

  hasPrefix: Ember.computed('prefix', 'hasValue', function(){
    return !Ember.isBlank(this.get('prefix')) && this.get('hasValue');
  }),
  hasSuffix: Ember.computed('suffix', 'hasValue', function(){
    return !Ember.isBlank(this.get('suffix')) && this.get('hasValue');
  }),
  hasValue: Ember.computed('value', function(){
    return !Ember.isBlank(this.get('value'));
  }),
  isButtonGroup: Ember.computed('hasValue', 'hideButtons', function(){
    return this.get('hasValue') && !this.get('hideButtons');
  })
});
