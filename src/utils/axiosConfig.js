import axios from 'axios';

const API_KEY = '7ba97b6ae04ef6a3c8a03cbd4d751e1e';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,
  },
});

export default api;
