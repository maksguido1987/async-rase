import { getSmallImageCar } from '../../variables';
import { BaseComponent } from '../BaseComponents/BaseComponent';

export class Winner extends BaseComponent {
  number: BaseComponent;

  car: BaseComponent;

  name: BaseComponent;

  wins: BaseComponent;

  time: BaseComponent;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['winner']);

    this.number = new BaseComponent(this.node, 'div', ['winner-number']);
    this.car = new BaseComponent(this.node, 'div', ['winner-car']);
    this.name = new BaseComponent(this.node, 'div', ['winner-name'], 'sddds');
    this.wins = new BaseComponent(this.node, 'div', ['winner-wins']);
    this.time = new BaseComponent(this.node, 'div', ['winner-time']);
  }

  renderWinner(n: number, color: string, name: string, wins: number, time: number): void {
    this.number.node.textContent = `${n}`;
    this.renderCarImage(color);
    this.name.node.textContent = name;
    this.wins.node.textContent = `${wins}`;
    this.time.node.textContent = `${time}`;
  }

  renderCarImage(color: string): void {
    this.car.node.innerHTML = getSmallImageCar(color);
  }
}
