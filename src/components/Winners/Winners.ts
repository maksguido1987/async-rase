import { Api, ICarWinAndCar } from '../api';
import { BaseComponent } from '../BaseComponents/BaseComponent';
import { SwitchPages } from '../SwitchPages/SwitchPages';
import { CountWinners } from './CountWinners';
import { PageWinners } from './PagesWinners';
import { THeadWinners } from './THeadWinners';
import { Winner } from './Winner';
import './winners.scss';

export class Winners extends BaseComponent {
  showCountWinners: CountWinners;

  pageWinners: PageWinners;

  tHeadWinner: THeadWinners;

  winnersWrapper: BaseComponent;

  readonly switchPages: SwitchPages;

  winner: Winner;

  api: Api;

  winnerPage: number;

  order: string;

  sort: string;

  numOfWinners: number;

  countWinners: number;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['winners']);

    this.order = 'ASC';
    this.sort = 'time';
    this.countWinners = 0;
    this.numOfWinners = 10;
    this.winnerPage = 1;
    this.showCountWinners = new CountWinners(this.node);
    this.pageWinners = new PageWinners(this.node);
    this.tHeadWinner = new THeadWinners(this.node);
    this.winnersWrapper = new BaseComponent(this.node);
    this.switchPages = new SwitchPages(this.node);
    this.api = new Api();
    this.winner = new Winner(this.winnersWrapper.node);
    this.pageWinners.setNumberPage(this.winnerPage);
    this.getPageWinners(this.winnerPage, this.numOfWinners, this.sort, this.order);

    this.tHeadWinner.wins.onClick = () => {
      this.sort = 'wins';
      if (this.order === 'ASC') {
        this.order = 'DESC';
        this.getPageWinners(this.winnerPage, this.numOfWinners, this.sort, this.order);
      } else if (this.order === 'DESC') {
        this.order = 'ASC';
        this.getPageWinners(this.winnerPage, this.numOfWinners, this.sort, this.order);
      }
    };

    this.tHeadWinner.bestTime.onClick = () => {
      this.sort = 'time';
      if (this.order === 'ASC') {
        this.order = 'DESC';
        this.getPageWinners(this.winnerPage, this.numOfWinners, this.sort, this.order);
      } else if (this.order === 'DESC') {
        this.order = 'ASC';
        this.getPageWinners(this.winnerPage, this.numOfWinners, this.sort, this.order);
      }
    };

    this.switchPages.next.onClick = () => {
      this.pageWinners.node.textContent = `Page #${++this.winnerPage}`;
      this.getPageWinners(this.winnerPage, this.numOfWinners, this.sort, this.order);
    };
    this.switchPages.prev.onClick = () => {
      this.switchPages.prev.removeDisableBtn();
      this.pageWinners.node.textContent = `Page #${--this.winnerPage}`;
      this.getPageWinners(this.winnerPage, this.numOfWinners, this.sort, this.order);
    };
  }

  renderCars(data: ICarWinAndCar[]): void {
    this.winnersWrapper.node.innerHTML = '';
    let count = 1;
    data.forEach((win) => {
      this.winner = new Winner(this.winnersWrapper.node);
      this.winner.renderWinner(count++, win.car.color, win.car.name, win.wins, win.time);
    });
  }

  async getPageWinners(page: number, limit: number, sort: string, order: string): Promise<void> {
    const data = await this.api.getWinners(page, limit, sort, order);
    this.renderCars(data.items);
    this.countWinners = data.count;
    this.switchPages.checkSwitchButtons(this.numOfWinners, this.countWinners, this.winnerPage);
    this.showCountWinners.node.textContent = `Winners ( ${this.countWinners} )`;
  }
}
