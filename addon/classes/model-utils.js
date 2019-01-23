import { pluralize } from 'ember-inflector';
import { isBlank } from '@ember/utils';
import { get } from '@ember/object';
import { assert } from '@ember/debug';
import { capitalize } from '@ember/string';

export function getModelName(model){
  return model.constructor.modelName;
}

export function getModelType(modelTypeName, store){
  return store.modelFor(modelTypeName);
}

export function getParentModelTypeName(model, field){
  const relationships = get(model.constructor, 'relationshipsByName');

  if (relationships.has(field) && relationships.get(field).kind === 'belongsTo') {
    const relationship = relationships.get(field);
    assert(`Relationship ${field} for ${model.constructor} is a polymorphic relationship, use getParentModelTypeNames function instead`, !relationship.options.polymorphic);
    return relationship.type;
  }
}

export function getParentModelTypeNames(model, field){
  const relationships = get(model.constructor, 'relationshipsByName');

  if (relationships.has(field) && relationships.get(field).kind === 'belongsTo') {
    const relationship = relationships.get(field);
    assert(`Relationship ${field} for ${getModelName(model)} is not polymorphic relationship, use getParentModelTypeName function instead`, relationship.options.polymorphic);
    assert(`Relationship ${field} for ${getModelName(model)} should have the key allowedModelTypes defined which should return an array with string values`, !isBlank(relationship.options.allowedModelTypes));

    const allowedModelTypeNames = relationship.options.allowedModelTypes;
    return allowedModelTypeNames;
  }
}

export function getChildModelTypeName(model, field){
  const relationships = get(model.constructor, 'relationshipsByName');

  if (relationships.has(field) && relationships.get(field).kind === 'hasMany') {
    const relationship = relationships.get(field);
    return relationship.type;
  }
}

export function getRelationshipInverse(model, field){
  const relationships = get(model.constructor, 'relationshipsByName');

  if (relationships.has(field)) {
    const relationship = relationships.get(field);
    assert(`No explicit inverse relationship defined for ${field} on ${getModelName(model)}`, !isBlank(relationship.options.inverse));

    return relationship.options.inverse;
  }
}

export function getParentModelType(model, field, store){
  const modelTypeName = getParentModelTypeName(model, field);
  if(!isBlank(modelTypeName)){
    return getModelType(modelTypeName, store);
  }
}

export function getDefaultIncludes(modelType){
  if(!isBlank(modelType)){
    if(modelType.settings.defaultIncludes){
      return modelType.settings.defaultIncludes;
    } else {
      return [];
    }
  }
}

export function getModelListView(modelType, name) {
  if(!isBlank(modelType)){
    if(modelType.settings.listViews){
      if(isBlank(name)){
        return modelType.settings.listViews.default;
      } else {
        return modelType.settings.listViews[name];
      }
    } else {
      return [];
    }
  } else {
    return [];
  }
}

export function hasWidget(fieldAttributeOptions, widgetName) {
  return !isBlank(fieldAttributeOptions) && fieldAttributeOptions.hasOwnProperty('widget') && fieldAttributeOptions.widget === widgetName;
}

export function getWidgetOptions(fieldAttributeOptions) {
  if(!isBlank(fieldAttributeOptions) && fieldAttributeOptions.hasOwnProperty('widgetOptions')){
    return fieldAttributeOptions.widgetOptions;
  } else {
    return null;
  }
}
