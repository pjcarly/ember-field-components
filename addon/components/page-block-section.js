import Ember from 'ember';
import PageBlockComponent from '../components/page-block-component';

export default PageBlockComponent.extend({
  hasTitle: Ember.computed('title', function() {
    return !Ember.isBlank(this.get('title'));
  }),
  hasNoTitle: Ember.computed('hasTitle', function() {
    return !this.get('hasTitle');
  })
});