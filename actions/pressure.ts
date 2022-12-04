import api from '../db/connection';
import { Pressure } from '../types';
import { ValidationError } from '../utils/errors';

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
    if (!this.message.startsWith('давление: ')) throw new ValidationError();
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
