import { general } from './general';

const specific = {
  production: true,
  API_URL: '',
};

export const environment = { ...general, ...specific };
