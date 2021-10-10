import { BaseButton } from '../BaseComponents/BaseButton';
import { BaseComponent } from '../BaseComponents/BaseComponent';

export class CarControl extends BaseComponent {
  topButtons: BaseComponent;

  select: BaseButton;

  remove: BaseButton;

  bottomButtons: BaseComponent;

  start: BaseButton;

  stop: BaseButton;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['car-control']);

    this.topButtons = new BaseComponent(this.node, 'div', ['top-buttons']);
    this.bottomButtons = new BaseComponent(this.node, 'div', ['bottom-buttons']);
    this.select = new BaseButton(this.topButtons.node, ['select-car', 'buttons'], 'select');
    this.remove = new BaseButton(this.topButtons.node, ['remove-car', 'buttons'], 'remove');
    this.start = new BaseButton(this.bottomButtons.node, ['start-car', 'buttons'], 'A');
    this.stop = new BaseButton(this.bottomButtons.node, ['stop-car', 'buttons'], 'B');
    this.stop.addDisableBtn();
  }
}
