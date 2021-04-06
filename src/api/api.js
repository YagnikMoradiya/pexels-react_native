import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.pexels.com/v1',
  headers: {
    Authorization: 'put your api key',
  },
});
