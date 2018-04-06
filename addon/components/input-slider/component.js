import Ember from 'ember';

const { Component } = Ember;
const { computed } = Ember;
const { guidFor } = Ember;
const { isBlank } = Ember;

export default Component.extend({
  type: 'slider',
  componentId: computed(function(){
    return guidFor(this)+'-slider';
  }),
  didInsertElement(){
    const slider = this.$('input').slider({
      min: this.get('min'),
      max: this.get('max'),
      step: this.get('sliderStep'),
      value: this.get('value'),
      tooltip: 'show'
    });
    slider.on('slide', this.sliderChanged.bind(this));
    this.set('slider', slider);
  },
  willDestroyElement(){
    this.set('slider', null);
  },
  sliderStep: computed('step', function(){
    const step = this.get('step');

    if(isBlank(step)){
      return 1;
    }

    return step;
  }),
  sliderChanged({value}){
    this.get('valueChanged')(value);
  }
});
