/* global moment: true */
import Ember from 'ember';
import DS from 'ember-data';

export default DS.Transform.extend({
    deserialize: function (serialized) {
        if (Ember.isEmpty(serialized)) {
            serialized = null;
        }

        return moment(serialized).unix();
    },
    serialize: function (deserialized) {
        var serialized = null,
            dateTime = moment.unix(deserialized);

        if (dateTime.isValid()) {
            dateTime = dateTime.toISOString();
        }

        return dateTime;
    }
});
