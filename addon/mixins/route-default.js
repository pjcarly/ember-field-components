import Ember from 'ember';

export default Ember.Mixin.create({
  setPageTitle: function(title) {
    this.controllerFor('application').setPageTitle(title);
  }
});