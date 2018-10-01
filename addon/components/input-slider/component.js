import Ember from 'ember';

import Component from '@ember/component';
import { computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { isBlank } from '@ember/utils';

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
