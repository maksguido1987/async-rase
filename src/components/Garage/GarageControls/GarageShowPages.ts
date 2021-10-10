import { BaseComponent } from '../../BaseComponents/BaseComponent';

export class GarageShowPages extends BaseComponent {
  allCars: BaseComponent;

  numberPage: BaseComponent;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['control-pages']);

    this.allCars = new BaseComponent(this.node, 'div', ['all-cars']);
    this.numberPage = new BaseComponent(this.node, 'div', ['number-page'], `Page ( #1 )`);
  }
}
