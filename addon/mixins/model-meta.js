import Ember from 'ember';

const { Mixin } = Ember;

export default Mixin.create({
  settings: {
    listViews: {
      default: {
        columns: ['id', 'name']
      }
    },
    labels: {
      'id': '#',
      'name': 'Name'
    }
  }
});
