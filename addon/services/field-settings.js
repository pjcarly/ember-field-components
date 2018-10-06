import Service from '@ember/service';

export default Service.extend({
  init(){
    this._super(...arguments);
    this.set('dateFormat', 'YYYY-MM-DD');
    this.set('dateTimeFormat', 'YYYY-MM-DD HH:mm:ss');
    this.set('timeFormat', 'HH:mm:ss');
    this.set('locale', 'nl-BE');
    this.set('currencyDisplay', 'symbol');
    this.set('defaultCurrency', 'EUR');
    this.set('availableCurrencies', ['EUR', 'USD', 'GBP']);
  }
});
