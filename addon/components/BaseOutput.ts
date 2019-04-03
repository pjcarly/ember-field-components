import Component from '@ember/component';
import { computed } from '@ember-decorators/object';
import { tagName } from '@ember-decorators/component';

@tagName('')
export default abstract class BaseOutput extends Component {
  /**
   * The type of Input Component. This will be added to the classes later
   */
  type !: string;

  /**
   * The Value of the input component
   */
  value !: any;

  /**
   * The custom class you want to give to the component
   */
  class : string = '';
  options: any = {};

  @computed('type', 'class')
  get computedClass() : string {
    const classes = [];
    classes.push('output');
    classes.push(this.type);

    if(this.class) {
      classes.push(this.class);
    }

    return classes.join(' ');
  }
}
