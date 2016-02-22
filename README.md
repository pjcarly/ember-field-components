# Ember-field-components

This addon provides a  set of components which are meant to tie directly to the attribute type of a model field with build in validation on save, however, stand alone components for each type are supported as well.

## Model Attribute types
Use setType from classes/attribute.js to create your attrtibute types on your model, this way default validations will be added.

* `string`
* `number`
* `boolean`
 * extra widget: `switch` available
* `date`
* `datetime`
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

Next to attribute types, `DS.belongsTo` is also supported

## Input field component
In your handlebar templates define a input-field like this

``{{input-field model=model field='model_attribute_name' placeholder='placeholder' suffix='suffix' prefix='prefix'}}``


## Extra attributes
* placeholder
* prefix
 * *not supported for:*
  * input-price
  * input-button-group
  * input-checkbox
  * input-switch
  * input-lookup
  * input-select
  * input-textarea
* suffix
  * *not supported for:*
  * input-percentage
  * input-button-group
  * input-checkbox
  * input-switch
  * input-lookup
  * input-select
  * input-textarea

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

## Validation
Validation is done with a fork of ember-cli-data-validation, see github.com/pjcarly/ember-cli-data-validation
