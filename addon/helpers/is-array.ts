import Helper from '@ember/component/helper';
import { isArray } from '@ember/array';

export default class IsArrayHelper extends Helper {
  compute([value]: [any]){
    return isArray(value);
  }
}
