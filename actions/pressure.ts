import api from '../db/db';
import { Pressure } from '../types';

class PressureAction {
  message: string;
  high: number;
  low: number;
  pulse: number;
  meta?: string;
  constructor(message: string) {
    this.message = message;
    const params = this.message.slice(10).split(' ');
    this.high = +params[0];
    this.low = +params[1];
    this.pulse = +params[2];
    [, , , this.meta] = params;
    this.validate();
  }

  private getParams() {
    const params = this.message.slice(10).split(' ');
    return [+params[0], +params[1], +params[2], params[3]];
  }

  private validate() {
    if (!this.message.startsWith('давление: ')) throw new Error('неверный формат');
    const params = this.message.slice(10).split(' ');
    if (params.length < 3) throw new Error('мало параметров');
    if (params.slice(0, 3).some((val) => Number.isNaN(+val))) throw new Error('неверные параметры');
    return true;
  }

  async create() {
    const info: Pressure = {
      high: this.high, low: this.low, pulse: this.pulse, message: this.meta,
    };
    const result = await api.create(info);
    return result;
  }
}

export default PressureAction;
