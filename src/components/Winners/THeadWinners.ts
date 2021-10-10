import { BaseButton } from '../BaseComponents/BaseButton';
import { BaseComponent } from '../BaseComponents/BaseComponent';

export class THeadWinners extends BaseComponent {
  numberWin: BaseComponent;

  carWin: BaseComponent;

  nameWin: BaseComponent;

  wins: BaseButton;

  bestTime: BaseButton;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['t-head-winners']);

    this.numberWin = new BaseComponent(this.node, 'span', ['number-win'], '№');
    this.carWin = new BaseComponent(this.node, 'span', ['car-win'], 'car');
    this.nameWin = new BaseComponent(this.node, 'span', ['name-win'], 'name');
    this.wins = new BaseButton(this.node, ['wins'], 'wins');
    this.bestTime = new BaseButton(this.node, ['best-time'], 'Best time(sec)');
  }
}
