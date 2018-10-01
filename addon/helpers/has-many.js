import Helper from '@ember/component/helper';

export default Helper.extend({
  compute([model, field]){
    return model.hasMany(field).value();
  }
});
