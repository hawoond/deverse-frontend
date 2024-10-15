import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.deverse.com', // 백엔드 API의 기본 URL로 변경
  timeout: 5000,
});

export default instance;
