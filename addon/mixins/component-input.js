import Ember from 'ember';

export default Ember.Mixin.create({
  init: function(){
    this._super(...arguments);

    // let classes = this.get('class');
    // if(Ember.isBlank(classes)){
    //   this.classNameBindings = [];
    // } else {
    //   this.classNameBindings = classes.split(' ');
    // }
  },
  classNameBindings: ['defaultClassName', 'type', 'isInputGroup:input-group'],
  defaultClassName: 'input',
  tagName: 'span',
  hasInputButton: false,
  type: null,
  prefix: null,
  suffix: null,
  hasPrefix: Ember.computed('prefix', function(){
    return !Ember.isBlank(this.get('prefix'));
  }),
  hasSuffix: Ember.computed('suffix', function(){
    return !Ember.isBlank(this.get('suffix'));
  }),
  isInputGroup: Ember.computed('hasPrefix', 'hasSuffix', 'hasInputButton', function(){
    return this.get('hasPrefix') || this.get('hasSuffix') || this.get('hasInputButton');
  })
});
