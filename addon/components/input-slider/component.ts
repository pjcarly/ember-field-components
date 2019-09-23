import BaseInput from '../BaseInput';
import { computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { isBlank } from '@ember/utils';

declare global {
  interface JQuery {
    slider(): JQuery;
    slider(options: any): JQuery;
  }
}

export default class InputSliderComponent extends BaseInput {
  type = 'slider';

  slider: JQuery | undefined;

  didInsertElement() {
    super.didInsertElement();

    const domElement = $(`#${this.inputIdComputed}`);
    const options = {
      min: this.min,
      max: this.max,
      step: this.step,
      value: this.computedValue,
      tooltip: this.tooltip
    }

    const slider = domElement.slider(options);
    slider.on('slide', this.sliderChanged.bind(this)).data('slider');

    this.slider = slider;
  }

  willDestroyElement() {
    super.willDestroyElement();

    this.slider = undefined;
  }

  @computed('inputId')
  get inputIdComputed() : string {
    if(!isBlank(this.inputId)) {
      return this.inputId;
    } else {
      return `${guidFor(this)}-select`;
    }
  }

  @computed('options.min')
  get min() : number {
    return ( this.options && ( this.options.min || this.options.min === 0)) ? this.options.min : 0;
  }

  @computed('options.max')
  get max() : number {
    return ( this.options && ( this.options.max || this.options.max === 0)) ? this.options.max : 100;
  }

  @computed('options.step')
  get step() : number {
    return ( this.options && this.options.step > 0) ? this.options.step : 1;
  }

  @computed('options.tooltip')
  get tooltip() : string {
    return this.options && this.options.tooltip ? this.options.tooltip : 'show';
  }

  sliderChanged({value}: any) {
    this.computedValue = value;
  }
}
