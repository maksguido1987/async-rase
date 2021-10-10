import { BaseComponent } from '../../BaseComponents/BaseComponent';
import { Car } from '../../Car/Car';

export class GarageContainer extends BaseComponent {
  car: Car;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['garage-container']);
  }
}
