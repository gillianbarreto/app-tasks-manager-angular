import { general } from './general';

const specific = {
  production: false,
  API_URL: 'http://localhost:3000',
};

export const environment = { ...general, ...specific };
