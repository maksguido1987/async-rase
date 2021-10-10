import { BaseButton } from '../../BaseComponents/BaseButton';
import { BaseComponent } from '../../BaseComponents/BaseComponent';
import { BaseInput } from '../../BaseComponents/BaseInput';
import '../garage.scss';

export class UpdateCarInput extends BaseComponent {
  nameCarUpdate: BaseInput;

  colorCarUpdate: BaseInput;

  updateCarBtn: BaseButton;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['update-car']);

    this.nameCarUpdate = new BaseInput(this.node, ['update-car-imput', 'input'], 'new car', 'text');
    this.nameCarUpdate.setDisableElement('true');
    this.colorCarUpdate = new BaseInput(this.node, ['color-car-imput', 'input'], '', 'color');
    this.updateCarBtn = new BaseButton(this.node, ['color-car-btn', 'buttons'], 'update');
    this.updateCarBtn.addDisableBtn();
  }
}
