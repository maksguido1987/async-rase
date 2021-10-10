import { Api } from '../../api';
import { BaseButton } from '../../BaseComponents/BaseButton';
import { BaseComponent } from '../../BaseComponents/BaseComponent';
import { BaseInput } from '../../BaseComponents/BaseInput';
import '../garage.scss';

export class CreateCar extends BaseComponent {
  nameCar: BaseInput;

  colorCar: BaseInput;

  createCarBtn: BaseButton;

  api: Api;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['create-car']);

    this.api = new Api();
    this.nameCar = new BaseInput(this.node, ['create-car-imput', 'input'], 'car name', 'text');
    this.colorCar = new BaseInput(this.node, ['color-car-imput', 'input'], '', 'color');
    this.createCarBtn = new BaseButton(this.node, ['color-car-btn', 'buttons'], 'create');
  }

  clearColor(): void {
    this.colorCar.input.value = '#000000';
  }

  clearName(): void {
    this.nameCar.input.value = '';
  }
}
