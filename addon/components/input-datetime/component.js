import Component from '@ember/component';
import InputComponent from '../../mixins/component-input';
import InputMomentFormat from '../../mixins/component-input-moment-format';

export default Component.extend(InputComponent, InputMomentFormat, {
  type: 'datetime',
  momentFormat: 'YYYY-MM-DDTHH:mm:ss'
});
