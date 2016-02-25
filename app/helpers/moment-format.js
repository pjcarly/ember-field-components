import Ember from 'ember';

export default Ember.Helper.helper(function([value, format]) {
  console.log('format: '+format);

  if (Ember.isBlank(value)) {
    return null;
  }

  if (Ember.isBlank(format)) {
    return moment.unix(value).format();
  } else {
    return moment.unix(value).format(format);
  }
});
