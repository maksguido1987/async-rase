import { Garage } from '../Garage/Garage';
import { Winners } from '../Winners/Winners';

export class Router {
  readonly garage: Garage;

  readonly winners: Winners;

  hash: string;

  constructor(garage: Garage, winners: Winners) {
    this.garage = garage;
    this.winners = winners;
    this.hash = '';
    window.onpopstate = () => this.addPage();
  }

  addPage(): void {
    this.hash = window.location.hash.slice(1);
    if (this.hash === 'garage' || '') {
      this.garage.showElement();
      this.winners.hideElement();
    } else if (this.hash === 'winners') {
      this.garage.hideElement();
      this.winners.showElement();
    }
  }
}
