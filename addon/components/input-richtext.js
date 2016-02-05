import Ember from 'ember';
import InputComponent from '../mixins/component-input';

export default Ember.Component.extend(InputComponent, {
  pen: null,
  selector: '[data-toggle="pen"]',

  didInsertElement: function() {
    alert('hello');
    var selector = this.get('selector');
    var element = this.$(selector);
    var domElement = this.$(selector).get(0);
    element.html(this.get('value'));

    var options = {
      // toolbar: document.getElementById('custom-toolbar'),
      editor: domElement,
      list: [
        'insertimage', 'blockquote', 'h2', 'h3', 'p', 'code', 'insertorderedlist', 'insertunorderedlist', 'inserthorizontalrule',
        'indent', 'outdent', 'bold', 'italic', 'underline', 'createlink'
      ]
    };

    var pen = new Pen(options);
    this.set('pen', pen);

    pen._events.change.push(this.contentChanged.bind(this));
  },

  contentChanged: function() {
    var selector = this.get('selector');
    var element = this.$(selector);

    this.set('value', element.html());
    this.sendAction('valueChanged', this.get('value'));
  }
});
