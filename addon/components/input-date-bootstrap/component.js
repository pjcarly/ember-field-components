import Ember from 'ember';
import InputComponent from '../../mixins/component-input';
import InputMomentFormat from '../../mixins/component-input-moment-format';

const { Component } = Ember;
const { inject } = Ember;
const { merge } = Ember;
const { computed } = Ember;
const { isBlank } = Ember;
const { service } = inject;

export default Component.extend(InputComponent, InputMomentFormat, {
  type: 'date-bootstrap',
  fieldSettings: service(),
  showButton: true,
  isInputGroup: computed('showButton', 'hasPrefix', 'hasSuffix', function(){
    return this.get('showButton') || this.get('hasPrefix') || this.get('hasSuffix');
  }),

  momentFormat: computed('format', 'fieldSettings.dateFormat', function(){
    let format = this.get('format');
    if(isBlank(format)){
      return this.get('fieldSettings.dateFormat');
    } else {
      return format;
    }
  }),

  didInsertElement() {
    let domElement = this.$('input');
    let widgetOptions = this.get('widgetOptions');

    let options = {
      format: this.get('momentFormat')
    }

    if(!isBlank(widgetOptions)){
      merge(options, widgetOptions);
    }

    const minDate = this.get('minDate');
    const maxDate = this.get('maxDate');

    domElement.datetimepicker(options);

    if(!isBlank(minDate)){
      domElement.data('DateTimePicker').minDate(minDate);
    } else {
      domElement.data('DateTimePicker').minDate(false);
    }

    if(!isBlank(maxDate)){
      domElement.data('DateTimePicker').maxDate(maxDate);
    } else {
      domElement.data('DateTimePicker').maxDate(false);
    }
  },

  didUpdateAttrs(){
    this._super(...arguments);

    // if minDate changed, we update the component
    const minDate = this.get('minDate');
    const oldMinDate = this.get('_oldMinDate');
    const maxDate = this.get('maxDate');
    const oldMaxDate = this.get('_oldMaxDate');

    if(minDate !== oldMinDate) {
      let domElement = this.$('input');

      if(!isBlank(minDate)){
        domElement.data('DateTimePicker').minDate(minDate);
      } else {
        domElement.data('DateTimePicker').minDate(false);
      }
    }

    // same with maxDate
    if(maxDate !== oldMaxDate) {
      let domElement = this.$('input');

      if(!isBlank(maxDate)){
        domElement.data('DateTimePicker').maxDate(maxDate);
      } else {
        domElement.data('DateTimePicker').maxDate(false);
      }
    }
  },

  actions: {
    toggleCalendar: function(){
      this.$('input').data("DateTimePicker").toggle();
    }
  }
});
