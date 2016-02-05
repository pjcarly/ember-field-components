import Ember from 'ember';
import EntityRoute from '../mixins/route-entity';

export default Ember.Mixin.create(EntityRoute, {
  actions: {
    updateMainCardMenu: function(menuItems) {
      menuItems.push({
        action: 'edit',
        icon: 'zmdi-edit'
      });
      menuItems.push({
        action: 'delete',
        icon: 'zmdi-delete'
      });
      menuItems.push({
        action: 'index',
        icon: 'zmdi-view-list-alt'
      });
      return true;
    }
  }
});