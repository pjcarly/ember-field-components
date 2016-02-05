import Ember from 'ember';
import EntityRoute from '../mixins/route-entity';

export default Ember.Mixin.create(EntityRoute, {
  model: function() {
    var entityName = this.get('entityName');
    return this.store.findAll(entityName);
  }
});