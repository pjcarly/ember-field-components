import Ember from 'ember';

export default Ember.Mixin.create({
  classNameBindings: ['defaultClassName', 'type', 'isInputGroup:input-group'],
  defaultClassName: 'input',
  tagName: 'span',
  hasInputButton: false,

  inputStyleClass: Ember.computed('styleClass', function(){
    let styleClass = this.get('styleClass');
    return Ember.isBlank(styleClass) ? 'form-control' : 'form-control ' + styleClass;
  }),
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
