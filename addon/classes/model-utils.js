import Ember from 'ember';

export function getModelName(model){
  return model.constructor.modelName;
}

export function modelTypeIsCacheable(modelType){
  return modelType.hasOwnProperty('settings') && modelType.settings.hasOwnProperty('cacheable') && modelType.settings.cacheable;
}

export function modelTypeWasLoaded(modelType){
  modelType.settings.loadedFromCache = true;
}

export function modelTypeHasBeenLoadedFromCache(modelType){
  return modelType.settings.hasOwnProperty('loadedFromCache') && modelType.settings.loadedFromCache;
}

export function getParentRoute(model){
  return model.constructor.parentRoute;
}

export function getModelType(modelTypeName, store){
  return store.modelFor(modelTypeName);
}

export function hasRoute(modelType){
  return !(modelType.hasOwnProperty('settings') && modelType.settings.hasOwnProperty('noRoute') && modelType.settings.noRoute);
}

export function getParentModelTypeName(model, field){
  const relationships = Ember.get(model.constructor, 'relationshipsByName');

  if (relationships.has(field) && relationships.get(field).kind === 'belongsTo') {
    const relationship = relationships.get(field);
    Ember.assert(`Relationship ${field} for ${model.constructor} is a polymorphic relationship, use getParentModelTypeNames function instead`, !relationship.options.polymorphic);
    return relationship.type;
  }
}

export function getParentModelTypeNames(model, field, store){
  const relationships = Ember.get(model.constructor, 'relationshipsByName');

  if (relationships.has(field) && relationships.get(field).kind === 'belongsTo') {
    const relationship = relationships.get(field);
    Ember.assert(`Relationship ${field} for ${model.constructor} is not polymorphic relationship, use getParentModelTypeName function instead`, relationship.options.polymorphic);

    const polymorphicModelType = store.modelFor(relationship.type);
    return this.getAllowedPolymorphicModelTypeNames(polymorphicModelType);
  }
}

export function getChildModelTypeName(model, field){
  const relationships = Ember.get(model.constructor, 'relationshipsByName');

  if (relationships.has(field) && relationships.get(field).kind === 'hasMany') {
    const relationship = relationships.get(field);
    return relationship.type;
  }
}

export function getRelationshipInverse(model, field){
  const relationships = Ember.get(model.constructor, 'relationshipsByName');

  if (relationships.has(field)) {
    const relationship = relationships.get(field);
    Ember.assert(`No explicit inverse relationship defined for ${field} on ${getModelName(model)}`, !Ember.isBlank(relationship.options.inverse));

    return relationship.options.inverse;
  }
}

export function getParentModelType(model, field, store){
  const modelTypeName = getParentModelTypeName(model, field);
  if(!Ember.isBlank(modelTypeName)){
    return getModelType(modelTypeName, store);
  }
}

export function getDefaultIncludes(modelType){
  if(!Ember.isBlank(modelType)){
    if(modelType.settings.defaultIncludes){
      return modelType.settings.defaultIncludes;
    } else {
      return [];
    }
  }
}

export function getAllowedPolymorphicModelTypeNames(modelType){
  if(!Ember.isBlank(modelType)){
    if(modelType.settings.allowedModelTypes){
      return modelType.settings.allowedModelTypes;
    } else {
      return [];
    }
  }
}

export function getDefaultListViewColumns(modelType) {
  if(!Ember.isBlank(modelType)){
    if(modelType.settings.listViews){
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
    if (modelType.settings.plural) {
      return modelType.settings.plural;
    } else {
      return Ember.Inflector.inflector.pluralize(Ember.String.capitalize(modelType.modelName));
    }
  } else {
    return null;
  }
}

export function getLabel(modelType, field){
  if (modelType.settings.labels && modelType.settings.labels[field]) {
    return modelType.settings.labels[field];
  } else {
    return Ember.String.capitalize(field);
  }
}

export function hasWidget(fieldAttributeOptions, widgetName) {
  return !Ember.isBlank(fieldAttributeOptions) && fieldAttributeOptions.hasOwnProperty('widget') && fieldAttributeOptions.widget === widgetName;
}
