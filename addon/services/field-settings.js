import Service from '@ember/service';

export default Service.extend({
    dateFormat: 'YYYY-MM-DD',
    dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
    timeFormat: 'HH:mm:ss',
    locale: 'nl-BE',
    currencyDisplay: 'symbol',
    defaultCurrency: 'EUR',
    availableCurrencies: ['EUR', 'USD']
});
