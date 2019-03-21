import Component from '@ember/component';
import InputComponent from '../../mixins/component-input';
import InputMomentFormat from '../../mixins/component-input-moment-format';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import { inject as service } from '@ember/service';

export default Component.extend(InputComponent, InputMomentFormat, {
  type: 'time-bootstrap',
  fieldInformation: service(),
  showButton: true,
  isInputGroup: computed('showButton', 'hasPrefix', 'hasSuffix', function(){
    return this.get('showButton') || this.get('hasPrefix') || this.get('hasSuffix');
  }),

  momentFormat: computed('format', 'fieldInformation.timeFormat', function(){
    let format = this.get('format');
    if(isBlank(format)){
      return this.get('fieldInformation.timeFormat');
    } else {
      return format;
    }
  }),

  didInsertElement() {
    var domElement = this.$('input');
    domElement.datetimepicker({
      format: this.get('momentFormat')
    });
  },

  actions: {
    toggleCalendar(){
      this.$('input').data("DateTimePicker").toggle();
    }
  }
});
