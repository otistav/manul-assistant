import axios from 'axios';
import { Pressure } from '../types';

const api = axios.create({
  baseURL: 'https://sheets.googleapis.com/v4/spreadsheets',
  params: {
    key: process.env.GOOGLE_API_TOKEN,
  },
});

export default {
  get(id: string) {
    return api.get(`/${id}`);
  },
  appendRow(id: string, range: string, info: Pressure) {
    return api.put(`/${id}/values/${range}`, {
      range,
      values: [
        [
          info.date,
          info.high,
          info.low,
          info.pulse,
          info.message || '',
        ],
      ],
    });
  },
};
