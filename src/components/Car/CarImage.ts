import { getBigImageCar } from '../../variables';
import { BaseComponent } from '../BaseComponents/BaseComponent';

export class CarImage extends BaseComponent {
  readonly carName: BaseComponent;

  readonly carImageSvg: BaseComponent;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['car-image']);

    this.carName = new BaseComponent(this.node, 'span', ['car-name']);
    this.carImageSvg = new BaseComponent(this.node, 'div', ['car-image-wrapper']);
  }

  renderCarImage(color: string): void {
    this.carImageSvg.node.innerHTML = getBigImageCar(color);
  }

  renderCarName(name: string): void {
    this.carName.node.textContent = name;
  }
}
