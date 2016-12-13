import Ember from 'ember';

export default Ember.Mixin.create({
  classNameBindings: ['defaultClassName', 'type'],
  defaultClassName: 'output',
  tagName: 'span',

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
