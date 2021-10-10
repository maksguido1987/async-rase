import { Api } from '../../api';
import { BaseComponent } from '../../BaseComponents/BaseComponent';
import { ControlRace } from './ControlRace';
import { CreateCar } from './CreateCarInput';
import { CreateCarsBtn } from './CreateCarsBtn';
import { UpdateCarInput } from './UpdateCarInput';

export class GarageControlls extends BaseComponent {
  createCar: CreateCar;

  updateCar: UpdateCarInput;

  controlRace: ControlRace;

  createCars: CreateCarsBtn;

  api: Api;

  onCreateNewCar: () => void;

  onUpdateCar: () => void;

  onCreateCars: () => void;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['controlls']);

    this.api = new Api();
    this.createCar = new CreateCar(this.node);
    this.updateCar = new UpdateCarInput(this.node);
    this.controlRace = new ControlRace(this.node);
    this.createCars = new CreateCarsBtn(this.node);
    this.createCar.createCarBtn.onClick = async () => {
      this.onCreateNewCar();
    };
    this.updateCar.updateCarBtn.onClick = async () => {
      this.onUpdateCar();
    };
    this.createCars.createCars.onClick = () => {
      this.onCreateCars();
    };
  }

  disabledElements(): void {
    this.updateCar.nameCarUpdate.input.value = '';
    this.updateCar.colorCarUpdate.input.value = '#000000';
    this.updateCar.nameCarUpdate.setDisableElement('true');
    this.updateCar.updateCarBtn.addDisableBtn();
  }

  getColorValue(): string {
    return this.createCar.colorCar.getInputValue();
  }

  getNameCar(): string {
    return this.createCar.nameCar.getInputValue();
  }

  getUpdateColorValue(): string {
    return this.updateCar.colorCarUpdate.getInputValue();
  }

  getUpdateNameCar(): string {
    return this.updateCar.nameCarUpdate.getInputValue();
  }

  setUpdateOptions(name: string, color: string): void {
    this.updateCar.nameCarUpdate.input.value = name;
    this.updateCar.colorCarUpdate.input.value = color;
    this.updateCar.nameCarUpdate.removeDisableElement();
    this.updateCar.updateCarBtn.removeDisableBtn();
  }
}
