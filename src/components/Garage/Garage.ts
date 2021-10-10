import { Api, ICar, ISpeedAndDist } from '../api';
import { BaseComponent } from '../BaseComponents/BaseComponent';
import { Car } from '../Car/Car';
import { GarageShowPages } from './GarageControls/GarageShowPages';
import { GarageControlls } from './GarageControls/GarageControls';
import { GarageContainer } from './GarageControls/GarageConatainer';
import { SwitchPages } from '../SwitchPages/SwitchPages';
import { RandomCars } from './GarageControls/RandomCars';
import { WinnerPopup } from './WinnerPopup';

export class Garage extends BaseComponent {
  private garageControls: GarageControlls;

  private garageContainer: GarageContainer;

  private garageShowPages: GarageShowPages;

  car: Car;

  winnerPopup: WinnerPopup;

  readonly switchPages: SwitchPages;

  readonly api: Api;

  readonly randomCars: RandomCars;

  page: number;

  numOfCars: number;

  carsInGarage: number;

  arrCars: Array<Car>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'main', ['main-garage']);

    this.carsInGarage = 0;
    this.numOfCars = 7;
    this.page = 1;
    this.garageControls = new GarageControlls(this.node);
    this.garageContainer = new GarageContainer(this.node);
    this.switchPages = new SwitchPages(this.node);
    this.garageShowPages = new GarageShowPages(this.garageControls.node);
    this.winnerPopup = new WinnerPopup(this.node);
    this.api = new Api();
    this.randomCars = new RandomCars();
    this.winnerPopup.hideElement();
    this.getCurrentPage(this.page);

    this.winnerPopup.onHideWinnerPopup = () => {
      this.winnerPopup.hideElement();
    };

    this.garageControls.onCreateNewCar = async (): Promise<void> => {
      const params: ICar = {
        name: this.garageControls.getNameCar(),
        color: this.garageControls.getColorValue(),
      };
      await this.api.createCar(params);
      this.garageControls.createCar.clearName();
      this.garageControls.createCar.clearColor();
      this.getCurrentPage(this.page);
    };

    this.garageControls.onCreateCars = async (): Promise<void> => {
      for (let i = 0; i < 100; i += 1) {
        const params: ICar = {
          color: this.randomCars.createRandomColor(),
          name: this.randomCars.createRandomName(),
        };
        this.api.createCar(params);
      }
      this.getCurrentPage(this.page);
    };

    this.switchPages.next.onClick = async () => {
      this.garageShowPages.numberPage.node.textContent = `Page ( #${++this.page} )`;
      this.getCurrentPage(this.page);
    };
    this.switchPages.prev.onClick = async () => {
      this.garageShowPages.numberPage.node.textContent = `Page ( #${--this.page} )`;
      this.getCurrentPage(this.page);
    };

    this.garageControls.controlRace.onResetRaceTrack = () => {
      this.arrCars.forEach(async (item) => {
        item.carImage.carImageSvg.node.classList.remove('animate');
        item.carImage.carImageSvg.node.classList.remove('paused');
        await this.api.stop(item.params.id);
      });
    };

    this.garageControls.controlRace.onStartCars = async () => {
      await this.startCars();
    };
  }

  async startCars(): Promise<void> {
    const arrayFunctionRace: Array<Promise<ISpeedAndDist>> = [];
    this.arrCars.forEach(async (car) => {
      arrayFunctionRace.push(car.startCar(car.params.id, car.params.name));
    });
    const time = (await Promise.all(arrayFunctionRace)).map((item) =>
      item.velocity && item.distance ? item.distance / item.velocity / 1000 : 0
    );
    const timeSorted = time.filter((item) => item !== 0).sort((a, b) => a - b);
    const name = (await Promise.all(arrayFunctionRace))
      .filter((item) => item.distance / item.velocity / 1000 === timeSorted[0])
      .map((item) => item.name);
    const winId = this.arrCars.filter((item) => item.params.name === name[0]).map((item) => item.params.id)[0];
    const theBestTime = Number(timeSorted[0].toString().slice(0, 4));
    this.winnerPopup.showWinnerPopup(name[0], theBestTime);
    this.checkWinner(winId, theBestTime);
  }

  async checkWinner(id: number, time: number): Promise<void> {
    const status = await this.api.getWinnerStatus(id);
    if (status === 404) {
      await this.api.createWinner({
        id,
        wins: 1,
        time,
      });
    } else {
      const winner = await this.api.getWinner(id);
      await this.api.updateWinner(id, {
        id,
        wins: winner.wins + 1,
        time: time < winner.time ? time : winner.time,
      });
    }
  }

  deleteCar(id: number): void {
    this.car.carControl.remove.onClick = async () => {
      await this.api.deleteCar(id);
      await this.api.deleteWinner(id);
      this.getCurrentPage(this.page);
    };
  }

  updateCar(params: ICar): void {
    this.car.carControl.select.onClick = () => {
      this.garageControls.setUpdateOptions(params.name, params.color);
      this.garageControls.onUpdateCar = async () => {
        params.name = this.garageControls.getUpdateNameCar();
        params.color = this.garageControls.getUpdateColorValue();
        await this.api.updateCar(params.id, params);
        this.garageControls.disabledElements();
        this.getCurrentPage(this.page);
      };
    };
  }

  renderCars(data: ICar[]): void {
    this.garageContainer.node.innerHTML = '';
    this.arrCars = [];
    data.forEach((car) => {
      this.car = new Car(this.garageContainer.node, car);
      this.car.renderCar(car.color, car.name);
      this.updateCar(car);
      this.deleteCar(car.id);
      this.arrCars.push(this.car);
    });
  }

  async getCurrentPage(numberPage: number): Promise<void> {
    const data = await this.api.getCars(numberPage);
    this.renderCars(data.items);
    this.carsInGarage = data.count;
    this.switchPages.checkSwitchButtons(this.numOfCars, this.carsInGarage, this.page);
    this.garageShowPages.allCars.node.textContent = `Garage ( ${this.carsInGarage} )`;
  }
}
