import Ember from 'ember';

const { Service } = Ember;

export default Service.extend({
    dateFormat: 'DD/MM/YYYY',
    dateTimeFormat: 'DD/MM/YYYY HH:mm:ss',
    timeFormat: 'HH:mm:ss',
    locale: 'nl-BE',
    currencyDisplay: 'symbol',
    defaultCurrency: 'EUR',
    availableCurrencies: ['EUR', 'USD']
});
