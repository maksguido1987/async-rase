import { Api, ICar, ISpeedAndDist } from '../api';
import { BaseComponent } from '../BaseComponents/BaseComponent';
import './car.scss';
import { CarControl } from './CarControl';
import { CarImage } from './CarImage';

export class Car extends BaseComponent {
  carControl: CarControl;

  carImage: CarImage;

  params: ICar;

  api: Api;

  constructor(parentNode: HTMLElement, params: ICar) {
    super(parentNode, 'div', ['car']);

    this.params = params;
    this.api = new Api();
    this.carControl = new CarControl(this.node);
    this.carImage = new CarImage(this.node);

    this.carControl.start.onClick = async () => {
      this.carControl.start.addDisableBtn();
      this.carControl.stop.removeDisableBtn();
      await this.startCar(this.params.id, this.params.name);
    };

    this.carControl.stop.onClick = async () => {
      this.carControl.start.removeDisableBtn();
      this.carImage.carImageSvg.node.classList.remove('animate');
      this.carImage.carImageSvg.node.style.left = '7%';
      await this.api.stop(this.params.id);
    };
  }

  async startCar(id: number, name: string): Promise<ISpeedAndDist> {
    const respStart: ISpeedAndDist = await this.api.start(id);
    const time = respStart.distance / respStart.velocity / 1000;
    await this.animateCar(time);
    const status = await this.api.drive(id);
    const defaultValue: ISpeedAndDist = {
      velocity: 0,
      distance: 0,
      name,
    };
    if (status === 500) {
      this.carImage.carImageSvg.node.classList.add('paused');
      this.carControl.stop.removeDisableBtn();
      return defaultValue;
    }
    return { ...respStart, name };
  }

  async animateCar(time: number): Promise<void> {
    this.carImage.carImageSvg.node.classList.add('animate');
    this.carImage.carImageSvg.node.style.animationDuration = `${time}s`;
  }

  renderCar(color: string, name: string): void {
    this.carImage.renderCarImage(color);
    this.carImage.renderCarName(name);
  }

  updateCar(color: string, name: string): void {
    this.carImage.renderCarImage(color);
    this.carImage.renderCarName(name);
  }
}
