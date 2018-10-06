import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';

export default Mixin.create({
  computedValue: computed('value', {
    get() {
      var value = this.get('value');
      return value;
    },
    set(key, value) {
      const preSetHook = this.get('preSetHook');
      if(!isBlank(preSetHook)){
        value = preSetHook(value);
      }
      this.set('value', value);

      const valueChanged = this.get('valueChanged');

      if(!isBlank(valueChanged)){
        valueChanged(value);
      }

      return value;
    }
  })
});
