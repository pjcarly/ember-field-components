import Component from '@ember/component';
import InputComponent from '../../mixins/component-input';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';

export default Component.extend(InputComponent, {
  type: 'select',
  hasPrefix: false,
  hasSuffix: false,
  showNone: computed('value', 'isRequired', function(){
    return isBlank(this.get('value')) || !this.get('isRequired');
  }),
  noneDisabled: computed('value', 'isRequired', function(){
    return isBlank(this.get('value')) && this.get('isRequired');
  }),
  noneSelected: computed('value', 'isRequired', function(){
    return isBlank(this.get('value')) && this.get('isRequired');
  }),
  noneLabel: computed('none', function(){
    return isBlank(this.get('none')) ? '-- None --' : this.get('none');
  }),
  computedValue: computed('value', function(){
    let value = this.get('value');
    if(!isBlank(value)){
      return this.get('value');
    }

    return [];
  }),
  actions: {
    valueChanged: function() {
      let value = this.$('select').val();
      this.sendAction('valueChanged', value);
    }
  }
});
