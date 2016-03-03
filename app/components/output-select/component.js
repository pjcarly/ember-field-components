import OutputText from 'ember-field-components/components/output-text';

export default OutputText.extend({
    value: null,
    selectOptions: [],

    selectedvalue: Ember.computed('value', 'selectOptions', function () {
        let value = this.get('value');
        if (!Ember.isBlank(value)) {
            let selectOptions = this.get('selectOptions');
            Ember.assert('No selectOptions passed', !Ember.isEmpty(selectOptions));

            let selectedoption = selectOptions.findBy('value', value);

            if (!Ember.isBlank(selectedoption)) {
                if (selectedoption.hasOwnProperty('label')) {
                    return selectedoption.label;
                } else {
                    return selectedoption.value;
                }
            } else {
                return value;
            }
        }
    })
});
