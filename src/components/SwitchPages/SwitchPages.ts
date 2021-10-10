import { BaseButton } from '../BaseComponents/BaseButton';
import { BaseComponent } from '../BaseComponents/BaseComponent';
import './switch-pages.scss';

export class SwitchPages extends BaseComponent {
  readonly prev: BaseButton;

  readonly next: BaseButton;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['switch-pages']);

    this.prev = new BaseButton(this.node, ['prev-page', 'buttons'], 'prev');
    this.next = new BaseButton(this.node, ['next-page', 'buttons'], 'next');
  }

  checkSwitchButtons(limit: number, count: number, page: number): void {
    if (count <= limit) {
      this.next.addDisableBtn();
      this.prev.addDisableBtn();
    } else if (count > limit && page === 1) {
      this.next.removeDisableBtn();
      this.prev.addDisableBtn();
    } else if (count > limit && page > 1) {
      if (Math.ceil(count / limit) === page) {
        this.prev.removeDisableBtn();
        this.next.addDisableBtn();
      } else {
        this.next.removeDisableBtn();
        this.prev.removeDisableBtn();
      }
    }
  }
}
