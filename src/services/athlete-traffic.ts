import api from '../api/covid-server-api';

export const getAll = async (data?: {}) => {
  const response = await api.get('/athletes/all');
  return response.data;
};
