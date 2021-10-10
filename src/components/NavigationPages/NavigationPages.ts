import { BaseComponent } from '../BaseComponents/BaseComponent';
import './navigation-pages.scss';

export class NavigationPages extends BaseComponent {
  readonly toGarage: BaseComponent;

  readonly toWinners: BaseComponent;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header', ['navigation']);

    this.toGarage = new BaseComponent(this.node, 'a', ['header-buttons', 'buttons'], 'garage');
    this.toWinners = new BaseComponent(this.node, 'a', ['header-buttons', 'buttons'], 'winners');
    this.toGarage.addAttribute('href', '#garage');
    this.toWinners.addAttribute('href', '#winners');
  }
}
