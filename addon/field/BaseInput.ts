import Component from '@ember/component';

export default class BaseInput extends Component {
  tagName = '';

  type !: string;

  constructor(type: string){
    super();
    this.type = type;
  }
}
