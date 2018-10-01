import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';

export default Mixin.create({
  classNameBindings: ['defaultClassName', 'type'],
  defaultClassName: 'output',
  tagName: 'span',

  hasPrefix: computed('prefix', 'hasValue', function(){
    return !isBlank(this.get('prefix')) && this.get('hasValue');
  }),
  hasSuffix: computed('suffix', 'hasValue', function(){
    return !isBlank(this.get('suffix')) && this.get('hasValue');
  }),
  hasValue: computed('value', function(){
    return !isBlank(this.get('value'));
  }),
  isButtonGroup: computed('hasValue', 'hideButtons', function(){
    return this.get('hasValue') && !this.get('hideButtons');
  })
});
