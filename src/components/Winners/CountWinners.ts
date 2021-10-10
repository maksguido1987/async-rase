import { BaseComponent } from '../BaseComponents/BaseComponent';

export class CountWinners extends BaseComponent {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'span', ['count-winners']);
  }
}
