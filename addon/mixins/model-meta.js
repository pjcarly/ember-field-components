import Mixin from '@ember/object/mixin';

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
