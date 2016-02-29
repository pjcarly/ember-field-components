# Ember-field-components

This addon provides a  set of components which are meant to tie directly to the attribute type of a model field with build in validation on save, however, stand alone components for each type are supported as well.

## Model Attribute types
Use setType from classes/attribute.js to create your attrtibute types on your model, this way default validations will be added.

For example:

```javascript
import Ember from 'ember';
import DS from 'ember-data';
import Attribute from 'ember-field-components/classes/attribute';

export default DS.Model.extend({
  firstName: Attribute.setType('string'),
  lastName: Attribute.setType('string'),
  email: Attribute.setType('email')
}
```

supported attribute types are:

* `string`
* `number`
* `boolean`
  * extra widget: `switch` available
* `date`
  * extra widget: `bootstrap` available
* `datetime`
  * extra widget: `bootstrap` available
* `email`
* `link`
* `percentage`
* `phone`
* `price`
* `select`
  * extra widget: `button-group` available
  * extra widget: `select-search` available
* `textarea`
* `time`
  * extra widget: `bootstrap` available

Next to attribute types, `DS.belongsTo` is also supported

### Date, DateTime and Time
These components display the html5 input on mobile devices, and bootstrap-datetimepicker on other devices. If we can't figure out the correct User Agent, we default to HTML5. You can force bootstrap by passing `widget: bootstrap` in the field options

### Select Lists
Attributes with type `select` require you to define select options, possible values in your select list.
This is how you define selectOptions:

```javascript
import Ember from 'ember';
import DS from 'ember-data';
import Attribute from 'ember-field-components/classes/attribute';

export default DS.Model.extend({
  status: Attribute.setType('select', {
    selectOptions: [{
      'value': 'draft',
      'label': 'Draft'
    }, {
      'value': 'accepted',
      'label': 'Accepted'
    }, {
      'value': 'rejected',
      'label': 'Rejected'
    }],
    defaultValue: 'draft'
  })
}
```

the value, is the value in your `<option>` and the label, is the value you'll see appear in your select list.

* `defaultValue` is optional

### Number, Percentage & Price
These attribute types require you to define the precision and amount of decimals

For example:
```javascript
import Ember from 'ember';
import DS from 'ember-data';
import Attribute from 'ember-field-components/classes/attribute';

export default DS.Model.extend({
  totalPrice: Attribute.setType('price', {
    precision: 18,
    decimals: 3
  })
}
```

* `precision` are the total amount of digits in your number
* `decimals` are the amount of digits after the decimal mark


## Input field component
In your handlebar templates define a input-field like this

``{{input-field model=model field='model_attribute_name' placeholder='placeholder' suffix='suffix' prefix='prefix'}}``

All input fields are rendered with a Label and an Input field, you can ommit the label by passing `inline=true` as an attribute to your input-field


### Supported attributes
* inline
* placeholder
* prefix
 * *not supported for:*
  * button-group
  * checkbox
  * switch
  * lookup
  * select
  * textarea
* suffix
  * *not supported for:*
  * button-group
  * checkbox
  * switch
  * lookup
  * select
  * textarea

### Customizing your Labels
Standard we use the [capitalized](http://emberjs.com/api/classes/Ember.String.html#method_capitalize) version of your fieldname as a label, however you can customize the value by reopening your entity class.

For example:

```javascript
import Ember from 'ember';
import DS from 'ember-data';
import Attribute from 'ember-field-components/classes/attribute';

let entity = DS.Model.extend({
  totalPrice: Attribute.setType('price', {
    precision: 18,
    decimals: 3
  })
}

entity.reopenClass({
  settings: {
    labels: {
      'id': '#',
      'totalPrice': 'Total Price'
    }
  }
});

export default entity;
```

## Stand alone Input Components

* input-button-group
* input-checkbox
* input-date
* input-datetime
* input-email
* input-lookup
* input-number
* input-password
* input-phone
* input-select
* input-switch
* input-text
* input-textarea
* input-time
* input-url



## Output Field Components

### Supported attributes
* format [Moment Formatting](http://momentjs.com/)
 * *only supported for:*
  * date
  * dateTime
  * time

## Stand alone Output Components

* input-button-group
* input-checkbox
* input-date
* input-datetime
* input-email
* input-lookup
* input-number
* input-password
* input-phone
* input-select
* input-switch
* input-text
* input-textarea
* input-time
* input-url


## Validation
Validation is done with a fork of ember-cli-data-validation, see github.com/pjcarly/ember-cli-data-validation
