import Ember from 'ember';

const { Service } = Ember;

export default Service.extend({
    dateFormat: 'YYYY-MM-DD',
    dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
    timeFormat: 'HH:mm:ss',
    locale: 'nl-BE',
    currencyDisplay: 'symbol',
    defaultCurrency: 'EUR',
    availableCurrencies: ['EUR', 'USD']
});
