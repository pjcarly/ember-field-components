import Component from '@ember/component';

export default Component.extend({
  tagName: 'div',
  classNames: ['object-list'],
  noresults: 'No Results',

  actions: {
    objectSelected(object) {
      const objectSelected = this.get('objectSelected');
      if(objectSelected){
        objectSelected(object);
      }
    },
    new() {
      const newModel = this.get('newModel');
      if(newModel){
        newModel();
      }
    }
  }
});
