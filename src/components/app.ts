import { Garage } from './Garage/Garage';
import { Winners } from './Winners/Winners';
import { NavigationPages } from './NavigationPages/NavigationPages';
import { Router } from './BaseComponents/Router';
import { Api } from './api';

export class App {
  navigatePages: NavigationPages;

  garage: Garage;

  winners: Winners;

  router: Router;

  api: Api;

  constructor(readonly rootElement: HTMLElement) {
    this.navigatePages = new NavigationPages(this.rootElement);
    this.garage = new Garage(this.rootElement);
    this.winners = new Winners(this.rootElement);
    this.router = new Router(this.garage, this.winners);
    this.winners.hideElement();
    this.router.addPage();
    this.navigatePages.toWinners.node.onclick = () => {
      this.winners.getPageWinners(
        this.winners.winnerPage,
        this.winners.numOfWinners,
        this.winners.sort,
        this.winners.order
      );
    };
  }
}
