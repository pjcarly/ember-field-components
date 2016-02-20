import Ember from 'ember';

export default Ember.Component.extend({
  selectOptions: [{
    'value': 'nl',
    'label': 'Dutch'
  }, {
    'value': 'fr',
    'label': 'French'
  }, {
    'value': 'en',
    'label': 'English'
  }],

  columns: [{
    'value': 'value',
    'label': 'Value'
  }, {
    'value': 'label',
    'label': 'Label'
  }],

  actions: {
    valueChanged: function(value){
      console.log(value);
    }
  }
});
