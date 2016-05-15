import Ember from 'ember';

export function getModelName(model){
  return model.constructor.modelName;
}

export function getModelType(modelTypeName, store){
  return store.modelFor(modelTypeName);
}

export function getParentModelTypeName(model, field){
  let relationships = Ember.get(model.constructor, 'relationshipsByName');

  if (relationships.has(field) && relationships.get(field).kind === 'belongsTo') {
    let relationship = relationships.get(field);
    let modelTypeName = relationship.type;
    return modelTypeName;
  }
}

export function getChildModelTypeName(model, field){
  let relationships = Ember.get(model.constructor, 'relationshipsByName');

  if (relationships.has(field) && relationships.get(field).kind === 'hasMany') {
    let relationship = relationships.get(field);
    let modelTypeName = relationship.type;
    return modelTypeName;
  }
}

export function getRelationshipInverse(model, field){
  let relationships = Ember.get(model.constructor, 'relationshipsByName');

  if (relationships.has(field)) {
    let relationship = relationships.get(field);
    Ember.assert(`No explicit inverse relationship defined for ${field} on ${getModelName(model)}`, !Ember.isBlank(relationship.options.inverse));

    return relationship.options.inverse;
  }
}

export function getParentModelType(model, field, store){
  let modelTypeName = getParentModelTypeName(model, field);
  if(!Ember.isBlank(modelTypeName)){
    return getModelType(modelTypeName, store);
  }
}

export function getNameColumn(modelType){
  if(!Ember.isBlank(modelType)){
    if(modelType.hasOwnProperty('settings') && modelType.settings.hasOwnProperty('nameColumn')){
      return modelType.settings.nameColumn;
    } else {
      return 'name';
    }
  }
}

export function getDefaultListViewColumns(modelType) {
  if(!Ember.isBlank(modelType)){
    if(modelType.hasOwnProperty('settings') && modelType.settings.hasOwnProperty('listViews')){
      return modelType.settings.listViews.default.columns;
    } else {
      return [];
    }
  } else {
    return [];
  }
}

export function getPlural(modelType) {
  if(!Ember.isBlank(modelType)){
    if (modelType.hasOwnProperty('settings') && modelType.settings.hasOwnProperty('plural')) {
      return modelType.settings.plural;
    } else {
      return Ember.Inflector.inflector.pluralize(modelType.modelName.capitalize());
    }
  } else {
    return null;
  }
}

export function getLabel(modelType, field){
  if (modelType.hasOwnProperty('settings') && modelType.settings.hasOwnProperty('labels') && modelType.settings.labels[field]) {
    return modelType.settings.labels[field];
  } else {
    return field.capitalize();
  }
}

export function hasWidget(fieldAttributeOptions, widgetName) {
  return !Ember.isBlank(fieldAttributeOptions) && fieldAttributeOptions.hasOwnProperty('widget') && fieldAttributeOptions.widget === widgetName;
}
