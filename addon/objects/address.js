import Ember from 'ember';
import InlineAttribute from '../objects/inline-attribute';

var address = InlineAttribute.extend({
  street: null,
  postalCode: null,
  city: null,
  state: null,
  country: null,

  qeoQuery: Ember.computed('street', 'postalCode', 'city', 'state', 'country', function() {
    var street = this.get('street'),
      postalCode = this.get('postalCode'),
      city = this.get('city'),
      state = this.get('state'),
      country = this.get('country');

    var query = '';
    if (!Ember.isEmpty(street)) {
      query += street + ' ';
    }
    if (!Ember.isEmpty(postalCode)) {
      query += postalCode + ' ';
    }
    if (!Ember.isEmpty(city)) {
      query += city + ' ';
    }
    if (!Ember.isEmpty(state)) {
      query += state + ' ';
    }
    if (!Ember.isEmpty(country)) {
      query += country + ' ';
    }
    return query;
  })
});


// Define Meta Information
address.reopenClass({
  settings: {
    computedOptions: {
      'country': {
        defaultValue: 'BE',

        selectOptions: [{
          value: '',
          label: '-- Country --'
        }, {
          value: 'AL',
          label: 'Albania'
        }, {
          value: 'AD',
          label: 'Andorra'
        }, {
          value: 'AT',
          label: 'Austria'
        }, {
          value: 'BY',
          label: 'Belarus'
        }, {
          value: 'BE',
          label: 'Belgium'
        }, {
          value: 'BA',
          label: 'Bosnia and Herzegovina'
        }, {
          value: 'BG',
          label: 'Bulgaria'
        }, {
          value: 'HR',
          label: 'Croatia'
        }, {
          value: 'CY',
          label: 'Cyprus'
        }, {
          value: 'CZ',
          label: 'Czech Republic'
        }, {
          value: 'DK',
          label: 'Denmark'
        }, {
          value: 'EE',
          label: 'Estonia'
        }, {
          value: 'FO',
          label: 'Faroe Islands'
        }, {
          value: 'FI',
          label: 'Finland'
        }, {
          value: 'FR',
          label: 'France'
        }, {
          value: 'DE',
          label: 'Germany'
        }, {
          value: 'GI',
          label: 'Gibraltar'
        }, {
          value: 'GR',
          label: 'Greece'
        }, {
          value: 'HU',
          label: 'Hungary'
        }, {
          value: 'IS',
          label: 'Iceland'
        }, {
          value: 'IE',
          label: 'Ireland'
        }, {
          value: 'IM',
          label: 'Isle of Man'
        }, {
          value: 'IT',
          label: 'Italy'
        }, {
          value: 'RS',
          label: 'Kosovo'
        }, {
          value: 'LV',
          label: 'Latvia'
        }, {
          value: 'LI',
          label: 'Liechtenstein'
        }, {
          value: 'LT',
          label: 'Lithuania'
        }, {
          value: 'LU',
          label: 'Luxembourg'
        }, {
          value: 'MK',
          label: 'Macedonia'
        }, {
          value: 'MT',
          label: 'Malta'
        }, {
          value: 'MD',
          label: 'Moldova'
        }, {
          value: 'MC',
          label: 'Monaco'
        }, {
          value: 'ME',
          label: 'Montenegro'
        }, {
          value: 'NL',
          label: 'Netherlands'
        }, {
          value: 'NO',
          label: 'Norway'
        }, {
          value: 'PL',
          label: 'Poland'
        }, {
          value: 'PT',
          label: 'Portugal'
        }, {
          value: 'RO',
          label: 'Romania'
        }, {
          value: 'RU',
          label: 'Russia'
        }, {
          value: 'SM',
          label: 'San Marino'
        }, {
          value: 'RS',
          label: 'Serbia'
        }, {
          value: 'SK',
          label: 'Slovakia'
        }, {
          value: 'SI',
          label: 'Slovenia'
        }, {
          value: 'ES',
          label: 'Spain'
        }, {
          value: 'SE',
          label: 'Sweden'
        }, {
          value: 'CH',
          label: 'Switzerland'
        }, {
          value: 'UA',
          label: 'Ukraine'
        }, {
          value: 'GB',
          label: 'United Kingdom'
        }, {
          value: 'VA',
          label: 'Vatican city'
        }, {
          value: 'RS',
          label: 'Yugoslavia'
        }]
      }
    }
  }
});

export default address;