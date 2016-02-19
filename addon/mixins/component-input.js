import Ember from 'ember';

export default Ember.Mixin.create({
  classNameBindings: ['defaultClassName', 'type', 'isInputGroup:input-group'],
  defaultClassName: 'input',
  tagName: 'div',
  hasInputButton: false,
  type: null,
  prefix: null,
  suffix: null,
  hasPrefix: Ember.computed('prefix', function(){
    return !Ember.isBlank(this.get('prefix'));
  }),
  hasSuffix: Ember.computed('suffix', function(){
    return !Ember.isBlank(this.get('suffix'));
  }),
  isInputGroup: Ember.computed('hasPrefix', 'hasSuffix', 'hasInputButton', function(){
    return this.get('hasPrefix') || this.get('hasSuffix') || this.get('hasInputButton');
  })
});
