import api from '../api/covid-server-api';

export const getAll = async (data?: {}) => {
  const response = await api.get('/covid/find');
  return response;
};

export const getQuestionList = async (data?: {}) => {
  const response = await api.get('/covid/questions');
  return response.data;
};
