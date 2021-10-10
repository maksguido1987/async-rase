import { BaseComponent } from '../BaseComponents/BaseComponent';

export class PageWinners extends BaseComponent {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'span', ['page-winners']);
  }

  setNumberPage(num: number): void {
    this.node.textContent = `Page #${num}`;
  }
}
