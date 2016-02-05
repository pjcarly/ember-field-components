import Ember from 'ember';
import Attribute from '../classes/attribute';

export default Ember.Mixin.create({
  subtotal: Attribute.setType('price', {
    precision: 18,
    decimals: 2
  }),
  totalVat: Attribute.setType('price', {
    precision: 18,
    decimals: 2
  }),
  total: Attribute.setType('price', {
    precision: 18,
    decimals: 2
  }),

  calculateTotals: function() {
    Ember.run.later(this, function() {
      let lineItems = this.get('lineItems');
      let subtotal = new Decimal(0);
      let totalVat = new Decimal(0);
      let total = new Decimal(0);
      let lineItemsWithVatSpread = [];
      let lineItemsWithoutVatSpread = [];

      lineItems.forEach(function(lineItem) {
        let isDeleted = lineItem.get('isDeleted');

        if (!isDeleted) {
          let vatSpread = lineItem.get('vatSpread');

          if (vatSpread) {
            lineItemsWithVatSpread.push(lineItem);
          } else {
            lineItemsWithoutVatSpread.push(lineItem);

            let lineUnitPrice = lineItem.get('unitPrice');
            let lineQuantity = lineItem.get('quantity');
            let lineVatPercentage = lineItem.get('vatPercentage');

            lineUnitPrice = Ember.isNone(lineUnitPrice) ? 0 : lineUnitPrice;
            lineQuantity = Ember.isNone(lineQuantity) ? 0 : lineQuantity;
            lineVatPercentage = Ember.isNone(lineVatPercentage) ? 0 : lineVatPercentage;

            let lineSubtotal = new Decimal(lineUnitPrice).times(lineQuantity);
            let lineTotalVat = new Decimal(lineSubtotal).times(lineVatPercentage).dividedBy(100);
            let lineTotal = new Decimal(lineSubtotal).plus(lineTotalVat);

            subtotal = subtotal.plus(lineSubtotal);
            totalVat = totalVat.plus(lineTotalVat);

            lineItem.set('subtotal', lineSubtotal.toNumber());
            lineItem.set('totalVat', lineTotalVat.toNumber());
            lineItem.set('total', lineTotal.toNumber());
          }
        }
      });

      if (lineItemsWithVatSpread.length > 0) {
        let spreadedSubTotal = new Decimal(0);
        let spreadedTotalVat = new Decimal(0);
        let spreadedTotal = new Decimal(0);

        lineItemsWithVatSpread.forEach(function(lineItemWithVatSpread) {
          let spreadLineUnitPrice = lineItemWithVatSpread.get('unitPrice');
          let spreadLineQuantity = lineItemWithVatSpread.get('quantity');

          spreadLineUnitPrice = Ember.isNone(spreadLineUnitPrice) ? 0 : spreadLineUnitPrice;
          spreadLineQuantity = Ember.isNone(spreadLineQuantity) ? 0 : spreadLineQuantity;

          let spreadLineSubtotal = new Decimal(spreadLineUnitPrice).times(spreadLineQuantity);
          let spreadLineTotalVat = new Decimal(0);

          lineItemsWithoutVatSpread.forEach(function(lineItemWithoutVatSpread) {
            let lineSubtotal = lineItemWithoutVatSpread.get('subtotal');
            let lineVatPercentage = lineItemWithoutVatSpread.get('vatPercentage');

            let lineTotalVat = new Decimal(lineSubtotal).dividedBy(subtotal).times(lineVatPercentage).dividedBy(100).times(spreadLineSubtotal);
            spreadLineTotalVat = spreadLineTotalVat.plus(lineTotalVat);
          });

          let spreadLineTotal = new Decimal(spreadLineSubtotal).plus(spreadLineTotalVat);

          spreadedSubTotal = spreadedSubTotal.plus(spreadLineSubtotal);
          spreadedTotalVat = spreadedTotalVat.plus(spreadLineTotalVat);
          spreadedTotal = spreadedTotal.plus(spreadLineTotal);

          lineItemWithVatSpread.set('subtotal', spreadLineSubtotal.toNumber());
          lineItemWithVatSpread.set('totalVat', spreadLineTotalVat.toNumber());
          lineItemWithVatSpread.set('total', spreadLineTotal.toNumber());
        });

        subtotal = subtotal.plus(spreadedSubTotal);
        totalVat = totalVat.plus(spreadedTotalVat);
      }

      total = total.plus(subtotal).plus(totalVat);

      this.set('subtotal', subtotal.toNumber());
      this.set('totalVat', totalVat.toNumber());
      this.set('total', total.toNumber());
    });
  }
});