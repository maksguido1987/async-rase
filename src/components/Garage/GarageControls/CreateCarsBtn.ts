import { BaseButton } from '../../BaseComponents/BaseButton';
import { BaseComponent } from '../../BaseComponents/BaseComponent';

export class CreateCarsBtn extends BaseComponent {
  createCars: BaseButton;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['create-cars']);

    this.createCars = new BaseButton(this.node, ['create-cars-btn', 'buttons'], 'create-cars');
  }
}
