import Ember from 'ember';

const { Mixin, computed, isBlank } = Ember;

export default Mixin.create({
  classNameBindings: ['defaultClassName', 'type', 'isInputGroup:input-group'],
  defaultClassName: 'input',
  tagName: 'span',

  inputStyleClass: computed('styleClass', function(){
    let styleClass = this.get('styleClass');
    return isBlank(styleClass) ? 'form-control' : 'form-control ' + styleClass;
  }),
  hasPrefix: computed('prefix', function(){
    return !isBlank(this.get('prefix'));
  }),
  hasSuffix: computed('suffix', function(){
    return !isBlank(this.get('suffix'));
  }),
  isInputGroup: computed('hasPrefix', 'hasSuffix', 'hasInputButton', function(){
    return this.get('hasPrefix') || this.get('hasSuffix') || this.get('hasInputButton');
  }),
  actions: {
    valueChanged(){
      if(this.get('valueChanged')){
        this.get('valueChanged')(...arguments);
      }
    }
  }
});
