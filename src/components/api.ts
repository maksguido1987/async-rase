export interface ICar {
  name: string;
  color: string;
  id?: number;
}

export interface IAllCars {
  items: Array<ICar>;
  count: number;
}

export interface ICarWin {
  id: number;
  wins?: number;
  time: number;
}

export interface ICarWinAndCar {
  id: number;
  wins?: number;
  time: number;
  car?: ICar;
}

export interface ICarsWin {
  items: ICarWin[];
  count: number;
}

export interface IWinners {
  page: number;
  limit?: number;
  sort: string;
  order: string;
}

export interface ISpeedAndDist {
  velocity: number;
  distance: number;
  name?: string;
}

export class Api {
  readonly baseURL: string;

  readonly garage: string;

  readonly engine: string;

  readonly winners: string;

  constructor() {
    this.baseURL = 'http://127.0.0.1:3000';
    this.garage = `${this.baseURL}/garage`;
    this.engine = `${this.baseURL}/engine`;
    this.winners = `${this.baseURL}/winners`;
  }

  async getCars(page: number, limit = 7): Promise<IAllCars> {
    const res = await fetch(`${this.garage}?_page=${page}&_limit=${limit}`);
    return {
      items: await res.json(),
      count: Number(res.headers.get('X-Total-Count')),
    };
  }

  async getCar(id: number): Promise<ICar> {
    const res = await fetch(`${this.garage}/${id}`);
    return res.json();
  }

  async createCar(newCar: ICar): Promise<JSON> {
    const res = await fetch(`${this.garage}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCar),
    });
    return res.json();
  }

  async deleteCar(id: number): Promise<JSON> {
    const res = await fetch(`${this.garage}/${id}`, {
      method: 'DELETE',
    });
    const car = await res.json();
    return car;
  }

  async updateCar(id: number, newCar: ICar): Promise<JSON> {
    const res = await fetch(`${this.garage}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCar),
    });
    const car = await res.json();
    return car;
  }

  async start(id: number): Promise<{ velocity: number; distance: number }> {
    const res = await fetch(`${this.engine}?id=${id}&status=started`);
    const data = await res.json();
    return data;
  }

  async stop(id: number): Promise<{ velocity: number; distance: number }> {
    const res = await fetch(`${this.engine}?id=${id}&status=stopped`);
    const data = await res.json();
    return data;
  }

  async drive(id: number): Promise<number> {
    const result = await fetch(`${this.engine}?id=${id}&status=drive`).catch();
    return result.status;
  }

  async getWinners(page: number, limit = 10, sort: string, order: string): Promise<ICarsWin> {
    const sorted = `&_sort=${sort}&_order=${order}`;
    const res = await fetch(`${this.winners}?_page=${page}&_limit=${limit}${sorted}`);
    const items: ICarWinAndCar[] = await res.json();

    return {
      items: await Promise.all(items.map(async (winner) => ({ ...winner, car: await this.getCar(winner.id) }))),
      count: Number(res.headers.get('X-Total-Count')),
    };
  }

  async getWinner(id: number): Promise<ICarWin> {
    const res = await (await fetch(`${this.winners}/${id}`)).json();
    return res;
  }

  async getWinnerStatus(id: number): Promise<number> {
    const res = (await fetch(`${this.winners}/${id}`)).status;
    return res;
  }

  async deleteWinner(id: number): Promise<JSON> {
    const res = await (await fetch(`${this.winners}/${id}`, { method: 'DELETE' })).json();
    return res;
  }

  async createWinner(carWin: ICarWin): Promise<ICarWin> {
    const res = await fetch(`${this.winners}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carWin),
    });
    const car = await res.json();
    return car;
  }

  async updateWinner(id: number, carWin: ICarWin): Promise<ICarWin> {
    const res = await fetch(`${this.winners}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carWin),
    });
    const car = await res.json();
    return car;
  }
}
