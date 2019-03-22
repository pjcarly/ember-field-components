import Transform from 'ember-data/transform';
import moment from 'moment';
import { isBlank } from '@ember/utils';

export default class DateTransform extends Transform {
  deserialize(serialized: any) {
    if(isBlank(serialized)){
      return null;
    }

    return moment(serialized).toDate();
  }

  serialize(deserialized: any) {
    if (isBlank(deserialized)) {
      return null;
    }

    return moment(deserialized).format('YYYY-MM-DD');
  }
}
