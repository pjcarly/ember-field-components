import OutputText from '../components/output-text';

export default OutputText.extend({
  value: null,
  selectoptions: [],

  selectedvalue: Ember.computed('value', 'selectoptions', function() {
    let value = this.get('value');
    if (!Ember.isBlank(value)) {
      let selectoptions = this.get('selectoptions');
      Ember.assert('No selectoptions passed', !Ember.isEmpty(selectoptions));

      let selectedoption = selectoptions.findBy('value', value);

      if (!Ember.isBlank(selectedoption)) {
        if (selectedoption.hasOwnProperty('label')) {
          return selectedoption.label;
        } else {
          return selectedoption.value;
        }
      } else {
        return value;
      }
    }
  })
});