import Ember from 'ember';

export default Ember.Mixin.create({
  vatPercentageSelection: Ember.computed('vatPercentage', 'vatSpread', {
    get: function() {
      let vatPercentage = this.get('vatPercentage');
      let vatSpread = this.get('vatSpread');

      if (vatSpread === true && parseInt(vatPercentage) === 0) {
        return 'spread';
      } else {
        if ((vatPercentage + '').indexOf('.') === -1) {
          // correction for when we save, the backend somehow returns an integer when saving
          // but when reading returns a string with .00 attached to the number
          vatPercentage += '.00';
        }
        return vatPercentage;
      }
    },
    set: function(key, value) {
      Ember.run.once(this, function() {
        if (value === 'spread') {
          this.set('vatSpread', true);
          this.set('vatPercentage', '0.00');
        } else {
          this.set('vatSpread', false);
          this.set('vatPercentage', value);
        }
      })
    }
  }).meta({
    type: 'select',
    options: {
      selectOptions: [{
        'value': 'spread',
        'label': 'spread'
      }, {
        'value': '0.00',
        'label': '0 %'
      }, {
        'value': '6.00',
        'label': '6 %'
      }, {
        'value': '12.00',
        'label': '12 %'
      }, {
        'value': '21.00',
        'label': '21 %'
      }],
      defaultValue: '0.00'
    }
  })
});