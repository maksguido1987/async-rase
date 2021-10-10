import { BaseButton } from '../BaseComponents/BaseButton';
import { BaseComponent } from '../BaseComponents/BaseComponent';

export class WinnerPopup extends BaseComponent {
  winnerInfo: BaseComponent;

  winnerText: BaseComponent;

  winnerOk: BaseButton;

  onHideWinnerPopup: () => void;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['winner-popup']);

    this.winnerInfo = new BaseComponent(this.node, 'div', ['winner-info']);
    this.winnerText = new BaseComponent(this.winnerInfo.node, 'div', ['winner-text']);
    this.winnerOk = new BaseButton(this.winnerInfo.node, ['winner-ok'], 'Ok');
    this.winnerOk.onClick = () => {
      this.onHideWinnerPopup();
    };
  }

  showWinnerPopup(name: string, time: number): void {
    this.showElement();
    this.winnerText.node.textContent = `Won ${name}, best time ${time}sec!`;
  }
}
