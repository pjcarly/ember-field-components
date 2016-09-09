import Ember from 'ember';

export default Ember.Helper.extend({
  compute([value, format]){
    if (Ember.isBlank(value)) {
      return null;
    }

    if (Ember.isBlank(format)) {
      return moment(value).format();
    } else {
      return moment(value).format(format);
    }
  }
});
