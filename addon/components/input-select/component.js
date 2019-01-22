import Component from '@ember/component';
import InputComponent from '../../mixins/component-input';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import { inject as service } from '@ember/service';

export default Component.extend(InputComponent, {
  type: 'select',
  intl: service(),
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
  noneLabel: computed('none', 'intl.locale', function(){
    return isBlank(this.get('none')) ? this.get('intl').t('label.select_none') : this.get('none');
  }),
  computedValue: computed('value', function(){
    let value = this.get('value');
    if(!isBlank(value)){
      return this.get('value').toString();
    }
  }),
  actions: {
    valueChanged() {
      let value = this.$('select').val();
      this.notifyAction(value);
    }
  }
});
