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

  didInsertElement: function() {
    let domElement = this.$('input');
    let widgetOptions = this.get('widgetOptions');

    let options = {
      format: this.get('momentFormat')
    }

    if(!isBlank(widgetOptions)){
      merge(options, widgetOptions);
    }

    domElement.datetimepicker(options);

    if(!isBlank(this.get('minDate'))){
      domElement.data('DateTimePicker').minDate(this.get('minDate'));
    } else {
      domElement.data('DateTimePicker').minDate(false);
    }

    if(!isBlank(this.get('maxDate'))){
      domElement.data('DateTimePicker').maxDate(this.get('maxDate'));
    } else {
      domElement.data('DateTimePicker').maxDate(false);
    }
  },

  didUpdateAttrs(attrs){
    this._super(...arguments);

    // if minDate changed, we update the component
    if(attrs) {
      if(attrs.newAttrs.minDate.value !== attrs.oldAttrs.minDate.value) {
        let domElement = this.$('input');

        if(!isBlank(this.get('minDate'))){
          domElement.data('DateTimePicker').minDate(this.get('minDate'));
        } else {
          domElement.data('DateTimePicker').minDate(false);
        }
      }

      // same with maxDate
      if(attrs.newAttrs.maxDate.value !== attrs.oldAttrs.maxDate.value) {
        let domElement = this.$('input');

        if(!isBlank(this.get('maxDate'))){
          domElement.data('DateTimePicker').maxDate(this.get('maxDate'));
        } else {
          domElement.data('DateTimePicker').maxDate(false);
        }
      }
    }
  },

  actions: {
    toggleCalendar: function(){
      this.$('input').data("DateTimePicker").toggle();
    }
  }
});
