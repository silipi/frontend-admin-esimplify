import axios from 'axios';

const caller = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default caller;
