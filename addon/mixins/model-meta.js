import Ember from 'ember';

export default Ember.Mixin.create({
  settings: {
    listViews: {
      default: {
        columns: ['id', 'name']
      }
    },
    labels: {
      'id': '#',
      'name': 'Name'
    },
    linkFields: ['id', 'name'] // which fields will link to model by clicking on them?
  }
});