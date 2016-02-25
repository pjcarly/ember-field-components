import Ember from 'ember';

export default Ember.Service.extend({
  dateFormat: 'DD/MM/YYYY',
  dateTimeFormat: 'DD/MM/YYYY HH:mm:ss',
  timeFormat: 'HH:mm:ss',
  currencyFormat: '$0,0',
  numberFormat: '0,0'
});
