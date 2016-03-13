import Ember from 'ember';
import Attribute from '../classes/attribute';
import VatPercentageSelectionModel from '../mixins/model-vat-percentage-selection';

export default Ember.Mixin.create(VatPercentageSelectionModel, {
  init: function() {
    this._super(...arguments);

    let vatPercentage = this.get('vatPercentage');
    let vatSpread = this.get('vatSpread');

    if (vatSpread) {
      this.set('vatPercentageSelection', 'spread');
    } else {
      this.set('vatPercentageSelection', vatPercentage);
    }
  },
  name: Attribute.setType('string'),
  lineNumber: Attribute.setType('number', {
    precision: 18,
    decimals: 0,
    readOnly: true
  }),
  unitPrice: Attribute.setType('price', {
    precision: 18,
    decimals: 2
  }),
  quantity: Attribute.setType('number', {
    precision: 18,
    decimals: 2
  }),
  subtotal: Attribute.setType('price', {
    precision: 18,
    decimals: 2
  }),
  vatSpread: Attribute.setType('boolean'),
  vatPercentage: Attribute.setType('percentage', {
    decimals: 0,
    precision: 18
  }),
  totalVat: Attribute.setType('price', {
    precision: 18,
    decimals: 2
  }),
  total: Attribute.setType('price', {
    precision: 18,
    decimals: 2
  }),

  recalculateTotals: Ember.observer('unitPrice', 'quantity', 'vatPercentage', 'vatSpread', 'isDeleted', function() {
    this.get('quote').then(quote => quote.calculateTotals());
  })
});
