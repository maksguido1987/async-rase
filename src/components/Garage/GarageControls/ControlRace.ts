import { BaseButton } from '../../BaseComponents/BaseButton';
import { BaseComponent } from '../../BaseComponents/BaseComponent';

export class ControlRace extends BaseComponent {
  race: BaseButton;

  reset: BaseButton;

  onResetRaceTrack: () => void;

  onStartCars: () => void;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['control-race']);

    this.race = new BaseButton(this.node, ['race-btn', 'buttons'], 'race');
    this.reset = new BaseButton(this.node, ['reset-btn', 'buttons'], 'reset');
    this.reset.onClick = async () => {
      this.onResetRaceTrack();
    };
    this.race.onClick = async () => {
      this.onStartCars();
    };
  }
}
