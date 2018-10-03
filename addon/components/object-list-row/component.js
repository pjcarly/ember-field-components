import Component from '@ember/component';

export default Component.extend({
  tagName: 'tr',
  classNames: ['object-list-row'],

  object: null,
  columns: [],

  actions: {
    click() {
      const objectSelected = this.get('objectSelected');
      if(objectSelected){
        objectSelected(this.get('object'));
      }
    }
  }
});
