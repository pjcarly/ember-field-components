import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';

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
  notifyAction(){
    console.log(...arguments);
    const valueChanged = this.get('valueChanged');
    if(!isBlank(valueChanged)){
      valueChanged(...arguments);
    }
  },
  actions: {
    valueChanged(){
      this.notifyAction(...arguments);
    }
  }
});
