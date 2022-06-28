import api from '../api/sheets';
import { Pressure } from '../types';

function getDate() {
  return `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`;
}

class PressureMessage {
  message: string;
  high: string;
  low: string;
  pulse: string;
  meta?: string;
  constructor(message: string) {
    this.message = message;
    [this.high, this.low, this.pulse, this.meta] = this.getParams();
    this.validate();
  }

  private getParams() {
    return this.message.slice(10).split(' ');
  }

  private validate() {
    if (!this.message.startsWith('давление: ')) throw new Error('неверный формат');
    const params = this.message.slice(10).split(' ');
    if (params.length < 3) throw new Error('мало параметров');
    if (params.slice(0, 3).some((val) => Number.isNaN(+val))) throw new Error('неверные параметры');
    return true;
  }

  async appendAsRow() {
    const { data } = await api.get(process.env.TENSION_SPREADSHEET_ID as string);
    const { rowCount } = data.sheets[0].properties.gridProperties;
    const range: string = `A${rowCount}%3AE${rowCount}`;
    const date = getDate();
    const info: Pressure = {
      high: this.high, low: this.low, pulse: this.pulse, message: this.meta, date,
    };
    const result = await api.appendRow(process.env.TENSION_SPREADSHEET_ID as string, range, info);
    return result;
  }
}

export default PressureMessage;
